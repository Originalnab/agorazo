import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCheckout } from '../context/CartCheckoutContext';
import { 
  Check, ArrowRight, ShieldCheck, ChevronRight, 
  CreditCard, Smartphone, Building2, CheckCircle2, 
  MapPin, User, FileText, Clock, AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    checkoutState, 
    toggleService, 
    setPaymentPlanType, 
    calculateTotal, 
    createOrder 
  } = useCheckout();

  const [currentStep, setCurrentStep] = useState(1);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'momo' | 'telecel' | 'bank'>('momo');
  const [momoNumber, setMomoNumber] = useState('0244567890');

  const [customerDetails, setCustomerDetails] = useState({
    name: 'Emmanuel Mensah',
    phone: '+233 24 456 7890',
    email: 'emmanuel.mensah@gmail.com',
    ghanaPostGps: 'GA-492-1082 (East Legon)',
    ghanaCardNumber: 'GHA-718293041-9',
  });

  const {
    vehicleBase,
    customsDuty,
    clearingAgent,
    dvla,
    insurance,
    delivery,
    totalAmount,
    initialDue,
  } = calculateTotal();

  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;
  const v = checkoutState.vehicle;

  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const order = createOrder(customerDetails);
      setIsProcessingPayment(false);
      navigate(`/checkout/success?order=${order.orderNumber}`);
    }, 1500);
  };

  const steps = [
    { num: 1, title: 'Vehicle' },
    { num: 2, title: 'Services' },
    { num: 3, title: 'Plan' },
    { num: 4, title: 'Personal' },
    { num: 5, title: 'Review' },
    { num: 6, title: 'Pay' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-28 md:pb-16">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-agorazo-orange-500 block">
            Automotive Checkout Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Allocation & Settlement
          </h1>
        </div>
        <Link to={`/cars/${v.slug}`} className="text-xs font-semibold text-slate-400 hover:text-slate-700">
          Cancel & Exit
        </Link>
      </div>

      {/* 6-Step Stepper Header (PRD Section 23) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[500px]">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  currentStep === s.num
                    ? 'text-agorazo-orange-600 font-bold'
                    : currentStep > s.num
                    ? 'text-emerald-600 font-medium'
                    : 'text-slate-400'
                }`}
                onClick={() => {
                  if (currentStep > s.num) setCurrentStep(s.num);
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === s.num
                      ? 'bg-agorazo-orange-500 text-white ring-4 ring-agorazo-orange-100'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className="text-xs">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-3 ${
                    currentStep > idx + 1 ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Flow (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-6">
          {/* STEP 1: VEHICLE CONFIRMATION (PRD Section 24) */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <h3 className="font-extrabold text-base text-slate-900">Step 1: Confirm Vehicle</h3>
              <div className="flex gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 items-center">
                <img
                  src={v.images[0]}
                  alt={v.model}
                  className="w-24 h-16 object-cover rounded-xl shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {v.year} {v.make} {v.model}
                  </h4>
                  <div className="text-slate-500">{v.location}</div>
                  <div className="text-agorazo-orange-600 font-bold mt-1">
                    {formatGHS(v.priceToTema)} to Tema Port
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>VIN / Chassis Status:</span>
                  <span className="font-semibold text-slate-900">{v.vin || 'Factory Assigned'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Delivery Destination:</span>
                  <span className="font-semibold text-slate-900">Tema Port / Doorstep Greater Accra</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Estimated Transit:</span>
                  <span className="font-semibold text-slate-900">{v.etaWeeks || 'Standard Sea Freight'}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Continue to Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICES SELECTION (PRD Section 25) */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Step 2: Choose Add-On Services</h3>
                <p className="text-slate-500 mt-0.5">
                  Select which statutory and logistic services you want Agorazo to handle.
                </p>
              </div>

              <div className="space-y-3">
                {/* Clearing */}
                {v.availability !== 'available_ghana' && (
                  <div
                    onClick={() => toggleService('clearing')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      checkoutState.services.clearing
                        ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                        checkoutState.services.clearing ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                      }`}>
                        {checkoutState.services.clearing && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Agorazo Customs Clearing</div>
                        <div className="text-slate-500 text-[11px]">We manage ICUMS customs duty, port charges & clearing agents.</div>
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 shrink-0">
                      +{formatGHS(v.pricingBreakdown.estimatedCustoms + v.pricingBreakdown.clearingFee)}
                    </div>
                  </div>
                )}

                {/* DVLA */}
                <div
                  onClick={() => toggleService('dvla')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    checkoutState.services.dvla
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                      checkoutState.services.dvla ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                    }`}>
                      {checkoutState.services.dvla && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">DVLA Inspection & Registration</div>
                      <div className="text-slate-500 text-[11px]">Inspection certificate, license plates, roadworthy.</div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    +{formatGHS(v.pricingBreakdown.dvlaFee)}
                  </div>
                </div>

                {/* Insurance */}
                <div
                  onClick={() => toggleService('insurance')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    checkoutState.services.insurance
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                      checkoutState.services.insurance ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                    }`}>
                      {checkoutState.services.insurance && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Comprehensive Motor Insurance (1 Year)</div>
                      <div className="text-slate-500 text-[11px]">Full third party and comprehensive policy through licensed insurer.</div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    +GHS 6,500
                  </div>
                </div>

                {/* Delivery */}
                <div
                  onClick={() => toggleService('delivery')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    checkoutState.services.delivery
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                      checkoutState.services.delivery ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                    }`}>
                      {checkoutState.services.delivery && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Doorstep Flatbed Delivery</div>
                      <div className="text-slate-500 text-[11px]">Direct handover to your residential or office address in Greater Accra/Tema.</div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    +{formatGHS(v.pricingBreakdown.deliveryFee)}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Continue to Payment Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT PLAN (PRD Section 26 & 27) */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Step 3: Select Payment Arrangement</h3>
                <p className="text-slate-500 mt-0.5">
                  Choose between a single full settlement or verified staged milestones.
                </p>
              </div>

              <div className="space-y-3">
                {/* 30/40/30 Milestone Plan */}
                <div
                  onClick={() => setPaymentPlanType('30-40-30')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    checkoutState.paymentPlanType === '30-40-30'
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/30 ring-2 ring-agorazo-orange-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        checkoutState.paymentPlanType === '30-40-30' ? 'border-agorazo-orange-500' : 'border-slate-300'
                      }`}>
                        {checkoutState.paymentPlanType === '30-40-30' && <div className="w-2 h-2 rounded-full bg-agorazo-orange-500" />}
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">30 / 40 / 30 Milestone Import Plan</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      Recommended
                    </span>
                  </div>

                  {/* Visual Timeline (PRD Section 27) */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center pt-2 border-t border-slate-100">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-agorazo-orange-600">30% Today</div>
                      <div className="font-black text-slate-900 text-xs mt-0.5">{formatGHS(initialDue)}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">Vehicle Allocation</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500">40% Pre-Ship</div>
                      <div className="font-black text-slate-900 text-xs mt-0.5">{formatGHS(Math.round(totalAmount * 0.4))}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">Bill of Lading</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500">30% Arrival</div>
                      <div className="font-black text-slate-900 text-xs mt-0.5">{formatGHS(totalAmount - initialDue - Math.round(totalAmount * 0.4))}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">Tema Clearance</div>
                    </div>
                  </div>
                </div>

                {/* Full Upfront */}
                <div
                  onClick={() => setPaymentPlanType('full')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    checkoutState.paymentPlanType === 'full'
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/30 ring-2 ring-agorazo-orange-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        checkoutState.paymentPlanType === 'full' ? 'border-agorazo-orange-500' : 'border-slate-300'
                      }`}>
                        {checkoutState.paymentPlanType === 'full' && <div className="w-2 h-2 rounded-full bg-agorazo-orange-500" />}
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">100% Upfront Settlement</span>
                    </div>
                    <span className="font-black text-slate-900">{formatGHS(totalAmount)}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1.5 ml-6">
                    Settle total invoice now for prioritized expedited factory shipment processing.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PERSONAL & DELIVERY DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Step 4: Purchaser & Delivery Address</h3>
                <p className="text-slate-500 mt-0.5">
                  Required for DVLA title registration and customs clearance manifest.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Full Legal Name (as on Ghana Card) *</label>
                  <input
                    type="text"
                    required
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Phone Number (+233) *</label>
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">GhanaPost GPS Digital Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GA-492-1082"
                      value={customerDetails.ghanaPostGps}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, ghanaPostGps: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Ghana Card PIN (GHA-XXXXXXXXX-X) *</label>
                    <input
                      type="text"
                      required
                      placeholder="GHA-718293041-9"
                      value={customerDetails.ghanaCardNumber}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, ghanaCardNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & TERMS (PRD Section 28) */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Step 5: Review & Confirm Terms</h3>
                <p className="text-slate-500 mt-0.5">
                  Confirm your vehicle purchase breakdown and payment milestone agreement.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="text-slate-600">Vehicle:</span>
                  <span className="font-bold text-slate-900">{v.year} {v.make} {v.model}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="text-slate-600">Purchaser:</span>
                  <span className="font-bold text-slate-900">{customerDetails.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="text-slate-600">Selected Plan:</span>
                  <span className="font-bold text-slate-900">
                    {checkoutState.paymentPlanType === '30-40-30' ? '30/40/30 Milestone Import Plan' : '100% Upfront Settlement'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="text-slate-600">Total Purchase Commitment:</span>
                  <span className="font-bold text-slate-900">{formatGHS(totalAmount)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="font-extrabold text-slate-900">Amount Payable Today:</span>
                  <span className="font-black text-agorazo-orange-600 text-base">{formatGHS(initialDue)}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 text-agorazo-orange-500 rounded focus:ring-agorazo-orange-500 w-4 h-4"
                />
                <span className="text-[11px] text-slate-700 leading-normal">
                  I agree to the purchase terms, vehicle allocation conditions, and understand that payment confirms the sea freight allocation and initial order milestone.
                </span>
              </label>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!agreedTerms}
                  onClick={() => setCurrentStep(6)}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: PAYMENT EXPERIENCE (PRD Section 29) */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Step 6: Select Payment Method</h3>
                <p className="text-slate-500 mt-0.5">
                  Processed securely via Bank of Ghana licensed Enhanced PSP (Paystack / Hubtel).
                </p>
              </div>

              <div className="space-y-3">
                {/* MTN MoMo */}
                <div
                  onClick={() => setSelectedPaymentMethod('momo')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedPaymentMethod === 'momo'
                      ? 'border-agorazo-orange-500 bg-amber-50/50 ring-2 ring-amber-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xs">
                      MoMo
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">MTN Mobile Money</div>
                      <div className="text-slate-500 text-[11px]">Instant USSD authorization (*170#)</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{formatGHS(initialDue)}</span>
                </div>

                {/* Telecel Cash */}
                <div
                  onClick={() => setSelectedPaymentMethod('telecel')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedPaymentMethod === 'telecel'
                      ? 'border-agorazo-orange-500 bg-red-50/50 ring-2 ring-red-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs">
                      Cash
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Telecel Cash</div>
                      <div className="text-slate-500 text-[11px]">Direct mobile wallet push prompt</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{formatGHS(initialDue)}</span>
                </div>

                {/* Bank Transfer */}
                <div
                  onClick={() => setSelectedPaymentMethod('bank')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedPaymentMethod === 'bank'
                      ? 'border-agorazo-orange-500 bg-slate-100 ring-2 ring-slate-300'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Bank Wire / GhanaPay</div>
                      <div className="text-slate-500 text-[11px]">GCB, Stanbic, Ecobank direct settlement</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{formatGHS(initialDue)}</span>
                </div>
              </div>

              {/* Mobile prompt number confirmation */}
              {(selectedPaymentMethod === 'momo' || selectedPaymentMethod === 'telecel') && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <label className="block font-bold text-slate-800">
                    Wallet Number for Authorization Prompt
                  </label>
                  <input
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-agorazo-orange-500"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    You will receive a mobile money prompt on this phone to enter your 4-digit PIN.
                  </span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleCompletePayment}
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-black text-xs py-3.5 px-8 rounded-xl shadow-orange-glow transition-all flex items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span>Processing Authorization...</span>
                  ) : (
                    <>
                      <span>Authorize Payment ({formatGHS(initialDue)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Transaction Summary
          </h3>

          <div className="space-y-2.5 text-slate-600">
            <div className="flex justify-between">
              <span>Vehicle + Ocean Freight</span>
              <span className="font-bold text-slate-900">{formatGHS(vehicleBase)}</span>
            </div>

            {checkoutState.services.clearing && (
              <>
                <div className="flex justify-between">
                  <span>Customs Duty (GRA ICUMS)</span>
                  <span className="font-semibold text-slate-900">{formatGHS(customsDuty)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agorazo Clearing Coordination</span>
                  <span className="font-semibold text-slate-900">{formatGHS(clearingAgent)}</span>
                </div>
              </>
            )}

            {checkoutState.services.dvla && (
              <div className="flex justify-between">
                <span>DVLA Plates & Inspection</span>
                <span className="font-semibold text-slate-900">{formatGHS(dvla)}</span>
              </div>
            )}

            {checkoutState.services.insurance && (
              <div className="flex justify-between">
                <span>Comprehensive Insurance</span>
                <span className="font-semibold text-slate-900">{formatGHS(insurance)}</span>
              </div>
            )}

            {checkoutState.services.delivery && (
              <div className="flex justify-between">
                <span>Metro Handover Delivery</span>
                <span className="font-semibold text-slate-900">{formatGHS(delivery)}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200/80 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-800 font-bold">Total Landed Amount:</span>
              <span className="text-base font-extrabold text-slate-900">{formatGHS(totalAmount)}</span>
            </div>

            <div className="p-3 bg-agorazo-orange-50 rounded-2xl border border-agorazo-orange-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-agorazo-orange-800 uppercase block">Due Today (Deposit)</span>
                <span className="text-xs text-agorazo-orange-600">
                  {checkoutState.paymentPlanType === '30-40-30' ? 'Milestone 1 of 3' : 'Full Settlement'}
                </span>
              </div>
              <div className="text-lg font-black text-agorazo-orange-700">
                {formatGHS(initialDue)}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Escrow & milestone tracking guarantees vehicle export documentation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
