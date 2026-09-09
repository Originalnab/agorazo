import React from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_QUOTES } from '../../api/mockData';
import { Badge } from '../../components/common/Badge';
import { Sparkles, ArrowRight, Clock, MessageSquare } from 'lucide-react';

export const QuotesPage: React.FC = () => {
  const formatGHS = (val: number) => `GHS ${val.toLocaleString()}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Procurement Quotations
          </h1>
          <p className="text-xs text-slate-500">
            Quotes received from China suppliers based on your custom vehicle sourcing requests.
          </p>
        </div>

        <Link
          to="/request-a-car"
          className="bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Sourcing Request</span>
        </Link>
      </div>

      <div className="space-y-4">
        {INITIAL_QUOTES.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">Quotes Available ({q.receivedQuotesCount})</Badge>
                <span className="font-mono text-slate-400">{q.id}</span>
              </div>
              <span className="text-slate-400">Requested {q.createdAt}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Vehicle</span>
                <span className="font-extrabold text-sm text-slate-900">{q.make} {q.model}</span>
                <span className="text-slate-500 block text-[11px]">{q.yearMin}–{q.yearMax} • {q.fuelType}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Budget Range</span>
                <span className="font-extrabold text-sm text-slate-900">{formatGHS(q.budgetMin)} – {formatGHS(q.budgetMax)}</span>
                <span className="text-slate-500 block text-[11px]">CIF Tema Port Target</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Supplier Status</span>
                <span className="font-bold text-emerald-600 block">2 Factory Matches Received</span>
                <span className="text-slate-500 block text-[11px]">Ready for allocation review</span>
              </div>
            </div>

            {q.notes && (
              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-[11px]">
                <strong>Notes:</strong> {q.notes}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <a
                href="https://wa.me/233240001234"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss With Agorazo Procurement Agent</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
