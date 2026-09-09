import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_PRICING_RULES } from '../../api/mockData';
import { Sliders, Save, CheckCircle2, ArrowLeft, Plus } from 'lucide-react';

export const PricingEnginePage: React.FC = () => {
  const [rules, setRules] = useState(INITIAL_PRICING_RULES);
  const [clearingFee, setClearingFee] = useState(7000);
  const [dvlaFee, setDvlaFee] = useState(4500);
  const [deliveryFee, setDeliveryFee] = useState(1500);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateMarkup = (index: number, newMarkup: number) => {
    const updated = [...rules];
    updated[index].markupPercentage = newMarkup;
    setRules(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/dashboard"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-agorazo-orange-500 block">
            Pricing Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Vehicle Markups & Logistics Rules (PRD Section 64 & 65)
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Car-Type Markups Table (PRD Section 65) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Vehicle Category Markups</h3>
              <p className="text-slate-500 text-xs">
                Automatically applied to Chinese supplier base export CIF prices to calculate the customer price to Tema.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {rules.map((rule, idx) => (
              <div key={rule.category} className="p-4 flex items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{rule.category}</span>
                  <div className="text-slate-500 text-[11px]">{rule.notes}</div>
                </div>

                <div className="flex items-center gap-3">
                  {rule.markupPercentage > 0 ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={rule.markupPercentage}
                        onChange={(e) => handleUpdateMarkup(idx, Number(e.target.value))}
                        className="w-20 bg-white border border-slate-200 rounded-xl px-3 py-1.5 font-black text-slate-900 text-right focus:ring-2 focus:ring-agorazo-orange-500"
                      />
                      <span className="font-bold text-slate-600">%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 font-bold">GHS</span>
                      <input
                        type="number"
                        value={rule.fixedFee}
                        onChange={(e) => {
                          const updated = [...rules];
                          updated[idx].fixedFee = Number(e.target.value);
                          setRules(updated);
                        }}
                        className="w-28 bg-white border border-slate-200 rounded-xl px-3 py-1.5 font-black text-slate-900 text-right focus:ring-2 focus:ring-agorazo-orange-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Port & Logistics Service Fees (PRD Section 64) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Standard Automotive Service Fees</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <label className="block font-bold text-slate-800">
                Agorazo Customs Clearing Fee (GHS)
              </label>
              <input
                type="number"
                value={clearingFee}
                onChange={(e) => setClearingFee(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block">Agent coordination fee at Tema</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <label className="block font-bold text-slate-800">
                DVLA Registration & Plates (GHS)
              </label>
              <input
                type="number"
                value={dvlaFee}
                onChange={(e) => setDvlaFee(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block">Physical inspection & license plates</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <label className="block font-bold text-slate-800">
                Metro Doorstep Handover (GHS)
              </label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block">Accra / Tema flatbed carrier</span>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pricing rules successfully synced across live marketplace!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-black text-xs py-3.5 px-8 rounded-xl shadow-orange-glow transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Pricing Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
};
