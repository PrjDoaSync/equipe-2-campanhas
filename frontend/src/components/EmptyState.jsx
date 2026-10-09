import React from "react";
import { SearchX, RotateCcw } from "lucide-react";

export function EmptyState({ onLimparFiltros }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Nenhuma campanha encontrada</h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
        Não encontramos campanhas correspondentes aos termos ou filtros selecionados. Tente ajustar a busca.
      </p>
      {onLimparFiltros && (
        <button
          type="button"
          onClick={onLimparFiltros}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Limpar filtros de busca</span>
        </button>
      )}
    </div>
  );
}
