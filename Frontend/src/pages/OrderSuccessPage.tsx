import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCheckout } from '../context/CartCheckoutContext';
import { CheckCircle2, ArrowRight, Download, Ship, ShieldCheck, FileText } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || 'AG-2026-000241';
  const { activeOrder } = useCheckout();

  const order = activeOrder;
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center space-y-6 pb-24 md:pb-16">
      {/* Large Check Icon (PRD Section 30) */}
      <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50/50">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
          Payment Confirmed
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Vehicle Successfully Allocated!
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Your initial deposit has been settled. Agorazo export operations have initiated container booking and VIN assignment.
        </p>
      </div>

      {/* Confirmation Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 text-left text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Order Number</span>
            <span className="font-extrabold text-slate-900 text-sm">{orderNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Amount Paid</span>
            <span className="font-extrabold text-emerald-600 text-sm">
              {order ? formatGHS(order.amountPaid) : 'GHS 92,400'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle</span>
            <span className="font-bold text-slate-800">
              {order ? `${order.vehicle.year} ${order.vehicle.make} ${order.vehicle.model}` : '2026 BYD Song Plus DM-i'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Milestone</span>
            <span className="font-bold text-agorazo-orange-600">
              Pre-Shipment & Bill of Lading
            </span>
          </div>
        </div>

        {/* Milestone Callout */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 text-slate-600">
          <Ship className="w-4 h-4 text-agorazo-orange-500 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong className="text-slate-900 block font-semibold">Live Vessel Coordinates Enabled:</strong>
            You can monitor sea transit progress, bill of lading documentation, and customs pre-assessment directly inside your dashboard.
          </div>
        </div>
      </div>

      {/* Actions (PRD Section 30) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/customer/tracking"
          className="w-full sm:w-auto bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2"
        >
          <span>Track My Order & Vessel</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          onClick={() => alert('Official Tax Invoice & Receipt (PDF) downloaded.')}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Download Receipt</span>
        </button>
      </div>
    </div>
  );
};
