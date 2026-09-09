import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../api/mockData';
import { useSavedCars } from '../context/SavedCarsContext';
import { useCheckout } from '../context/CartCheckoutContext';
import { PriceBreakdownModal } from '../components/vehicle/PriceBreakdownModal';
import { Badge } from '../components/common/Badge';
import { 
  Heart, Share2, ShieldCheck, CheckCircle2, 
  MapPin, Anchor, Fuel, Zap, Gauge, 
  ArrowRight, Phone, MessageSquare, 
  Layers, Check, ChevronRight, Info
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave, isCompared, toggleCompare } = useSavedCars();
  const { setCheckoutVehicle, toggleService, checkoutState } = useCheckout();

  // Find vehicle by slug or fallback to first
  const vehicle = INITIAL_VEHICLES.find((v) => v.slug === slug) || INITIAL_VEHICLES[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;
  const saved = isSaved(vehicle.id);
  const compared = isCompared(vehicle.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleStartCheckout = () => {
    setCheckoutVehicle(vehicle);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-32 md:pb-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/cars" className="hover:text-slate-900">Marketplace</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{vehicle.make} {vehicle.model}</span>
      </nav>

      {/* Main Grid: Left Gallery + Right Purchase Panel (PRD Section 17) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Large Image */}
          <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 shadow-card">
            <img
              src={vehicle.images[activeImageIndex]}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== vehicle.images[0]) {
                  target.src = vehicle.images[0];
                }
              }}
            />
            
            {/* Action buttons top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white shadow-sm transition-all"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleCompare(vehicle.id)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all text-xs font-bold ${
                  compared ? 'bg-agorazo-orange-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
                }`}
                title="Compare"
              >
                VS
              </button>

              <button
                onClick={() => toggleSave(vehicle.id)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all ${
                  saved ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
                }`}
                title="Save car"
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Availability Tag */}
            <div className="absolute top-4 left-4">
              {vehicle.availability === 'available_ghana' ? (
                <Badge variant="green" size="md" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Ready in Ghana
                </Badge>
              ) : vehicle.availability === 'in_transit' ? (
                <Badge variant="blue" size="md" icon={<Anchor className="w-3.5 h-3.5" />}>
                  In Transit to Tema
                </Badge>
              ) : (
                <Badge variant="brand" size="md" icon={<MapPin className="w-3.5 h-3.5" />}>
                  China Supply Hub
                </Badge>
              )}
            </div>

            {/* Image counter indicator */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
              {activeImageIndex + 1} / {vehicle.images.length} Photos
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {vehicle.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-agorazo-orange-500 shadow-sm scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== vehicle.images[0]) {
                      target.src = vehicle.images[0];
                    }
                  }}
                />
              </button>
            ))}
          </div>

          {/* Vehicle Specifications Grid (PRD Section 19) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-agorazo-orange-500" />
              <span>Key Technical Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Year</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.year}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Powertrain</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1">
                  {vehicle.fuelType === 'Electric' ? <Zap className="w-3.5 h-3.5 text-emerald-600" /> : <Fuel className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{vehicle.fuelType}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Transmission</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.transmission}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Drivetrain</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.driveType}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Mileage</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {vehicle.mileage === 0 ? '0 km (Brand New)' : `${vehicle.mileage.toLocaleString()} km`}
                </div>
              </div>

              {vehicle.rangeKm && (
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                  <div className="text-emerald-700 font-medium text-[10px] uppercase">Battery Range</div>
                  <div className="font-extrabold text-emerald-800 text-sm mt-0.5">{vehicle.rangeKm} km</div>
                </div>
              )}

              {vehicle.batteryKwh && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[10px] uppercase">Battery Capacity</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.batteryKwh} kWh</div>
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Exterior Color</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.color}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-slate-400 font-medium text-[10px] uppercase">Seating Capacity</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{vehicle.seats} Seats</div>
              </div>
            </div>
          </div>

          {/* Description & Equipment Highlights */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Vehicle Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {vehicle.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Included Features & Equipment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seller / Dealer Card (PRD Section 46) */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-agorazo-orange-50 text-agorazo-orange-600 flex items-center justify-center font-bold text-base shrink-0">
                {vehicle.seller.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                  <span>{vehicle.seller.name}</span>
                  {vehicle.seller.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div className="text-xs text-slate-500">{vehicle.seller.location} • ★ {vehicle.seller.rating} ({vehicle.seller.reviewCount} reviews)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${vehicle.seller.phone}`}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${vehicle.seller.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-700"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Purchasing Panel (PRD Section 17 & 20) (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-elevated space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                <span>VIN: {vehicle.vin || 'Available upon allocation'}</span>
                <span>{vehicle.location}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.badge && (
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{vehicle.badge}</div>
              )}
            </div>

            {/* Price Presentation (PRD Section 20) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    {vehicle.availability === 'available_ghana' ? 'Selling Price' : 'Price to Tema Port'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    {formatGHS(vehicle.priceToTema)}
                  </div>
                </div>

                {vehicle.availability !== 'available_ghana' && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block">Est. Road Ready</span>
                    <span className="text-base font-extrabold text-agorazo-orange-600">
                      {formatGHS(vehicle.pricingBreakdown.estimatedRoadReady)}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsBreakdownOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-agorazo-orange-600 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>View Full Itemized Price Breakdown</span>
              </button>
            </div>

            {/* Services Selector (PRD Section 22) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Automotive Services Package
                </h3>
                <span className="text-[11px] text-slate-400">Customizable</span>
              </div>

              {/* Service 1: Clearing */}
              {vehicle.availability !== 'available_ghana' && (
                <div
                  onClick={() => toggleService('clearing')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    checkoutState.services.clearing
                      ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border ${
                      checkoutState.services.clearing ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                    }`}>
                      {checkoutState.services.clearing && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Tema Port Customs Clearance</div>
                      <div className="text-[11px] text-slate-500">Includes ICUMS duty coordination & handling</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-900 shrink-0">
                    +{formatGHS(vehicle.pricingBreakdown.estimatedCustoms + vehicle.pricingBreakdown.clearingFee)}
                  </div>
                </div>
              )}

              {/* Service 2: DVLA */}
              <div
                onClick={() => toggleService('dvla')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  checkoutState.services.dvla
                    ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border ${
                    checkoutState.services.dvla ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                  }`}>
                    {checkoutState.services.dvla && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">DVLA Plates & Inspection</div>
                    <div className="text-[11px] text-slate-500">Roadworthy certificate & registration plates</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-900 shrink-0">
                  +{formatGHS(vehicle.pricingBreakdown.dvlaFee)}
                </div>
              </div>

              {/* Service 3: Delivery */}
              <div
                onClick={() => toggleService('delivery')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  checkoutState.services.delivery
                    ? 'border-agorazo-orange-500 bg-agorazo-orange-50/40'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border ${
                    checkoutState.services.delivery ? 'bg-agorazo-orange-500 border-agorazo-orange-500 text-white' : 'border-slate-300'
                  }`}>
                    {checkoutState.services.delivery && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Doorstep Delivery in Accra / Tema</div>
                    <div className="text-[11px] text-slate-500">Flatbed carrier to your residential/work address</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-900 shrink-0">
                  +{formatGHS(vehicle.pricingBreakdown.deliveryFee)}
                </div>
              </div>
            </div>

            {/* Payment Plan summary callout */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">Available Payment Option</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">30/40/30</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pay 30% initial deposit today, 40% before ship departure, and 30% upon arrival at Tema Port.
              </p>
            </div>

            {/* Main Primary CTA */}
            <button
              onClick={handleStartCheckout}
              className="w-full bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-orange-glow transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Start Order & Choose Payment Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Bank of Ghana regulated PSP payment protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE PURCHASE BAR (PRD Section 16) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3.5 pb-safe-bottom shadow-elevated">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Price to Tema</span>
            <div className="text-base font-extrabold text-slate-900">
              {formatGHS(vehicle.priceToTema)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${vehicle.seller.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold"
            >
              Ask
            </a>

            <button
              onClick={handleStartCheckout}
              className="bg-agorazo-orange-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <span>Start Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copy link toast feedback */}
      {copiedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-elevated animate-in fade-in zoom-in">
          Link copied to clipboard!
        </div>
      )}

      {/* Price breakdown modal */}
      <PriceBreakdownModal
        isOpen={isBreakdownOpen}
        onClose={() => setIsBreakdownOpen(false)}
        vehicle={vehicle}
      />
    </div>
  );
};
