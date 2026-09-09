import React from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../../api/mockData';
import { Badge } from '../../components/common/Badge';
import { 
  Shield, TrendingUp, DollarSign, Car, 
  Ship, Sliders, CheckCircle2, AlertTriangle, ArrowRight 
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-16">
      {/* Header (PRD Section 61) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-agorazo-orange-500 block">
            Executive Operations Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Agorazo Platform Administration
          </h1>
          <p className="text-xs text-slate-500">
            Marketplace gross transaction value, vessel cargo clearing, and pricing engine.
          </p>
        </div>

        <Link
          to="/admin/pricing"
          className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-extrabold text-xs py-3 px-5 rounded-2xl flex items-center gap-2 shadow-orange-glow self-start sm:self-auto transition-all"
        >
          <Sliders className="w-4 h-4" />
          <span>Configure Pricing Engine</span>
        </Link>
      </div>

      {/* KPI Cards (PRD Section 63) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Gross Transaction (GTV)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">GHS 2,840,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+18.4% month-over-month</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-agorazo-orange-50 text-agorazo-orange-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">GHS 312,400</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Markups & service commissions</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Shipments</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">6 Vessels</div>
            <div className="text-[11px] text-slate-400 mt-0.5">En route to Tema Port</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Clearing Status</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">100% Verified</div>
            <div className="text-[11px] text-slate-400 mt-0.5">0 ICUMS customs disputes</div>
          </div>
        </div>
      </div>

      {/* Port Cargo & Operations Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-slate-900">Ocean Cargo & Clearing Queue</h3>
            <span className="text-slate-400">Tema Port Terminal 3</span>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { vessel: 'PACIFIC TRADER', order: 'AG-2026-000241', car: 'BYD Song Plus', status: 'At Sea', eta: '24 Sep 2026' },
              { vessel: 'MSC LORETTO', order: 'AG-2026-000198', car: 'BYD Seal EV', status: 'Pre-Arrival', eta: '18 Sep 2026' },
              { vessel: 'CMA CGM DAKAR', order: 'AG-2026-000174', car: 'Changan Hunter Pickup', status: 'At Sea', eta: '28 Sep 2026' },
            ].map((row, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{row.car} ({row.order})</div>
                  <div className="text-slate-400 text-[11px]">Vessel: {row.vessel} • ETA: {row.eta}</div>
                </div>
                <Badge variant={row.status === 'Pre-Arrival' ? 'brand' : 'blue'}>
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pricing Rule Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-slate-900">Active Pricing Rules</h3>
            <Link to="/admin/pricing" className="text-agorazo-orange-600 font-bold hover:underline">
              Edit Rules
            </Link>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">SUV Markup</span>
              <span className="font-extrabold text-agorazo-orange-600">9%</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Sedan Markup</span>
              <span className="font-extrabold text-agorazo-orange-600">10%</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Electric Vehicle (EV) Promo</span>
              <span className="font-extrabold text-emerald-600">8%</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Commercial Pickup</span>
              <span className="font-extrabold text-slate-900">Fixed GHS 28,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
