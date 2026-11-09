const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/env');
const { prisma } = require('../config/db');
const { memoryUsers } = require('../middleware/auth');

// Seed default demo accounts synchronously on startup
const adminPasswordHash = bcrypt.hashSync('Admin123!', 10);
const customerPasswordHash = bcrypt.hashSync('Customer123!', 10);

memoryUsers.set('user-admin-1', {
  id: 'user-admin-1',
  email: 'admin@navaseal.site',
  passwordHash: adminPasswordHash,
  fullName: 'Nava Seal Administrator',
  phoneNumber: '+855968882345',
  role: { name: 'SUPER_ADMIN' },
  isEmailVerified: true
});

memoryUsers.set('user-customer-1', {
  id: 'user-customer-1',
  email: 'customer@navaseal.site',
  passwordHash: customerPasswordHash,
  fullName: 'Sokha Visal (Customer)',
  phoneNumber: '+85512345678',
  role: { name: 'CUSTOMER' },
  isEmailVerified: true
});

const generateToken = (user) => {
  const roleName = user.role?.name || user.role || 'CUSTOMER';
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: roleName
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

// 1. REGISTER
const register = async (req, res, next) => {
  try {
    const { email, password, fullName, phoneNumber, telegramUsername } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check Prisma or Memory
    let existingUser = null;
    if (prisma?.user) {
      try {
        existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      } catch (err) {}
    }
    if (!existingUser) {
      existingUser = Array.from(memoryUsers.values()).find(u => u.email === normalizedEmail);
    }

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'An account with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = `usr-${crypto.randomUUID()}`;

    let newUser = null;

    if (prisma?.user) {
      try {
        // Find or create customer role
        let role = await prisma.role.findUnique({ where: { name: 'CUSTOMER' } });
        if (!role) {
          role = await prisma.role.create({ data: { name: 'CUSTOMER', description: 'Standard Customer' } });
        }
        newUser = await prisma.user.create({
          data: {
            id: userId,
            email: normalizedEmail,
            passwordHash,
            fullName,
            phoneNumber,
            roleId: role.id,
            isEmailVerified: false
          },
          include: { role: true }
        });
      } catch (err) {
        console.warn('Prisma create user fallback to memory store:', err.message);
      }
    }

    if (!newUser) {
      newUser = {
        id: userId,
        email: normalizedEmail,
        passwordHash,
        fullName,
        phoneNumber,
        telegramUsername,
        role: { name: 'CUSTOMER' },
        isEmailVerified: false,
        createdAt: new Date().toISOString()
      };
      memoryUsers.set(userId, newUser);
    }

    const token = generateToken(newUser);

    res.status(201).json({
      status: 'success',
      message: 'Account registered successfully.',
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role?.name || 'CUSTOMER'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    let user = null;
    if (prisma?.user) {
      try {
        user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          include: { role: true }
        });
      } catch (err) {}
    }

    if (!user) {
      user = Array.from(memoryUsers.values()).find(u => u.email === normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email address or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email address or password.'
      });
    }

    const token = generateToken(user);

    res.json({
      status: 'success',
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role?.name || user.role || 'CUSTOMER'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 3. LOGOUT
const logout = async (req, res) => {
  res.json({
    status: 'success',
    message: 'Logged out successfully.'
  });
};

// 4. FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Email address is required.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    let user = Array.from(memoryUsers.values()).find(u => u.email === email.toLowerCase().trim());
    if (user) {
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetExpires;
    }

    // Always respond with success to prevent email enumeration
    res.json({
      status: 'success',
      message: 'If an account with that email exists, password reset instructions have been sent.',
      debugToken: config.NODE_ENV === 'development' ? resetToken : undefined
    });
  } catch (error) {
    next(error);
  }
};

// 5. RESET PASSWORD
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword || newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid reset token and new password (min 6 characters) are required.'
      });
    }

    let user = Array.from(memoryUsers.values()).find(
      u => u.resetPasswordToken === token && u.resetPasswordExpires > new Date()
    );

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Password reset token is invalid or has expired.'
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    res.json({
      status: 'success',
      message: 'Password has been reset successfully. You may now log in.'
    });
  } catch (error) {
    next(error);
  }
};

// 6. GET CURRENT USER (ME)
const getMe = async (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe
};

