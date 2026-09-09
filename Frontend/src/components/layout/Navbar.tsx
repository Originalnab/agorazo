import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSavedCars } from '../../context/SavedCarsContext';
import { useCheckout } from '../../context/CartCheckoutContext';
import { 
  Search, Heart, Bell, ShoppingBag, ShieldCheck, 
  Car, PlusCircle, ArrowRight, UserCircle2, ChevronDown 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const { savedIds, compareIds } = useSavedCars();
  const { orders } = useCheckout();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 hidden md:block glass-header border-b border-slate-200/80 shadow-subtle transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Agorazo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden lg:block">
                <span className="text-[10px] font-extrabold tracking-widest text-agorazo-orange-500 uppercase block leading-none">
                  Buy • Sell • Drive
                </span>
                <span className="text-xs font-semibold text-slate-600">Automotive Ghana</span>
              </div>
            </Link>

            {/* Main Navigation Links */}
            <nav className="flex items-center gap-1 text-sm font-semibold text-slate-700">
              <Link
                to="/cars"
                className={`px-3 py-2 rounded-xl transition-colors ${
                  isActive('/cars') ? 'text-agorazo-orange-600 bg-agorazo-orange-50' : 'hover:text-agorazo-orange-500 hover:bg-slate-50'
                }`}
              >
                Browse Cars
              </Link>
              <Link
                to="/request-a-car"
                className={`px-3 py-2 rounded-xl transition-colors ${
                  isActive('/request-a-car') ? 'text-agorazo-orange-600 bg-agorazo-orange-50' : 'hover:text-agorazo-orange-500 hover:bg-slate-50'
                }`}
              >
                Request a Car
              </Link>
              <Link
                to="/compare"
                className={`px-3 py-2 rounded-xl transition-colors relative ${
                  isActive('/compare') ? 'text-agorazo-orange-600 bg-agorazo-orange-50' : 'hover:text-agorazo-orange-500 hover:bg-slate-50'
                }`}
              >
                Compare
                {compareIds.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[10px] bg-slate-900 text-white rounded-full">
                    {compareIds.length}
                  </span>
                )}
              </Link>

              {/* Dynamic portal tabs based on role */}
              {role === 'dealer' && (
                <Link
                  to="/seller/dashboard"
                  className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors"
                >
                  Dealer Portal
                </Link>
              )}
              {role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition-colors"
                >
                  Admin Console
                </Link>
              )}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search trigger */}
            <Link
              to="/cars"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-white text-xs font-medium transition-all"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden xl:inline">Search brand, model, EV...</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[10px] bg-slate-200 text-slate-600 rounded">
                ⌘K
              </kbd>
            </Link>

            {/* Saved Cars Heart */}
            <Link
              to="/customer/saved"
              className="relative p-2.5 rounded-xl border border-slate-200/80 bg-white text-slate-700 hover:text-rose-500 hover:border-slate-300 transition-colors"
              aria-label="Saved vehicles"
            >
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Orders / Tracking */}
            <Link
              to="/customer/orders"
              className="relative p-2.5 rounded-xl border border-slate-200/80 bg-white text-slate-700 hover:text-agorazo-orange-500 hover:border-slate-300 transition-colors"
              aria-label="My Orders"
            >
              <ShoppingBag className="w-5 h-5" />
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-agorazo-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {orders.length}
                </span>
              )}
            </Link>

            {/* User Account / Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all text-xs font-semibold text-slate-800"
                >
                  <img
                    src={user.avatarUrl || '/logo.png'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="truncate max-w-[100px] leading-tight">{user.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 capitalize font-medium">{user.role}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900 text-xs truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/customer/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <UserCircle2 className="w-4 h-4 text-slate-400" />
                      Customer Dashboard
                    </Link>
                    <Link
                      to="/customer/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-400" />
                      Orders & Tracking
                    </Link>
                    <Link
                      to="/customer/documents"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      Documents Vault
                    </Link>
                    {role === 'dealer' && (
                      <Link
                        to="/seller/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 font-semibold"
                      >
                        <Car className="w-4 h-4" />
                        Seller Portal
                      </Link>
                    )}
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2"
              >
                Sign In
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              to="/request-a-car"
              className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm hover:shadow-orange-glow transition-all"
            >
              <span>Request a Car</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
