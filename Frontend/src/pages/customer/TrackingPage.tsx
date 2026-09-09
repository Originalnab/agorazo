import React from 'react';
import { useCheckout } from '../../context/CartCheckoutContext';
import { 
  Ship, CheckCircle2, Clock, Anchor, 
  MapPin, FileText, ArrowRight, ShieldCheck, Download, ExternalLink 
} from 'lucide-react';

export const TrackingPage: React.FC = () => {
  const { activeOrder } = useCheckout();
  const order = activeOrder;

  if (!order) return null;
  const ship = order.shippingInfo;

  // Timeline steps according to PRD Section 35
  const timelineSteps = [
    { id: 1, title: 'Vehicle Confirmed', date: '28 Aug 2026', done: true },
    { id: 2, title: 'VIN & Specs Verified', date: '30 Aug 2026', done: true },
    { id: 3, title: 'Supplier Allocation Settled', date: '01 Sep 2026', done: true },
    { id: 4, title: 'China Port Customs Cleared', date: '02 Sep 2026', done: true },
    { id: 5, title: 'Container Loaded & Shipped', date: '03 Sep 2026', done: true },
    { id: 6, title: 'At Sea (En Route to Tema)', date: 'Current Stage • Gulf of Guinea', current: true },
    { id: 7, title: 'Tema Port Arrival', date: 'Est. 24 Sep 2026', upcoming: true },
    { id: 8, title: 'GRA Customs Clearance', date: 'Est. 27 Sep 2026', upcoming: true },
    { id: 9, title: 'DVLA Inspection & Plates', date: 'Est. 29 Sep 2026', upcoming: true },
    { id: 10, title: 'Doorstep Handover', date: 'Est. 30 Sep 2026', upcoming: true },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-16">
      {/* Top Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-agorazo-orange-600 uppercase tracking-widest mb-1">
          <Ship className="w-4 h-4" />
          <span>Real-Time Vehicle Journey</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Ocean Freight & Port Tracking
        </h1>
        <p className="text-xs text-slate-500">
          Order: <strong className="text-slate-800">{order.orderNumber}</strong> • {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
        </p>
      </div>

      {/* Shipping Information Card (PRD Section 36) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-agorazo-orange-500/20 text-agorazo-orange-400 flex items-center justify-center font-bold">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Vessel Carrier</span>
              <h3 className="text-lg font-black text-white">{ship?.vesselName || 'PACIFIC TRADER'}</h3>
              <div className="text-xs text-slate-400">Voyage: {ship?.voyageNumber || 'V.2608W'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>On Water • Steady Course</span>
            </span>
          </div>
        </div>

        {/* Shipping details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Departure Port</span>
            <span className="font-bold text-white mt-0.5 block">{ship?.departurePort}</span>
            <span className="text-slate-400 text-[11px]">{ship?.departureDate}</span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Arrival</span>
            <span className="font-bold text-agorazo-orange-400 text-sm mt-0.5 block">{ship?.etaTema}</span>
            <span className="text-slate-400 text-[11px]">Tema Port Terminal 3</span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Bill of Lading</span>
            <span className="font-mono font-bold text-slate-200 mt-0.5 block">{ship?.billOfLadingNumber}</span>
            <span className="text-slate-400 text-[11px]">Verified Ocean BL</span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Container Number</span>
            <span className="font-mono font-bold text-slate-200 mt-0.5 block">{ship?.containerNumber}</span>
            <span className="text-slate-400 text-[11px]">40ft High Cube HC</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pre-clearing documentation lodged with GRA ICUMS (Tema).</span>
          </div>

          <a
            href="/customer/documents"
            className="text-xs font-bold text-agorazo-orange-400 hover:text-agorazo-orange-300 flex items-center gap-1"
          >
            <span>View Ocean Bill of Lading Document</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Visual Tracking Timeline (PRD Section 35) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
        <h3 className="font-extrabold text-base text-slate-900">
          Ten-Stage Automotive Delivery Journey
        </h3>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {timelineSteps.map((s) => (
            <div key={s.id} className="relative flex items-start gap-4">
              {/* Timeline marker icon */}
              <div
                className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  s.done
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-50'
                    : s.current
                    ? 'bg-agorazo-orange-500 text-white ring-4 ring-agorazo-orange-100 animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s.done ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4
                    className={`text-sm font-bold ${
                      s.current ? 'text-agorazo-orange-600' : s.done ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </h4>
                  <span className="text-xs text-slate-400">{s.date}</span>
                </div>
                {s.current && (
                  <div className="mt-2 p-3 bg-agorazo-orange-50/70 rounded-xl border border-agorazo-orange-200 text-xs text-agorazo-orange-900">
                    The vessel is currently in transit across maritime routes. Scheduled port arrival at Meridian Port Services (MPS) Terminal 3, Tema Port.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
