import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Shield, User, Store, Ship, Check, ChevronUp, ChevronDown } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { key: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'customer',
      label: 'Customer Mode',
      desc: 'Emmanuel Mensah (Active order & tracking)',
      icon: <User className="w-4 h-4 text-emerald-600" />,
    },
    {
      key: 'visitor',
      label: 'Visitor Mode',
      desc: 'Anonymous marketplace buyer',
      icon: <User className="w-4 h-4 text-slate-500" />,
    },
    {
      key: 'dealer',
      label: 'Dealer Mode',
      desc: 'Apex Motors (Inventory & Lead CRM)',
      icon: <Store className="w-4 h-4 text-blue-600" />,
    },
    {
      key: 'clearing',
      label: 'Clearing Agent',
      desc: 'Tema Port Cargo Assessment',
      icon: <Ship className="w-4 h-4 text-purple-600" />,
    },
    {
      key: 'admin',
      label: 'Agorazo Admin',
      desc: 'Pricing Engine & Operations Desk',
      icon: <Shield className="w-4 h-4 text-agorazo-orange-500" />,
    },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      <div className="bg-agorazo-charcoal-900 text-white rounded-2xl shadow-elevated border border-slate-700/80 overflow-hidden text-xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-800/80 transition-colors w-full text-left"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="font-semibold text-slate-200 capitalize">
            Role: <span className="text-agorazo-orange-400">{role}</span>
          </div>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 ml-1 text-slate-400" />}
        </button>

        {isOpen && (
          <div className="p-2 border-t border-slate-800 space-y-1 w-64 bg-agorazo-charcoal-950/95 backdrop-blur-md">
            <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Switch Persona Demo
            </div>
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setRole(r.key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                  role === r.key
                    ? 'bg-agorazo-orange-500/20 border border-agorazo-orange-500/40 text-white'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">{r.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold flex items-center justify-between text-xs">
                    <span>{r.label}</span>
                    {role === r.key && <Check className="w-3.5 h-3.5 text-agorazo-orange-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">{r.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
