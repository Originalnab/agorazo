import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';

export const RequestCarPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    yearMin: 2023,
    yearMax: 2026,
    budgetMin: 180000,
    budgetMax: 280000,
    bodyType: 'SUV',
    fuelType: 'Hybrid',
    condition: 'Brand New (Factory Export)',
    colorPref: 'White or Black',
    notes: '',
    customerName: 'Emmanuel Mensah',
    customerPhone: '+233 24 456 7890',
    customerEmail: 'emmanuel.mensah@gmail.com',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Request Submitted Successfully!
        </h1>
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle text-left space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Reference Number</span>
            <span className="font-extrabold text-agorazo-orange-600 text-sm">REQ-2026-0982</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 block text-[11px]">Requested Vehicle</span>
              <span className="font-bold text-slate-800 text-sm">{formData.make} {formData.model || 'Preferred Sourcing'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Budget Ceiling</span>
              <span className="font-bold text-slate-800 text-sm">{formatGHS(formData.budgetMax)}</span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl text-slate-600 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-agorazo-orange-500" />
              <span>What Happens Next?</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Our China procurement team is contacting automotive suppliers in Ningbo and Shenzhen. You will receive 2–3 proforma vehicle options with CIF Tema prices within 24 hours.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Submit Another Request
          </button>
          <a
            href="/customer/quotes"
            className="bg-agorazo-orange-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm hover:bg-agorazo-orange-600 transition-colors"
          >
            Track In My Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-24 md:pb-16">
      {/* Header (PRD Section 38) */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agorazo-orange-50 text-agorazo-orange-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vehicle Procurement Concierge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Can't find the car you want? <br />
          <span className="text-agorazo-orange-600">We'll help source it.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Direct sourcing through China automotive suppliers with shipping to Tema Port, customs assessment, and flexible milestone payments.
        </p>
      </div>

      {/* Multi-step Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8">
        {/* Step Stepper */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6 text-xs">
          {[
            { num: 1, title: 'Vehicle' },
            { num: 2, title: 'Budget & Fuel' },
            { num: 3, title: 'Contact' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${step >= s.num ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                  step === s.num
                    ? 'bg-agorazo-orange-500 text-white'
                    : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Vehicle Information */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Make / Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BYD, Leapmotor, Toyota"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Song Plus, Seal, C10, Prado"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Body Style</label>
                  <select
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  >
                    <option value="SUV">SUV / Crossover</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Pickup">Pickup Truck</option>
                    <option value="Hatchback">Hatchback / Shooting Brake</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Vehicle Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  >
                    <option value="Brand New (Factory Export)">Brand New (0 km Factory Export)</option>
                    <option value="Foreign Used Pristine">Foreign Used (Under 15,000 km)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.make || !formData.model) {
                      alert('Please specify the Make and Model');
                      return;
                    }
                    setStep(2);
                  }}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Next: Budget & Powertrain</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Powertrain */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Preferred Powertrain</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  >
                    <option value="Electric">100% Electric (EV)</option>
                    <option value="Hybrid">Plug-in Hybrid (PHEV/EREV)</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Budget Ceiling (GHS)</label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Approx: {formatGHS(formData.budgetMax)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Color & Options / Special Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Prefer white exterior with tan interior, panoramic roof, 360 camera..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Submit */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Ghana Phone (+233) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your request is sent directly to Agorazo’s certified vehicle procurement desk. No spam; you will receive verified proforma quotes with VIN confirmation and Bill of Lading timeline.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-orange-glow transition-all"
                >
                  Submit Sourcing Request
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
