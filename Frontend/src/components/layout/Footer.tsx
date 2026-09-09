import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-agorazo-charcoal-900 text-white border-t border-slate-800 pb-20 md:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Agorazo" className="h-10 w-auto brightness-0 invert" />
              <div>
                <span className="text-xs font-black tracking-widest text-agorazo-orange-400 uppercase block leading-tight">
                  Buy • Sell • Drive
                </span>
                <span className="text-xs font-medium text-slate-400">Ghana Automotive Marketplace</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Agorazo is Ghana’s premier automotive transaction technology platform. We eliminate uncertainty in vehicle importation, pricing, customs clearance, and staged milestone payments.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-agorazo-orange-400 shrink-0" />
                <span>Cantonments / Tema Port Transit Office, Greater Accra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-agorazo-orange-400 shrink-0" />
                <span>+233 24 000 1234 / +233 20 111 8899</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-agorazo-orange-400 shrink-0" />
                <span>support@agorazo.com.gh</span>
              </div>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/cars?fuel=Electric" className="hover:text-agorazo-orange-400 transition-colors">Electric & Hybrid (EV)</Link></li>
              <li><Link to="/cars?location=ghana" className="hover:text-agorazo-orange-400 transition-colors">Available in Ghana</Link></li>
              <li><Link to="/cars?location=transit" className="hover:text-agorazo-orange-400 transition-colors">In Transit (Sea Freight)</Link></li>
              <li><Link to="/cars?location=china" className="hover:text-agorazo-orange-400 transition-colors">Direct China Sourcing</Link></li>
              <li><Link to="/request-a-car" className="hover:text-agorazo-orange-400 transition-colors">Request Any Vehicle</Link></li>
              <li><Link to="/compare" className="hover:text-agorazo-orange-400 transition-colors">Compare Models</Link></li>
            </ul>
          </div>

          {/* Col 3: Services & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Services & Port
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="text-slate-300 font-medium">Tema Port Clearance</span></li>
              <li><span className="text-slate-300 font-medium">DVLA Registration & Plates</span></li>
              <li><span className="text-slate-300 font-medium">30/40/30 Milestone Plans</span></li>
              <li><span className="text-slate-300 font-medium">Ocean Freight Tracking</span></li>
              <li><span className="text-slate-300 font-medium">Verified Dealer Standards</span></li>
            </ul>
          </div>

          {/* Col 4: Payments & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Payments & Trust
            </h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>BoG Licensed PSPs</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Payments processed securely through licensed enhanced payment service providers (Paystack Ghana / Hubtel) with mobile money and bank transfers.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-bold">
                <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-300">MTN MoMo</span>
                <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-300">Telecel Cash</span>
                <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-300">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Agorazo Automotive Marketplace Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Purchase</span>
            <span className="hover:text-slate-400 cursor-pointer">Customs Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
