import React from 'react';
import { Link } from 'react-router-dom';
import { useSavedCars } from '../../context/SavedCarsContext';
import { VehicleCard } from '../../components/vehicle/VehicleCard';
import { Heart, ArrowRight } from 'lucide-react';

export const SavedCarsPage: React.FC = () => {
  const { savedVehicles } = useSavedCars();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Saved Vehicles ({savedVehicles.length})
        </h1>
        <p className="text-xs text-slate-500">
          Vehicles you have bookmarked for tracking prices and availability.
        </p>
      </div>

      {savedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Saved Cars Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Find vehicles you like in the catalogue and tap the heart to keep track of landed costs.
          </p>
          <div className="pt-2">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white text-xs font-bold py-3 px-6 rounded-xl shadow-sm"
            >
              <span>Browse Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
