import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCheckout } from '../../context/CartCheckoutContext';
import { 
  Home, Compass, Sparkles, ShoppingBag, UserCircle, 
  LayoutDashboard, Car, PlusCircle, MoreHorizontal 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth();
  const { orders } = useCheckout();

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Seller specific bottom nav (PRD Section 48 & 114)
  if (role === 'dealer') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/80 pb-safe-bottom">
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
          <Link
            to="/seller/dashboard"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
              isCurrent('/seller/dashboard') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>

          <Link
            to="/seller/inventory"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
              isCurrent('/seller/inventory') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Car className="w-5 h-5" />
            <span>Inventory</span>
          </Link>

          <Link
            to="/seller/add"
            className="flex flex-col items-center justify-center -mt-3"
          >
            <div className="w-12 h-12 rounded-full bg-agorazo-orange-500 text-white shadow-orange-glow flex items-center justify-center">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-agorazo-orange-600 mt-1">Add Car</span>
          </Link>

          <Link
            to="/seller/orders"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
              isCurrent('/seller/orders') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Orders</span>
          </Link>

          <Link
            to="/customer/dashboard"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
              isCurrent('/customer/dashboard') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>Buyer View</span>
          </Link>
        </div>
      </nav>
    );
  }

  // Standard Public / Customer bottom nav (PRD Section 5 & 114)
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/80 pb-safe-bottom">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
            isCurrent('/') && location.pathname === '/' ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/cars"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
            isCurrent('/cars') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Explore</span>
        </Link>

        {/* Central Request action with Agorazo Orange Accent */}
        <Link
          to="/request-a-car"
          className="flex flex-col items-center justify-center -mt-3.5 group"
        >
          <div className="w-12 h-12 rounded-full bg-agorazo-orange-500 text-white shadow-orange-glow flex items-center justify-center group-active:scale-95 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-agorazo-orange-600 mt-1">Request</span>
        </Link>

        <Link
          to="/customer/orders"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors relative ${
            isCurrent('/customer/orders') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Orders</span>
          {orders.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 bg-agorazo-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {orders.length}
            </span>
          )}
        </Link>

        <Link
          to="/customer/dashboard"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
            isCurrent('/customer/dashboard') || isCurrent('/customer') ? 'text-agorazo-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCircle className="w-5 h-5" />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
};
