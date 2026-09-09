import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_VEHICLES, INITIAL_LEADS } from '../../api/mockData';
import { Badge } from '../../components/common/Badge';
import { 
  Car, PlusCircle, Users, TrendingUp, DollarSign, 
  Star, Phone, MessageSquare, Eye, ChevronRight, CheckCircle2 
} from 'lucide-react';

export const SellerDashboardPage: React.FC = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  const dealerVehicles = INITIAL_VEHICLES.filter((v) => v.seller.id === 'apex-motors' || v.seller.id === 'agorazo-direct');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block">
            Dealer Operating System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Apex Motors Ghana — Portal
          </h1>
          <p className="text-xs text-slate-500">
            Manage your showroom inventory, customer inquiries, and staged payment plans.
          </p>
        </div>

        <Link
          to="/seller/add"
          className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-extrabold text-xs py-3 px-5 rounded-2xl flex items-center gap-2 shadow-orange-glow self-start sm:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Vehicle Listing</span>
        </Link>
      </div>

      {/* KPI Cards (PRD Section 49) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Listings</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{dealerVehicles.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">2 Published, 1 Pending</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Customer Leads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{leads.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+2 inquiries today</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Gross Sales Value</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">GHS 1,280,000</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3 deals closed this month</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Dealer Rating</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">4.8 ★</div>
            <div className="text-[11px] text-slate-400 mt-0.5">88 verified buyer reviews</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Inventory List (PRD Section 50) (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-slate-900">Inventory Catalog</h3>
            <span className="text-xs font-bold text-slate-400">{dealerVehicles.length} vehicles</span>
          </div>

          <div className="divide-y divide-slate-100">
            {dealerVehicles.map((v) => (
              <div key={v.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={v.images[0]}
                    alt={v.model}
                    className="w-16 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{v.year} {v.make} {v.model}</h4>
                    <div className="text-slate-500">{v.location}</div>
                    <div className="text-agorazo-orange-600 font-black mt-0.5">
                      {formatGHS(v.priceToTema)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="green" size="sm">Active</Badge>
                  <Link
                    to={`/cars/${v.slug}`}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="View vehicle"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lead CRM (PRD Section 55) (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-slate-900">Incoming Buyer Leads</h3>
            <span className="text-xs font-bold text-amber-600">3 Active</span>
          </div>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">{lead.customerName}</span>
                    <span className="text-[11px] text-slate-500">Interested in: {lead.vehicleInterest}</span>
                  </div>
                  <Badge variant="brand" size="sm">{lead.source}</Badge>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span className="text-slate-400">Budget: {formatGHS(lead.budget)}</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${lead.customerPhone}`}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                      title="Call"
                    >
                      <Phone className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://wa.me/${lead.customerPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
