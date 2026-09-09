import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Bell, ArrowLeft } from 'lucide-react';

export const MobileTopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isDetailPage = location.pathname.startsWith('/cars/') && location.pathname !== '/cars';
  const isCheckoutPage = location.pathname.startsWith('/checkout');
  const showBackButton = isDetailPage || isCheckoutPage;

  return (
    <div className="sticky top-0 z-30 md:hidden glass-header border-b border-slate-200/80 pt-safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Logo or Back button */}
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1 font-semibold text-xs"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-800" />
              <span>Back</span>
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Agorazo" className="h-7 w-auto object-contain" />
              <span className="text-[10px] font-black tracking-widest text-agorazo-orange-500 uppercase">
                Agorazo
              </span>
            </Link>
          )}
        </div>

        {/* Center: Location Tag */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 text-[11px] font-semibold">
          <MapPin className="w-3 h-3 text-agorazo-orange-500" />
          <span>Accra • Tema</span>
        </div>

        {/* Right: Notifications & Profile Avatar */}
        <div className="flex items-center gap-2">
          <Link
            to="/customer/orders"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-agorazo-orange-500 rounded-full" />
          </Link>

          <Link to="/customer/dashboard" className="shrink-0">
            <img
              src={user?.avatarUrl || '/logo.png'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
