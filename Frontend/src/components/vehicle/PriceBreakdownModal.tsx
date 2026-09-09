import React from 'react';
import { Vehicle } from '../../types';
import { Modal } from '../common/Modal';
import { BottomSheet } from '../common/BottomSheet';
import { ShieldCheck, Info, HelpCircle } from 'lucide-react';

interface PriceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  isMobile?: boolean;
}

export const PriceBreakdownModal: React.FC<PriceBreakdownModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  isMobile = false,
}) => {
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;
  const breakdown = vehicle.pricingBreakdown;

  const content = (
    <div className="space-y-5">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-agorazo-orange-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900 block font-semibold mb-0.5">Transparent Landed Cost Guarantee</strong>
          Agorazo guarantees no hidden port surprises. You can purchase the vehicle delivered to Tema Port and clear it personally, or choose Agorazo's coordinated road-ready clearance package.
        </div>
      </div>

      <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-white text-sm">
        <div className="p-3.5 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="font-semibold text-slate-900">Vehicle + Ocean Shipping to Tema Port</div>
            <div className="text-xs text-slate-500">Includes China export processing & sea freight</div>
          </div>
          <div className="font-bold text-slate-900">{formatGHS(breakdown.vehicleAndShipping)}</div>
        </div>

        {vehicle.availability !== 'available_ghana' ? (
          <>
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800">Estimated Customs Duty (GRA)</div>
                <div className="text-xs text-slate-500">Based on engine capacity & vehicle valuation</div>
              </div>
              <div className="font-semibold text-slate-900">{formatGHS(breakdown.estimatedCustoms)}</div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800">Agorazo Customs Clearing Coordination</div>
                <div className="text-xs text-slate-500">Licensed clearing agent & port handling fees</div>
              </div>
              <div className="font-semibold text-slate-900">{formatGHS(breakdown.clearingFee)}</div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800">DVLA Inspection & Registration</div>
                <div className="text-xs text-slate-500">Physical inspection, roadworthiness & license plates</div>
              </div>
              <div className="font-semibold text-slate-900">{formatGHS(breakdown.dvlaFee)}</div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800">Doorstep Handover & Delivery</div>
                <div className="text-xs text-slate-500">Flatbed carrier to your location in Greater Accra / Tema</div>
              </div>
              <div className="font-semibold text-slate-900">{formatGHS(breakdown.deliveryFee)}</div>
            </div>
          </>
        ) : (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>This vehicle is already in Ghana. Customs duty and port fees have been fully settled!</span>
          </div>
        )}

        <div className="p-4 bg-agorazo-orange-50/60 flex items-center justify-between border-t-2 border-agorazo-orange-500">
          <div>
            <div className="font-bold text-slate-900 text-base">Estimated Total Road-Ready</div>
            <div className="text-xs text-slate-500">Turnkey price driven directly to your door</div>
          </div>
          <div className="font-extrabold text-agorazo-orange-600 text-lg sm:text-xl">
            {formatGHS(breakdown.estimatedRoadReady)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Customs duties are calculated according to Ghana Revenue Authority (GRA) Integrated Customs Management System (ICUMS) schedules.</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden sm:block">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model} — Price Breakdown`}
          description="Itemized calculation of vehicle, freight, statutory taxes, and logistics."
          maxWidth="lg"
        >
          {content}
        </Modal>
      </div>
      <div className="sm:hidden">
        <BottomSheet
          isOpen={isOpen}
          onClose={onClose}
          title="Price Breakdown & Taxes"
        >
          {content}
        </BottomSheet>
      </div>
    </>
  );
};
