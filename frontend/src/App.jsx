import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { CardCampanha } from "./components/CardCampanha";
import { DetalhesModal } from "./components/DetalhesModal";
import { SimuladorDoacaoModal } from "./components/SimuladorDoacaoModal";
import { SkeletonCard } from "./components/SkeletonCard";
import { EmptyState } from "./components/EmptyState";
import { Footer } from "./components/Footer";
import { campanhaService } from "./services/campanhaService";
import { Search, Filter, RotateCcw, AlertCircle } from "lucide-react";

export function App() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Filtros
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("TODAS");
  const [entidadeFiltro, setEntidadeFiltro] = useState("");

  // Modais
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
  const [campanhaParaDoar, setCampanhaParaDoar] = useState(null);
  const [toastMensagem, setToastMensagem] = useState(null);

  const carregarCampanhas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await campanhaService.listarCampanhas({
        busca,
        status: statusFiltro,
        entidadeId: entidadeFiltro
      });

      setCampanhas(res.data);
      setIsFallback(res.isFallback);
    } catch (err) {
      console.error("Falha ao carregar campanhas:", err);
      setError("Não foi possível carregar as campanhas. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, [busca, statusFiltro, entidadeFiltro]);

  useEffect(() => {
    carregarCampanhas();
  }, [carregarCampanhas]);

  // Suporte a Deep-linking por URL (CAM-T03 / CAM-T05 / CAM-T12)
  useEffect(() => {
    if (campanhas.length > 0 && !campanhaSelecionada) {
      const params = new URLSearchParams(window.location.search);
      const idUrl = params.get("campanhaId");
      if (idUrl) {
        const encontrada = campanhas.find((c) => c.id === idUrl);
        if (encontrada) {
          setCampanhaSelecionada(encontrada);
        }
      }
    }
  }, [campanhas, campanhaSelecionada]);

  const handleLimparFiltros = () => {
    setBusca("");
    setStatusFiltro("TODAS");
    setEntidadeFiltro("");
  };

  const handleDoacaoConfirmada = (campanhaId, valorDoado) => {
    // Atualiza o valor na memória para feedback imediato
    setCampanhas((prev) =>
      prev.map((c) => {
        if (c.id === campanhaId) {
          const novoValor = (c.valorArrecadado || 0) + valorDoado;
          const novoPercentual = Math.min(100, Math.round((novoValor / c.metaValor) * 100));
          return {
            ...c,
            valorArrecadado: novoValor,
            percentualAtingido: novoPercentual
          };
        }
        return c;
      })
    );

    setCampanhaParaDoar(null);
    setToastMensagem(`Obrigado! Sua contribuição de R$ ${valorDoado.toFixed(2)} foi processada com sucesso.`);
    setTimeout(() => setToastMensagem(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar isFallback={isFallback} baseUrl={campanhaService.getBaseUrl()} />

      <HeroBanner campanhas={campanhas} />

      {/* Seção Principal de Campanhas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Barra de Busca e Filtros */}
        <section className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Input de Busca */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por título, necessidade ou palavra-chave..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 placeholder-slate-400"
              />
              {busca && (
                <button
                  type="button"
                  onClick={() => setBusca("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Filtros de Status (Chips) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </span>

              {[
                { id: "TODAS", label: "Todas" },
                { id: "ATIVA", label: "Ativas" },
                { id: "ENCERRADA", label: "Encerradas" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFiltro(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    statusFiltro === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Filtro de Entidade */}
              <select
                value={entidadeFiltro}
                onChange={(e) => setEntidadeFiltro(e.target.value)}
                className="ml-2 text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as Entidades</option>
                <option value="a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01">APAE</option>
                <option value="a1b2c3d4-2222-4a8b-9c0d-1e2f3a4b5c02">Amor Inclusivo</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notificação / Toast de Sucesso */}
        {toastMensagem && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-sm animate-fadeIn">
            <span>{toastMensagem}</span>
            <button
              type="button"
              onClick={() => setToastMensagem(null)}
              className="text-emerald-600 hover:text-emerald-800 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Alerta de Erro de Conexão */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={carregarCampanhas}
              className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid de Cards de Campanhas */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : campanhas.length === 0 ? (
          <EmptyState onLimparFiltros={handleLimparFiltros} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campanhas.map((campanha) => (
              <CardCampanha
                key={campanha.id}
                campanha={campanha}
                onVerDetalhes={(c) => setCampanhaSelecionada(c)}
                onDoar={(c) => setCampanhaParaDoar(c)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de Detalhes da Campanha */}
      {campanhaSelecionada && (
        <DetalhesModal
          campanha={campanhaSelecionada}
          onClose={() => setCampanhaSelecionada(null)}
          onDoar={(c) => setCampanhaParaDoar(c)}
        />
      )}

      {/* Modal de Simulação de Doação */}
      {campanhaParaDoar && (
        <SimuladorDoacaoModal
          campanha={campanhaParaDoar}
          onClose={() => setCampanhaParaDoar(null)}
          onDoacaoConfirmada={handleDoacaoConfirmada}
        />
      )}

      <Footer />
    </div>
  );
}
export default App;
