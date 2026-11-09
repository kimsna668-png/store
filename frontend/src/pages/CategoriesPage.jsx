import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Key, 
  Palette, 
  UserCheck, 
  Code, 
  ArrowRight, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { mockCategories } from '../data/mockProducts';

const iconMap = {
  Bot: Bot,
  Key: Key,
  Palette: Palette,
  UserCheck: UserCheck,
  Code: Code
};

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Product Categories</span>
        </nav>

        <div className="max-w-2xl mb-10">
          <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Browse by Category</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Digital Product Categories
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Explore authentic digital solutions organized by purpose: AI creation tools, computer operating system licenses, graphic templates, monetized social assets, and developer codebases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Zap;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                    {cat.name}
                  </h3>

                  {cat.nameKhmer && (
                    <p className="text-xs text-teal-700 font-semibold khmer-font mt-1">
                      {cat.nameKhmer}
                    </p>
                  )}

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">
                    {cat.count} Available Products
                  </span>
                  <span className="text-teal-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

