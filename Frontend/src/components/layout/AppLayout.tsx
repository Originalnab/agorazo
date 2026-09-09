import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileTopBar } from './MobileTopBar';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { WifiOff, Download, X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Subtle PWA install prompt simulation after meaningful engagement (PRD Section 72)
    const hasPrompted = sessionStorage.getItem('pwa_prompted');
    if (!hasPrompted) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
        sessionStorage.setItem('pwa_prompted', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isCheckout = location.pathname.startsWith('/checkout');

  return (
    <div className="min-h-screen flex flex-col bg-agorazo-warm-bg text-agorazo-charcoal-900 antialiased selection:bg-agorazo-orange-500 selection:text-white">
      {/* Offline Status Alert (PRD Section 74) */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="w-4 h-4" />
          <span>You are currently offline. Viewing cached vehicle and order data.</span>
        </div>
      )}

      {/* PWA Install Promo Banner (PRD Section 72) */}
      {showInstallBanner && (
        <div className="bg-slate-900 text-white px-4 py-2.5 text-xs flex items-center justify-between z-40 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-agorazo-orange-500 flex items-center justify-center font-bold text-white shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold">Install Agorazo App</span>
              <span className="text-slate-400 hidden sm:inline ml-1.5">
                Fast mobile access to your orders, vessel tracking, and payments.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                alert('To install on your phone: Tap the browser share/menu button and select "Add to Home Screen"');
                setShowInstallBanner(false);
              }}
              className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 px-3 py-1 rounded-lg text-white font-bold text-xs"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <Navbar />

      {/* Mobile Sticky Top Header */}
      <MobileTopBar />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer (Hidden on checkout screen for minimal distraction) */}
      {!isCheckout && <Footer />}

      {/* Persistent Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Interactive Role Switcher for Testing */}
      <RoleSwitcher />
    </div>
  );
};
