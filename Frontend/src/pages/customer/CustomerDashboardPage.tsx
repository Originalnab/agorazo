import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCheckout } from '../../context/CartCheckoutContext';
import { useSavedCars } from '../../context/SavedCarsContext';
import { 
  ShoppingBag, CreditCard, Heart, Ship, 
  ArrowRight, ShieldCheck, Clock, FileText, CheckCircle2 
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { orders, activeOrder } = useCheckout();
  const { savedIds } = useSavedCars();

  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;
  const order = activeOrder || orders[0];

  const paidAmount = orders.reduce((acc, o) => acc + o.amountPaid, 0);
  const totalCommitment = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const balanceDue = totalCommitment - paidAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-24 md:pb-16">
      {/* Welcome Bar (PRD Section 31) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-agorazo-orange-500 block">
            Customer Operating Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hello, {user?.name.split(' ')[0] || 'Emmanuel'} 👋
          </h1>
          <p className="text-xs text-slate-500">
            Track your vehicle shipments, scheduled milestone payments, and registered documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cars"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
          >
            Browse New Cars
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards (PRD Section 31) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Orders</span>
            <div className="w-8 h-8 rounded-lg bg-agorazo-orange-50 text-agorazo-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{orders.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">In Transit & Clearing</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Amount Paid</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-600">{formatGHS(paidAmount)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Confirmed by GRA/PSP</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Balance Due</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{formatGHS(balanceDue)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Payable at Milestones 2 & 3</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Saved Cars</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{savedIds.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Watched vehicles</div>
          </div>
        </div>
      </div>

      {/* Current Active Vehicle Journey & Payment Progress (PRD Section 31 & 34) */}
      {order && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={order.vehicle.images[0]}
                alt={order.vehicle.model}
                className="w-20 sm:w-24 aspect-[16/10] object-cover rounded-xl border border-slate-200"
              />
              <div>
                <span className="text-[10px] font-bold text-agorazo-orange-600 uppercase tracking-wider">
                  Active Shipment • {order.orderNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                </h3>
                <div className="text-xs text-slate-500">
                  {order.shippingInfo?.vesselName} • Bill of Lading: {order.shippingInfo?.billOfLadingNumber}
                </div>
              </div>
            </div>

            <Link
              to="/customer/tracking"
              className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto"
            >
              <Ship className="w-4 h-4" />
              <span>Track Ocean Voyage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Payment Progress Bar (PRD Section 34) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                Payment Milestone Progress: {formatGHS(order.amountPaid)} / {formatGHS(order.totalAmount)}
              </span>
              <span className="font-extrabold text-agorazo-orange-600">
                {Math.round((order.amountPaid / order.totalAmount) * 100)}% Settled
              </span>
            </div>

            {/* Progress track */}
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-agorazo-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${(order.amountPaid / order.totalAmount) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Milestone 1 (Deposit)</div>
                <div className="font-extrabold text-emerald-600 text-sm mt-0.5">Paid • 30%</div>
                <div className="text-[11px] text-slate-500">Vehicle Export Reserved</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Milestone 2 (Pre-Ship)</div>
                <div className="font-extrabold text-amber-600 text-sm mt-0.5">Due in 14 days</div>
                <div className="text-[11px] text-slate-500">{formatGHS(Math.round(order.totalAmount * 0.4))} (40%)</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Milestone 3 (Arrival)</div>
                <div className="font-extrabold text-slate-700 text-sm mt-0.5">Upon Tema Arrival</div>
                <div className="text-[11px] text-slate-500">{formatGHS(order.totalAmount - order.amountPaid - Math.round(order.totalAmount * 0.4))} (30%)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/customer/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-agorazo-orange-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agorazo-orange-50 text-agorazo-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-agorazo-orange-600 transition-colors">
                My Orders
              </h4>
              <p className="text-xs text-slate-400">View proformas & invoices</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/customer/tracking"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-agorazo-orange-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-agorazo-orange-600 transition-colors">
                Vessel & Clearing Tracking
              </h4>
              <p className="text-xs text-slate-400">Live shipping coordinates</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/customer/documents"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-agorazo-orange-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-agorazo-orange-600 transition-colors">
                Documents Vault
              </h4>
              <p className="text-xs text-slate-400">Bills of Lading, DVLA & receipts</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
