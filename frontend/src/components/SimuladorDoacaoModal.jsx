import React, { useState } from "react";
import { X, QrCode, CreditCard, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";

export function SimuladorDoacaoModal({ campanha, onClose, onDoacaoConfirmada }) {
  const [valor, setValor] = useState("50");
  const [metodo, setMetodo] = useState("PIX");
  const [concluido, setConcluido] = useState(false);

  if (!campanha) return null;

  const valoresRapidos = ["20", "50", "100", "200"];

  const handleConfirmar = (e) => {
    e.preventDefault();
    const valorNumerico = parseFloat(valor);
    if (!valorNumerico || valorNumerico <= 0) return;

    setConcluido(true);
    setTimeout(() => {
      onDoacaoConfirmada(campanha.id, valorNumerico);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Fechar simulação"
        >
          <X className="w-5 h-5" />
        </button>

        {concluido ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Doação Registrada com Sucesso!</h2>
            <p className="mt-2 text-sm text-slate-600">
              Obrigado por apoiar a <strong>{campanha.entidade?.nomeFantasia || "Entidade"}</strong>.
              O valor de <strong>R$ {parseFloat(valor).toFixed(2)}</strong> foi somado à campanha.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-medium">
              Demonstração do fluxo integrado do DoaSync (Módulo de Campanhas • Sprint 1).
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
              <HeartHandshake className="w-5 h-5" />
              <span>Simulação de Doação • DoaSync</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Apoiar: {campanha.titulo}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Beneficiária: {campanha.entidade?.razaoSocial}
            </p>

            <form onSubmit={handleConfirmar} className="mt-6 space-y-5">
              {/* Seleção de Valor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Escolha o Valor (R$)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {valoresRapidos.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValor(v)}
                      className={`py-2 text-sm font-bold rounded-xl border transition-all ${
                        valor === v
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      R$ {v}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-medium text-sm">R$</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 font-semibold"
                    placeholder="Outro valor..."
                    required
                  />
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Forma de Contribuição
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMetodo("PIX")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all ${
                      metodo === "PIX"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>Pix Instantâneo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodo("CARTAO")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all ${
                      metodo === "CARTAO"
                        ? "bg-blue-50 border-blue-500 text-blue-800"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {/* Aviso do MVP */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  Ambiente de demonstração da <strong>Sprint 1</strong>. Ao confirmar, o valor é somado na memória para exibição em tempo real do progresso da arrecadação.
                </span>
              </div>

              {/* Botões */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all"
                >
                  Confirmar Doação
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
