import React, { useState } from 'react';
import { INITIAL_DOCUMENTS } from '../../api/mockData';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { FileText, Download, Eye, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<typeof INITIAL_DOCUMENTS[0] | null>(null);

  const categories = ['All', 'Purchase', 'Payments', 'Shipping', 'Customs'];

  const filteredDocs = selectedCategory === 'All'
    ? INITIAL_DOCUMENTS
    : INITIAL_DOCUMENTS.filter((d) => d.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 md:pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Vehicle Documents Vault
          </h1>
          <p className="text-xs text-slate-500">
            Certified trade documentation, statutory customs declarations, and payment receipts.
          </p>
        </div>

        {/* Category Filter Pills (PRD Section 37) */}
        <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-subtle text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-agorazo-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-5 hover:border-slate-300 transition-all flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-agorazo-orange-600" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gray" size="sm">{doc.category}</Badge>
                  {doc.verified && (
                    <Badge variant="green" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                      Verified
                    </Badge>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{doc.title}</h4>
                <div className="text-[11px] text-slate-400 font-mono">
                  {doc.fileName} • {doc.fileSize}
                </div>
                <div className="text-[11px] text-slate-500">Uploaded {doc.uploadedAt}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                title="Preview document"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Downloading verified PDF: ${doc.fileName}`)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-agorazo-orange-500 hover:text-white text-slate-700 transition-colors"
                title="Download document"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          title={previewDoc.title}
          description={`File: ${previewDoc.fileName} (${previewDoc.fileSize})`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3">
              <FileText className="w-12 h-12 text-agorazo-orange-500 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">{previewDoc.title}</div>
              <p className="text-slate-500 max-w-sm mx-auto text-xs">
                Official encrypted document generated for Agorazo Order AG-2026-000241 and customs declaration.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    alert(`Downloading ${previewDoc.fileName}`);
                    setPreviewDoc(null);
                  }}
                  className="bg-agorazo-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 mx-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Original PDF</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
