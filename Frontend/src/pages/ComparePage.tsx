import React from 'react';
import { Link } from 'react-router-dom';
import { useSavedCars } from '../context/SavedCarsContext';
import { INITIAL_VEHICLES } from '../api/mockData';
import { X, Plus, Check, ArrowRight, Zap, Fuel, Layers } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareVehicles, toggleCompare, clearCompare } = useSavedCars();
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  if (compareVehicles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-agorazo-orange-50 text-agorazo-orange-500 flex items-center justify-center mx-auto">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">No Vehicles in Comparison</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Add up to 4 vehicles from the catalogue or vehicle detail pages to compare pricing, battery specs, and landed costs side-by-side.
        </p>
        <div>
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm"
          >
            <span>Browse Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compare Vehicles ({compareVehicles.length} of 4)
          </h1>
          <p className="text-xs text-slate-500">
            Side-by-side comparison of vehicle specifications and estimated landed costs.
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            {/* Header: Images & Names */}
            <thead>
              <tr className="border-b border-slate-100">
                <th className="p-4 w-44 bg-slate-50/70 font-bold text-slate-500 text-[11px] uppercase">
                  Vehicle Details
                </th>
                {compareVehicles.map((v) => (
                  <th key={v.id} className="p-4 min-w-[220px] align-top relative">
                    <button
                      onClick={() => toggleCompare(v.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                      title="Remove from compare"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-3">
                      <img src={v.images[0]} alt={v.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 leading-tight">
                      {v.year} {v.make} {v.model}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{v.badge || 'Standard Edition'}</div>
                    <div className="mt-3">
                      <Link
                        to={`/cars/${v.slug}`}
                        className="w-full bg-slate-900 hover:bg-agorazo-orange-500 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors text-[11px]"
                      >
                        <span>View Car</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </th>
                ))}
                {/* Empty slot if less than 4 */}
                {compareVehicles.length < 4 && (
                  <th className="p-4 min-w-[200px] align-middle text-center bg-slate-50/40">
                    <Link
                      to="/cars"
                      className="inline-flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-agorazo-orange-500 hover:border-agorazo-orange-300 transition-colors w-full"
                    >
                      <Plus className="w-6 h-6 mb-1 text-slate-400" />
                      <span className="font-bold text-xs">Add Vehicle</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Row: Price to Tema */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Price to Tema Port</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-extrabold text-slate-900 text-sm">
                    {formatGHS(v.priceToTema)}
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Est. Road Ready Total */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Est. Total Road-Ready</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-black text-agorazo-orange-600 text-sm">
                    {formatGHS(v.pricingBreakdown.estimatedRoadReady)}
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Sourcing Location */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Location / Supply</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-medium text-slate-700">
                    {v.location}
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Powertrain */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Fuel / Powertrain</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      {v.fuelType === 'Electric' ? <Zap className="w-3.5 h-3.5 text-emerald-600" /> : <Fuel className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{v.fuelType}</span>
                    </span>
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Range (if EV/Hybrid) */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Range / Battery</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-semibold text-slate-700">
                    {v.rangeKm ? `${v.rangeKm} km Range` : 'N/A'} {v.batteryKwh ? `(${v.batteryKwh} kWh)` : ''}
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Drivetrain */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Drivetrain</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-medium text-slate-700">
                    {v.driveType} • {v.transmission}
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>

              {/* Row: Seller */}
              <tr>
                <td className="p-4 font-bold text-slate-800 bg-slate-50/70">Seller & Verification</td>
                {compareVehicles.map((v) => (
                  <td key={v.id} className="p-4 font-medium text-slate-700">
                    <div>{v.seller.name}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" />
                      <span>Agorazo Verified</span>
                    </div>
                  </td>
                ))}
                {compareVehicles.length < 4 && <td className="bg-slate-50/40" />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
