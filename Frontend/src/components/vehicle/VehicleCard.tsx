import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../../types';
import { useSavedCars } from '../../context/SavedCarsContext';
import { Badge } from '../common/Badge';
import { Heart, CheckCircle2, Zap, Fuel, ArrowRight, Gauge, Anchor, MapPin } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onOpenBreakdown?: (v: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onOpenBreakdown }) => {
  const { isSaved, toggleSave, isCompared, toggleCompare } = useSavedCars();
  const saved = isSaved(vehicle.id);
  const compared = isCompared(vehicle.id);

  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  const getAvailabilityBadge = () => {
    switch (vehicle.availability) {
      case 'available_ghana':
        return <Badge variant="green" icon={<CheckCircle2 className="w-3 h-3" />}>In Ghana (Ready)</Badge>;
      case 'in_transit':
        return <Badge variant="blue" icon={<Anchor className="w-3 h-3" />}>In Transit</Badge>;
      case 'available_china':
      default:
        return <Badge variant="brand" icon={<MapPin className="w-3 h-3" />}>China Supply</Badge>;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/cars/jetour-t2.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {getAvailabilityBadge()}
        </div>

        {/* Action icons: Save Heart & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(vehicle.id);
            }}
            title={compared ? 'Remove from compare' : 'Compare vehicle'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              compared
                ? 'bg-agorazo-orange-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-agorazo-orange-500'
            }`}
          >
            <span className="text-[10px] font-bold px-0.5">VS</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(vehicle.id);
            }}
            aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              saved
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location / ETA Tag */}
        <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1 drop-shadow-sm">
          <span className="truncate max-w-[200px]">{vehicle.location}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller / Verification */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="truncate flex items-center gap-1">
              <span className="font-medium text-slate-700">{vehicle.seller.name}</span>
              {vehicle.seller.isVerified && (
                <span title="Verified by Agorazo">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </span>
              )}
            </span>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              {vehicle.year}
            </span>
          </div>

          {/* Title */}
          <Link to={`/cars/${vehicle.slug}`} className="block group-hover:text-agorazo-orange-600 transition-colors">
            <h3 className="font-bold text-base text-slate-900 line-clamp-1">
              {vehicle.make} {vehicle.model}
            </h3>
            {vehicle.badge && (
              <span className="text-xs text-slate-500 font-medium block truncate">
                {vehicle.badge}
              </span>
            )}
          </Link>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
              {vehicle.fuelType === 'Electric' ? (
                <Zap className="w-3 h-3 text-emerald-600" />
              ) : (
                <Fuel className="w-3 h-3 text-amber-600" />
              )}
              <span>{vehicle.fuelType}</span>
            </span>

            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
              <Gauge className="w-3 h-3 text-slate-400" />
              <span>{vehicle.mileage === 0 ? 'Brand New' : `${vehicle.mileage.toLocaleString()} km`}</span>
            </span>

            {vehicle.rangeKm && (
              <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium">
                {vehicle.rangeKm} km Range
              </span>
            )}
          </div>
        </div>

        {/* Pricing Area */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                {vehicle.availability === 'available_ghana' ? 'Selling Price' : 'Price to Tema Port'}
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {formatGHS(vehicle.priceToTema)}
              </div>
            </div>

            {vehicle.availability !== 'available_ghana' && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Est. Road Ready</span>
                <span className="text-xs font-bold text-agorazo-orange-600">
                  {formatGHS(vehicle.pricingBreakdown.estimatedRoadReady)}
                </span>
              </div>
            )}
          </div>

          {/* Card Footer CTAs */}
          <div className="mt-3 flex items-center gap-2">
            <Link
              to={`/cars/${vehicle.slug}`}
              className="flex-1 bg-slate-900 hover:bg-agorazo-orange-500 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {onOpenBreakdown && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenBreakdown(vehicle);
                }}
                className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Taxes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
