import React from "react";
import { Heart, Globe, ShieldCheck } from "lucide-react";

export function Navbar({ isFallback, baseUrl }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Doa<span className="text-blue-600">Sync</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Módulo de Campanhas
              </span>
            </div>
          </div>

          {/* Links e Badges */}
          <div className="flex items-center gap-4">
            {/* Status da Conexão com API */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  isFallback
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-emerald-50 text-emerald-800 border-emerald-300"
                }`}
                title={`Endereço base: ${baseUrl}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFallback ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                  }`}
                />
                <span className="hidden md:inline">
                  {isFallback ? "Modo Offline (Simulado)" : "API Conectada"}
                </span>
                <span className="md:hidden">
                  {isFallback ? "Offline" : "API"}
                </span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>APAE & Amor Inclusivo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
