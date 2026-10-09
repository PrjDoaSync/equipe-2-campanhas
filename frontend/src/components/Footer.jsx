import React from "react";
import { Heart, Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">DoaSync</span>
            </div>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Plataforma digital integrada de arrecadação e apoio comunitário.
              Projeto de Extensão Acadêmica desenvolvido com foco na APAE e Associação Amor Inclusivo.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
              Módulo de Campanhas (Equipe 2)
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>• Sprint 1: Fundação, Contratos e MVP</li>
              <li>• Sprint 2: Persistência e Gestão da Entidade</li>
              <li>• Sprint 3: Testes de Regressão e Doações Reais</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
              Repositórios do Projeto
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/PrjDoaSync/equipe-2-campanhas"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Repositório Equipe 2 (Campanhas)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <br />
              <a
                href="https://github.com/PrjDoaSync/doa-sync"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-800"
              >
                <Github className="w-4 h-4" />
                <span>Organização PrjDoaSync / DoaSync</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 DoaSync. Desenvolvido para impacto social.</p>
          <p>Entregas técnicas: CAM-T03 • CAM-T04 • CAM-T05</p>
        </div>
      </div>
    </footer>
  );
}
