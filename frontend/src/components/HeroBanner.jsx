import React from "react";
import { Sparkles, Users, Target, CheckCircle2 } from "lucide-react";

export function HeroBanner({ campanhas }) {
  const ativas = campanhas.filter((c) => c.status === "ATIVA").length;
  const totalArrecadado = campanhas.reduce((acc, c) => acc + (c.valorArrecadado || 0), 0);

  const formatarMoeda = (val) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50 pt-10 pb-8 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Projeto de Extensão — APAE & Amor Inclusivo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Campanhas que transformam vidas e fortalecem comunidades.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Acompanhe o andamento das arrecadações em tempo real e apoie iniciativas
            sociais dedicadas à inclusão, reabilitação e dignidade de pessoas assistidas.
          </p>
        </div>

        {/* Métricas Rápidas */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Campanhas Ativas</span>
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{ativas}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Total Mobilizado</span>
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-700">
              {formatarMoeda(totalArrecadado)}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Instituições Foco</span>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800">
              APAE & Amor Inclusivo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
