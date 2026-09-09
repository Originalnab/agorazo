import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../api/mockData';
import { VehicleCard } from '../components/vehicle/VehicleCard';
import { PriceBreakdownModal } from '../components/vehicle/PriceBreakdownModal';
import { BottomSheet } from '../components/common/BottomSheet';
import { Vehicle, BodyType, VehicleOrigin } from '../types';
import { 
  Search, SlidersHorizontal, ArrowUpDown, LayoutGrid, List, 
  RotateCcw, Sparkles, Filter 
} from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedMake, setSelectedMake] = useState(searchParams.get('make') || 'all');
  const [selectedBodyType, setSelectedBodyType] = useState<string>(searchParams.get('type') || 'all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>(searchParams.get('origin') || 'all');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('location') || 'all');
  const [selectedFuel, setSelectedFuel] = useState<string>(searchParams.get('fuel') || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mobile filter bottom-sheet state
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [activeBreakdownVehicle, setActiveBreakdownVehicle] = useState<Vehicle | null>(null);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMake('all');
    setSelectedBodyType('all');
    setSelectedOrigin('all');
    setSelectedLocation('all');
    setSelectedFuel('all');
    setMaxPrice(1000000);
    setSearchParams({});
  };

  // Filtered & sorted vehicles
  const filteredVehicles = useMemo(() => {
    return INITIAL_VEHICLES.filter((v) => {
      // Search text match (Make, Model, Badge)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const textMatch =
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          (v.badge && v.badge.toLowerCase().includes(q));
        if (!textMatch) return false;
      }

      // Make / Brand
      if (selectedMake !== 'all' && v.make.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }

      // Body Type
      if (selectedBodyType !== 'all') {
        if (selectedBodyType === 'Hatchback' && v.bodyType !== 'Hatchback') return false;
        if (selectedBodyType === 'Saloon' && v.bodyType !== 'Saloon') return false;
        if (selectedBodyType === 'SUV' && v.bodyType !== 'SUV') return false;
        if (selectedBodyType === 'Pickup' && v.bodyType !== 'Pickup') return false;
      }

      // Origin Filter
      if (selectedOrigin !== 'all') {
        if (selectedOrigin === 'chinese' && v.origin !== 'chinese_import') return false;
        if (selectedOrigin === 'global' && v.origin !== 'american_global') return false;
        if (selectedOrigin === 'ghana' && v.availability !== 'available_ghana') return false;
      }

      // Availability / Sourcing Location
      if (selectedLocation === 'ghana' && v.availability !== 'available_ghana') return false;
      if (selectedLocation === 'transit' && v.availability !== 'in_transit') return false;
      if (selectedLocation === 'china' && v.availability !== 'available_china') return false;

      // Fuel Type
      if (selectedFuel !== 'all' && v.fuelType.toLowerCase() !== selectedFuel.toLowerCase()) {
        return false;
      }

      // Price limit
      if (v.priceToTema > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceToTema - b.priceToTema;
      if (sortBy === 'price_desc') return b.priceToTema - a.priceToTema;
      if (sortBy === 'year_desc') return b.year - a.year;
      return 0; // featured default
    });
  }, [searchQuery, selectedMake, selectedBodyType, selectedOrigin, selectedLocation, selectedFuel, maxPrice, sortBy]);

  const filterForm = (
    <div className="space-y-6 text-xs">
      {/* Brand / Make */}
      <div>
        <label className="block font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">
          Brand / Make
        </label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
        >
          <option value="all">All Brands</option>
          <option value="Jetour">Jetour (T2, Dashing, X70 Plus)</option>
          <option value="Changan">Changan (UNI-K, UNI-Z, UNI-V)</option>
          <option value="Toyota">Toyota (Vitz, Camry, RAV4, Prado, Hilux)</option>
          <option value="Honda">Honda (Civic, Accord, CR-V)</option>
          <option value="Hyundai">Hyundai (Elantra, Tucson)</option>
          <option value="BYD">BYD (Song Plus, Seal, Dolphin)</option>
          <option value="Ford">Ford (Ranger Wildtrak)</option>
          <option value="Geely">Geely (Monjaro)</option>
        </select>
      </div>

      {/* Vehicle Body Type / Category */}
      <div>
        <label className="block font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">
          Vehicle Category / Body Type
        </label>
        <div className="space-y-1.5 font-medium">
          {[
            { key: 'all', label: 'All Categories' },
            { key: 'Hatchback', label: 'Small Cars & Hatchbacks (Vitz, Dolphin)' },
            { key: 'Saloon', label: 'Saloons / Sedans (Camry, Accord, Civic, UNI-V)' },
            { key: 'SUV', label: 'SUVs (Jetour T2, UNI-K, RAV4, CR-V, Prado)' },
            { key: 'Pickup', label: 'Pickup Trucks (Hilux, Ranger Wildtrak)' },
          ].map((type) => (
            <label key={type.key} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="bodyType"
                checked={selectedBodyType === type.key}
                onChange={() => setSelectedBodyType(type.key)}
                className="text-agorazo-orange-500 focus:ring-agorazo-orange-500"
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Origin / Market Spec Filter */}
      <div>
        <label className="block font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">
          Origin & Market Spec
        </label>
        <div className="space-y-1.5 font-medium">
          {[
            { key: 'all', label: 'All Origins' },
            { key: 'chinese', label: 'Direct China Import (Jetour, Changan, BYD)' },
            { key: 'global', label: 'American & Global Spec (Toyota, Honda, Ford)' },
            { key: 'ghana', label: 'Available in Ghana Now (Duty Paid)' },
          ].map((origin) => (
            <label key={origin.key} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="origin"
                checked={selectedOrigin === origin.key}
                onChange={() => setSelectedOrigin(origin.key)}
                className="text-agorazo-orange-500 focus:ring-agorazo-orange-500"
              />
              <span>{origin.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sourcing & Shipping Location */}
      <div>
        <label className="block font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">
          Shipping & Sourcing Location
        </label>
        <div className="space-y-1.5 font-medium">
          {[
            { key: 'all', label: 'All Inventory' },
            { key: 'ghana', label: 'In Ghana (Immediate Handover)' },
            { key: 'transit', label: 'In Transit (Sea Freight to Tema)' },
            { key: 'china', label: 'Available from China Hubs' },
          ].map((loc) => (
            <label key={loc.key} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="location"
                checked={selectedLocation === loc.key}
                onChange={() => setSelectedLocation(loc.key)}
                className="text-agorazo-orange-500 focus:ring-agorazo-orange-500"
              />
              <span>{loc.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">
          Powertrain / Fuel
        </label>
        <div className="space-y-1.5 font-medium">
          {['all', 'Petrol', 'Diesel', 'Hybrid', 'Electric'].map((fuel) => (
            <label key={fuel} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="fuel"
                checked={selectedFuel.toLowerCase() === fuel.toLowerCase()}
                onChange={() => setSelectedFuel(fuel === 'all' ? 'all' : fuel)}
                className="text-agorazo-orange-500 focus:ring-agorazo-orange-500"
              />
              <span>{fuel === 'all' ? 'All Powertrains' : fuel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between font-bold text-slate-900 mb-2">
          <span className="uppercase text-[10px] tracking-wider">Max Budget</span>
          <span className="text-agorazo-orange-600 font-extrabold">GHS {maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={100000}
          max={1000000}
          step={20000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-agorazo-orange-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
          <span>GHS 100k</span>
          <span>GHS 1M</span>
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="w-full py-2.5 px-3 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-16">
      {/* Top Header & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Vehicle Catalogue & Search
            </h1>
            <p className="text-xs text-slate-500">
              Popular Chinese imports (Jetour, Changan UNI), Ghanaian household favorites (Toyota Vitz, Camry, RAV4, Honda, Hyundai), and Pickups.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Jetour, Changan, Vitz, Camry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500 shadow-sm"
            />
          </div>
        </div>

        {/* Quick Filter Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { label: 'All Cars', onClick: () => resetFilters(), active: selectedMake === 'all' && selectedBodyType === 'all' && selectedOrigin === 'all' },
            { label: 'Jetour (T2, Dashing, X70)', onClick: () => { setSelectedMake('Jetour'); setSelectedBodyType('all'); }, active: selectedMake.toLowerCase() === 'jetour' },
            { label: 'Changan (UNI-K, Z, V)', onClick: () => { setSelectedMake('Changan'); setSelectedBodyType('all'); }, active: selectedMake.toLowerCase() === 'changan' },
            { label: 'Toyota (Vitz, Camry, RAV4)', onClick: () => { setSelectedMake('Toyota'); setSelectedBodyType('all'); }, active: selectedMake.toLowerCase() === 'toyota' },
            { label: 'Honda (Civic, Accord, CR-V)', onClick: () => { setSelectedMake('Honda'); setSelectedBodyType('all'); }, active: selectedMake.toLowerCase() === 'honda' },
            { label: 'Hyundai (Elantra, Tucson)', onClick: () => { setSelectedMake('Hyundai'); setSelectedBodyType('all'); }, active: selectedMake.toLowerCase() === 'hyundai' },
            { label: 'Small Cars & Vitz', onClick: () => { setSelectedBodyType('Hatchback'); setSelectedMake('all'); }, active: selectedBodyType === 'Hatchback' },
            { label: 'Saloons / Sedans', onClick: () => { setSelectedBodyType('Saloon'); setSelectedMake('all'); }, active: selectedBodyType === 'Saloon' },
            { label: 'SUVs', onClick: () => { setSelectedBodyType('SUV'); setSelectedMake('all'); }, active: selectedBodyType === 'SUV' },
            { label: 'Pickups (Hilux, Ranger)', onClick: () => { setSelectedBodyType('Pickup'); setSelectedMake('all'); }, active: selectedBodyType === 'Pickup' },
          ].map((pill, i) => (
            <button
              key={i}
              onClick={pill.onClick}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                pill.active
                  ? 'bg-agorazo-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Toolbar: Filter toggle mobile, Results count, Sort, View mode */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle text-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterSheetOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold text-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <span className="font-bold text-slate-800">
              {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-1 text-slate-500 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agorazo-orange-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest</option>
              </select>
            </div>

            {/* Grid / List view toggle on desktop */}
            <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-xs text-agorazo-orange-600' : 'text-slate-400'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-xs text-agorazo-orange-600' : 'text-slate-400'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout with Desktop Sidebar and Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle sticky top-24">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-agorazo-orange-500" />
              <span>Refine Search</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-semibold text-slate-400 hover:text-slate-700"
            >
              Reset
            </button>
          </div>
          {filterForm}
        </aside>

        {/* Vehicles Grid / List */}
        <main className="lg:col-span-3">
          {filteredVehicles.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onOpenBreakdown={setActiveBreakdownVehicle}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-subtle space-y-4">
              <div className="w-16 h-16 rounded-full bg-agorazo-orange-50 text-agorazo-orange-500 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No vehicles match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your filters or submit a procurement request for this exact model.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
                <a
                  href="/request-a-car"
                  className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Request a Car
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile BottomSheet Filters */}
      <BottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filter Vehicles"
      >
        <div className="pt-2">
          {filterForm}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsFilterSheetOpen(false)}
              className="w-full bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold py-3.5 rounded-xl shadow-sm"
            >
              Apply Filters ({filteredVehicles.length} results)
            </button>
          </div>
        </div>
      </BottomSheet>

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
