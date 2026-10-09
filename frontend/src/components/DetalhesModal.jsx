import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  Calendar,
  Share2,
  HeartHandshake,
  Check,
  MapPin,
  FileText,
  Target
} from "lucide-react";

export function DetalhesModal({ campanha, onClose, onDoar }) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!campanha) return null;

  const formatarMoeda = (val) =>
    (Number(val) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataStr;
  };

  const handleCopiarLink = () => {
    const link = `${window.location.origin}?campanhaId=${campanha.id}`;
    navigator.clipboard?.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const percentual = Math.min(100, Math.round(campanha.percentualAtingido || 0));
  const isAtiva = campanha.status === "ATIVA";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Cabeçalho do Modal com Imagem */}
        <div className="relative h-60 w-full bg-slate-100 flex-shrink-0">
          {campanha.imagemUrl ? (
            <img
              src={campanha.imagemUrl}
              alt={campanha.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-500 font-bold">
              DoaSync • Arrecadação Social
            </div>
          )}

          {/* Botão Fechar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge de Status */}
          <div className="absolute bottom-4 left-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                isAtiva
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
            >
              {isAtiva ? "Campanha Ativa" : "Campanha Encerrada"}
            </span>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 sm:p-8 flex-1">
          {/* Identificação da Entidade */}
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
            <Building2 className="w-4 h-4" />
            <span>{campanha.entidade?.razaoSocial || campanha.entidade?.nomeFantasia}</span>
          </div>

          <h1 id="modal-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {campanha.titulo}
          </h1>

          {/* Localização e Datas */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pb-4 border-b border-slate-100">
            {campanha.entidade?.cidade && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>
                  {campanha.entidade.cidade}/{campanha.entidade.estado}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                Período: {formatarData(campanha.dataInicio)} até {formatarData(campanha.dataFim)}
              </span>
            </div>
          </div>

          {/* Painel Financeiro de Progresso */}
          <div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Total Arrecadado</span>
              <span className="text-2xl font-black text-slate-900">
                {formatarMoeda(campanha.valorArrecadado)}
              </span>
            </div>

            {/* Barra de Progresso */}
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentual >= 100 ? "bg-purple-600" : "bg-emerald-500"
                }`}
                style={{ width: `${percentual}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
              <span>{percentual}% da meta atingida</span>
              <span>Meta total: {formatarMoeda(campanha.metaValor)}</span>
            </div>
          </div>

          {/* Descrição Detalhada */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              Sobre a Necessidade
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {campanha.descricao}
            </p>
          </div>
        </div>

        {/* Rodapé de Ações */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopiarLink}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
          >
            {copiado ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Fechar
            </button>

            {campanha.recebendoDoacoes ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onDoar(campanha);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-transform hover:scale-105"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Apoiar Agora</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-medium text-sm cursor-not-allowed"
              >
                Campanha Concluída
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
