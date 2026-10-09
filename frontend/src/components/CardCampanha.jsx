import React, { useState } from "react";
import { Building2, Calendar, ArrowRight, HeartHandshake, ImageOff } from "lucide-react";

export function CardCampanha({ campanha, onVerDetalhes, onDoar }) {
  const [imageError, setImageError] = useState(false);

  const formatarMoeda = (val) =>
    (Number(val) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  };

  const percentual = Math.min(100, Math.round(campanha.percentualAtingido || 0));
  const isAtiva = campanha.status === "ATIVA";

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Imagem com Fallback Inteligente */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {!imageError && campanha.imagemUrl ? (
          <img
            src={campanha.imagemUrl}
            alt={campanha.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50/50 text-slate-400 p-4 text-center">
            <ImageOff className="w-8 h-8 mb-1 text-slate-300" />
            <span className="text-xs font-medium text-slate-500">DoaSync • Apoio Social</span>
          </div>
        )}

        {/* Badge de Status */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
              isAtiva
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isAtiva ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {campanha.status === "ATIVA" ? "Ativa" : "Encerrada"}
          </span>
        </div>

        {/* Categoria */}
        {campanha.categoria && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 backdrop-blur-sm text-white">
              {campanha.categoria}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Entidade */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">
              {campanha.entidade?.nomeFantasia || campanha.entidade?.razaoSocial || "Entidade Parceira"}
            </span>
          </div>

          {/* Título */}
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {campanha.titulo}
          </h2>

          {/* Descrição resumida */}
          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {campanha.descricao}
          </p>
        </div>

        {/* Seção Financeira e Progresso */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-slate-500">Progresso</span>
            <span className="font-bold text-slate-900">{percentual}%</span>
          </div>

          {/* Barra de Progresso Acessível */}
          <div
            className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={percentual}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Progresso da campanha: ${percentual}% arrecadado`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentual >= 100
                  ? "bg-purple-600"
                  : isAtiva
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }`}
              style={{ width: `${percentual}%` }}
            />
          </div>

          {/* Valores Monetários */}
          <div className="mt-3 flex items-baseline justify-between text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Arrecadado</span>
              <span className="font-bold text-slate-900">
                {formatarMoeda(campanha.valorArrecadado)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Meta</span>
              <span className="font-medium text-slate-600">
                {formatarMoeda(campanha.metaValor)}
              </span>
            </div>
          </div>

          {/* Data de Encerramento */}
          {campanha.dataFim && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Término: {formatarData(campanha.dataFim)}</span>
            </div>
          )}

          {/* Ações */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onVerDetalhes(campanha)}
              className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <span>Detalhes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {campanha.recebendoDoacoes ? (
              <button
                type="button"
                onClick={() => onDoar(campanha)}
                className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Doar</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                Encerrada
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
