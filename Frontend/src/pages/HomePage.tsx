import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../api/mockData';
import { VehicleCard } from '../components/vehicle/VehicleCard';
import { PriceBreakdownModal } from '../components/vehicle/PriceBreakdownModal';
import { Vehicle } from '../types';
import { 
  Search, Sparkles, ShieldCheck, Ship, FileCheck2, 
  ArrowRight, CheckCircle2, Zap, Car, Compass, ChevronRight,
  Clock, Layers, MapPin
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [activeBreakdownVehicle, setActiveBreakdownVehicle] = useState<Vehicle | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedMake) params.set('make', selectedMake);
    if (selectedBodyType) params.set('type', selectedBodyType);
    if (selectedBudget) params.set('budget', selectedBudget);
    navigate(`/cars?${params.toString()}`);
  };

  const availableInGhana = INITIAL_VEHICLES.filter((v) => v.availability === 'available_ghana');
  const inTransit = INITIAL_VEHICLES.filter((v) => v.availability === 'in_transit');
  const chineseImports = INITIAL_VEHICLES.filter((v) => v.origin === 'chinese_import');
  const smallCars = INITIAL_VEHICLES.filter((v) => v.bodyType === 'Hatchback');
  const saloons = INITIAL_VEHICLES.filter((v) => v.bodyType === 'Saloon');
  const pickups = INITIAL_VEHICLES.filter((v) => v.bodyType === 'Pickup');

  return (
    <div className="space-y-12 md:space-y-16 pb-20 md:pb-16">
      {/* 1. HERO SECTION (PRD Section 8 & 9) */}
      <section className="relative bg-gradient-to-b from-slate-900 via-agorazo-charcoal-900 to-slate-950 text-white overflow-hidden py-10 sm:py-16 lg:py-20">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-agorazo-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Headline & Search Box */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-agorazo-orange-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ghana's Premier Automotive Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Find Your Next Car. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-agorazo-orange-400 to-amber-300">
                  Buy. Sell. Drive.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Direct China imports (Jetour T2, Changan UNI, BYD) alongside Ghanaian household favorites (Toyota Vitz, Camry, RAV4, Honda, Hyundai). Enjoy transparent landed costs, 30/40/30 milestones, and turnkey clearing.
              </p>

              {/* Quick Search Widget */}
              <form
                onSubmit={handleSearch}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-slate-900 shadow-2xl border border-white/20 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Brand select */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 text-left">
                      Make / Brand
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    >
                      <option value="">All Brands</option>
                      <option value="Jetour">Jetour (T2, Dashing, X70)</option>
                      <option value="Changan">Changan (UNI-K, Z, V)</option>
                      <option value="Toyota">Toyota (Vitz, Camry, RAV4)</option>
                      <option value="Honda">Honda (Civic, Accord, CR-V)</option>
                      <option value="Hyundai">Hyundai (Elantra, Tucson)</option>
                      <option value="BYD">BYD (Song Plus, Seal)</option>
                      <option value="Ford">Ford (Ranger Wildtrak)</option>
                    </select>
                  </div>

                  {/* Body Type */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 text-left">
                      Body Type
                    </label>
                    <select
                      value={selectedBodyType}
                      onChange={(e) => setSelectedBodyType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
                    >
                      <option value="">All Categories</option>
                      <option value="SUV">SUV (Jetour, RAV4, CR-V)</option>
                      <option value="Saloon">Saloon (Camry, Accord, Civic)</option>
                      <option value="Hatchback">Small Car & Vitz</option>
                      <option value="Pickup">Pickup Truck (Hilux, Ranger)</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 text-left">
                      Budget (GHS)
                    </label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Any Budget</option>
                      <option value="under-150k">Under GHS 150,000 (Vitz)</option>
                      <option value="150k-250k">GHS 150,000 – 250,000</option>
                      <option value="250k-380k">GHS 250,000 – 380,000</option>
                      <option value="above-380k">GHS 380,000+</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Marketplace</span>
                  </button>

                  <Link
                    to="/request-a-car"
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Custom Car</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>
              </form>

              {/* Quick filter chips (PRD Section 9) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-medium pt-1">
                <span className="text-slate-400 text-[11px] mr-1">Trending:</span>
                {[
                  { label: 'Jetour T2 4WD', query: 'make=Jetour' },
                  { label: 'Changan UNI Series', query: 'make=Changan' },
                  { label: 'Toyota Vitz (Small Cars)', query: 'type=Hatchback' },
                  { label: 'Toyota Camry & Saloons', query: 'type=Saloon' },
                  { label: 'Hilux & Pickups', query: 'type=Pickup' },
                  { label: 'In Ghana Now', query: 'origin=ghana' },
                ].map((chip) => (
                  <Link
                    key={chip.label}
                    to={`/cars?${chip.query}`}
                    className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-full border border-slate-700 text-[11px] transition-colors"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Featured Hero Vehicle Card: Jetour T2 Traveller */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-agorazo-orange-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                <div className="relative bg-slate-900 rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={INITIAL_VEHICLES[0].images[0]}
                      alt="Featured Vehicle"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-agorazo-orange-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                      Trending • Jetour T2 4WD
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">2025 Model • Rugged 4x4 SUV</span>
                      <span className="text-xs bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
                        In Transit to Tema
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Jetour T2 (Traveller) Conquest 4WD
                    </h3>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">To Tema Port</div>
                        <div className="text-xl font-black text-white">GHS 340,000</div>
                      </div>
                      <Link
                        to={`/cars/${INITIAL_VEHICLES[0].slug}`}
                        className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Deal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: CHINESE SOURCING SPOTLIGHT (Jetour, Changan UNI, BYD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-agorazo-orange-600 uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Direct China Factory Sourcing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Chinese Models (Jetour & Changan UNI)
            </h2>
          </div>
          <Link
            to="/cars?origin=chinese"
            className="text-xs font-bold text-agorazo-orange-600 hover:text-agorazo-orange-700 flex items-center gap-1 shrink-0"
          >
            <span>View All Chinese Imports ({chineseImports.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseImports.slice(0, 3).map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenBreakdown={setActiveBreakdownVehicle}
            />
          ))}
        </div>
      </section>

      {/* 3. SECTION: POPULAR SALOONS & EVERYDAY CARS (Camry, Civic, Accord, UNI-V) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Car className="w-4 h-4" />
              <span>Executive & Sports Saloons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Saloons & Sedans (Camry, Accord, Civic, UNI-V)
            </h2>
          </div>
          <Link
            to="/cars?type=Saloon"
            className="text-xs font-bold text-agorazo-orange-600 hover:text-agorazo-orange-700 flex items-center gap-1 shrink-0"
          >
            <span>View All Saloons ({saloons.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saloons.slice(0, 3).map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenBreakdown={setActiveBreakdownVehicle}
            />
          ))}
        </div>
      </section>

      {/* 4. SECTION: SMALL CARS & CITY RUNABOUTS (Toyota Vitz & BYD Dolphin) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>City Economy & Ride-Hailing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Small Cars & Hatchbacks (Toyota Vitz & Dolphin)
            </h2>
          </div>
          <Link
            to="/cars?type=Hatchback"
            className="text-xs font-bold text-agorazo-orange-600 hover:text-agorazo-orange-700 flex items-center gap-1 shrink-0"
          >
            <span>View Small Cars ({smallCars.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {smallCars.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenBreakdown={setActiveBreakdownVehicle}
            />
          ))}
        </div>
      </section>

      {/* 5. SECTION: PICKUP TRUCKS (Toyota Hilux & Ford Ranger) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Ship className="w-4 h-4" />
              <span>Heavy Duty 4x4 Commercials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Double-Cabin Pickups (Toyota Hilux & Ford Ranger)
            </h2>
          </div>
          <Link
            to="/cars?type=Pickup"
            className="text-xs font-bold text-agorazo-orange-600 hover:text-agorazo-orange-700 flex items-center gap-1 shrink-0"
          >
            <span>View Pickups ({pickups.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pickups.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenBreakdown={setActiveBreakdownVehicle}
            />
          ))}
        </div>
      </section>

      {/* 6. REQUEST A CAR PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-agorazo-charcoal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-agorazo-orange-400 text-xs font-extrabold tracking-widest uppercase block">
              Custom Vehicle Procurement
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Can't find the exact car you want? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agorazo-orange-400 to-amber-300">
                We'll source it directly from China or US auctions.
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Whether you need a Changan UNI model, Jetour T2, or foreign used Toyota Camry, our procurement team provides verified quotations with ocean shipping to Tema and customs duty calculations.
            </p>
            <div className="pt-2">
              <Link
                to="/request-a-car"
                className="inline-flex items-center gap-2 bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-orange-glow transition-all"
              >
                <span>Submit Sourcing Request</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Price breakdown modal */}
      {activeBreakdownVehicle && (
        <PriceBreakdownModal
          isOpen={!!activeBreakdownVehicle}
          onClose={() => setActiveBreakdownVehicle(null)}
          vehicle={activeBreakdownVehicle}
        />
      )}
    </div>
  );
};
