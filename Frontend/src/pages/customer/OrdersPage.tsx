import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../../context/CartCheckoutContext';
import { Badge } from '../../components/common/Badge';
import { ShoppingBag, Ship, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders } = useCheckout();
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Vehicle Orders
        </h1>
        <p className="text-xs text-slate-500">
          Track allocations, milestone invoices, and shipping timelines.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Left Image & Vehicle Info (PRD Section 33) */}
            <div className="flex items-start gap-4">
              <img
                src={order.vehicle.images[0]}
                alt={order.vehicle.model}
                className="w-28 sm:w-32 aspect-[16/10] object-cover rounded-2xl border border-slate-100 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">
                    {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                  </span>
                  <Badge variant="blue" size="sm">
                    {order.status === 'at_sea' ? 'On Vessel to Tema' : 'Allocated'}
                  </Badge>
                </div>
                <div className="text-xs text-slate-400 font-mono">{order.orderNumber}</div>
                <div className="text-xs text-slate-500">
                  Ordered on {order.createdAt} • Destination: Tema Port
                </div>
              </div>
            </div>

            {/* Middle: Financials */}
            <div className="grid grid-cols-2 gap-4 text-xs w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Paid So Far</span>
                <span className="font-extrabold text-emerald-600 text-sm">{formatGHS(order.amountPaid)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Balance</span>
                <span className="font-extrabold text-slate-900 text-sm">{formatGHS(order.balanceDue)}</span>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link
                to="/customer/tracking"
                className="flex-1 md:flex-initial bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Ship className="w-4 h-4" />
                <span>Track Voyage</span>
              </Link>
              <Link
                to="/customer/documents"
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700"
                title="View Documents"
              >
                <FileText className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
