import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Upload, Plus, Trash2, DollarSign } from 'lucide-react';

export const AddVehiclePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2026,
    badge: '',
    vin: '',
    bodyType: 'SUV',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    mileage: 0,
    engine: '1.5L Turbo Hybrid',
    color: 'Glacier Blue',
    baseCost: 210000,
    markup: 30000,
    planM1: 30,
    planM2: 40,
    planM3: 30,
  });

  const sellingPrice = formData.baseCost + formData.markup;
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Vehicle successfully added to inventory and submitted for Agorazo verification!');
    navigate('/seller/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6 pb-24 md:pb-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block">
            Inventory Management
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Add New Vehicle Listing
          </h1>
        </div>
        <Link to="/seller/dashboard" className="text-xs font-semibold text-slate-400 hover:text-slate-700">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 text-xs">
        {/* Stepper */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
          {[
            { n: 1, label: 'Info' },
            { n: 2, label: 'Specs' },
            { n: 3, label: 'Pricing (PRD 53)' },
            { n: 4, label: 'Milestones (PRD 54)' },
          ].map((s) => (
            <div
              key={s.n}
              className={`flex items-center gap-2 ${step >= s.n ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.n
                    ? 'bg-agorazo-orange-500 text-white'
                    : step > s.n
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Make / Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BYD, Toyota"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Seal, Land Cruiser"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Manufacturing Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">VIN / Chassis Number</label>
                  <input
                    type="text"
                    placeholder="17-character VIN"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-agorazo-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  <span>Next: Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SPECS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Body Type</label>
                  <select
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Hatchback">Shooting Brake</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Fuel / Powertrain</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900"
                  >
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button type="button" onClick={() => setStep(1)} className="text-slate-600 px-3 py-2">
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-agorazo-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  <span>Next: Pricing Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SELLER PRICING ENGINE (PRD Section 53) */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900">Internal Cost vs Customer Price Breakdown</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Base Cost to Dealer (GHS)</label>
                    <input
                      type="number"
                      step="5000"
                      value={formData.baseCost}
                      onChange={(e) => setFormData({ ...formData, baseCost: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dealer Markup (GHS)</label>
                    <input
                      type="number"
                      step="2000"
                      value={formData.markup}
                      onChange={(e) => setFormData({ ...formData, markup: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">Customer Selling Price to Tema:</span>
                  <span className="text-base font-black text-agorazo-orange-600">{formatGHS(sellingPrice)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button type="button" onClick={() => setStep(2)} className="text-slate-600 px-3 py-2">
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-agorazo-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  <span>Next: Payment Plan Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT PLAN BUILDER (PRD Section 54) */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900">Milestone Payment Plan Configuration</h4>
                <p className="text-[11px] text-slate-500">Must total exactly 100%.</p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Milestone 1 (%)</label>
                    <input
                      type="number"
                      value={formData.planM1}
                      onChange={(e) => setFormData({ ...formData, planM1: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Order Allocation</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Milestone 2 (%)</label>
                    <input
                      type="number"
                      value={formData.planM2}
                      onChange={(e) => setFormData({ ...formData, planM2: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Pre-Shipment</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Milestone 3 (%)</label>
                    <input
                      type="number"
                      value={formData.planM3}
                      onChange={(e) => setFormData({ ...formData, planM3: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Tema Arrival</span>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-200 text-xs font-bold">
                  <span>Total Percentage:</span>
                  <span className={formData.planM1 + formData.planM2 + formData.planM3 === 100 ? 'text-emerald-600' : 'text-red-600'}>
                    {formData.planM1 + formData.planM2 + formData.planM3}%
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button type="button" onClick={() => setStep(3)} className="text-slate-600 px-3 py-2">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={formData.planM1 + formData.planM2 + formData.planM3 !== 100}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-black py-3.5 px-8 rounded-xl shadow-orange-glow transition-all"
                >
                  Publish Listing to Marketplace
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
