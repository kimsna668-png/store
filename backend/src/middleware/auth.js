const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { prisma } = require('../config/db');

// In-memory demo store fallback if DB is still synchronizing
const memoryUsers = new Map();

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. No token provided.'
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Look up user in Prisma if available
    let user = null;
    if (prisma?.user) {
      try {
        user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          include: { role: true }
        });
      } catch (dbErr) {
        // fallback
      }
    }

    if (!user && memoryUsers.has(decoded.userId)) {
      user = memoryUsers.get(decoded.userId);
    }

    if (!user) {
      // Allow valid token payload as fallback
      user = {
        id: decoded.userId,
        email: decoded.email,
        fullName: decoded.fullName,
        role: { name: decoded.role || 'CUSTOMER' }
      };
    }

    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role?.name || user.role || 'CUSTOMER'
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Session expired. Please log in again.'
      });
    }
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or forged authentication token.'
    });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required.'
      });
    }

    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: 'error',
        message: `Forbidden: Access requires one of [${roles.join(', ')}]. Current role: ${userRole}`
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  memoryUsers
};

