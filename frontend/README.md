# Frontend — Módulo de Campanhas (Equipe 2)

> **Task associada:** [CAM-T05] Implementar frontend de listagem e detalhes consumindo a API inicial  
> **Issue oficial:** [#156](https://github.com/PrjDoaSync/doa-sync/issues/156)  
> **Responsável:** Pedro Vieira (`Trincademes`)  
> **Sprint:** 1  

Aplicação web desenvolvida em **React** e **Tailwind CSS** para a vitrine e detalhamento de campanhas da plataforma **DoaSync**, seguindo o [`DESIGN-SYSTEM.md`](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/DESIGN-SYSTEM.md) e as diretrizes de acessibilidade **WCAG 2.1 AA**.

---

## 🌟 Funcionalidades Implementadas

1. **Vitrine Pública de Campanhas:**
   - Exibição em cards modernos e responsivos (1 coluna mobile, 2 tablet, 3 desktop).
   - Imagens com fallback SVG temático para quando a imagem não carregar ou não existir.
   - Badges semânticos de status (`Ativa` em verde, `Encerrada` em cinza).
   - Nome e dados da entidade parceira (**APAE** e **Associação Amor Inclusivo**).
   - Barra de progresso visual acessível com `aria-valuenow`.
   - Valores monetários formatados em Real (`R$ Arrecadado` vs `R$ Meta`).

2. **Busca e Filtros em Tempo Real:**
   - Campo de pesquisa textual por título, necessidade ou categoria.
   - Filtros rápidos por status via chips (`Todas`, `Ativas`, `Encerradas`).
   - Seletor de entidade beneficiada.

3. **Tela de Detalhes da Campanha (Modal):**
   - Apresentação completa dos objetivos e história da necessidade.
   - Prazos com data de início e término.
   - Botão para copiar link direto de compartilhamento da campanha com feedback instantâneo.
   - Botão de apoio social com encaminhamento para doação.

4. **Simulador Interativo de Doação (Sprint 1):**
   - Escolha de valores rápidos (R$ 20, R$ 50, R$ 100, R$ 200) ou valor personalizado.
   - Métodos simulados (Pix e Cartão de Crédito).
   - Atualização em tempo real do progresso da campanha na interface.

5. **Tratamento de Estados Visuais:**
   - **Loading State:** Skeletons animados pulsantes (`animate-pulse`) idênticos à estrutura dos cards para evitar saltos de layout (CLS).
   - **Empty State:** Ilustração com mensagem amigável e atalho para limpar filtros quando nenhuma campanha for encontrada.
   - **Error State:** Banner de alerta com botão para tentar novamente caso a conexão falhe.
   - **Fallback Offline Inteligente:** Se o backend estiver desligado, a aplicação ativa automaticamente o modo de demonstração com dados simulados, mantendo 100% da usabilidade ativa.

---

## 🚀 Como Executar

### Pré-requisitos
* Node.js v18+ (testado no Node v22)
* npm

### Instalação
```bash
cd frontend
npm install
```

### Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse no navegador:
👉 `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

---

## ⚙️ Configuração da API

Por padrão, o frontend consome o backend em `http://localhost:8080/api/v1`.  
Para apontar para outro endereço, crie um arquivo `.env` na pasta `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 📁 Estrutura de Componentes

```text
frontend/src/
├── components/
│   ├── Navbar.jsx              # Cabeçalho com status da API
│   ├── HeroBanner.jsx          # Banner com métricas das entidades
│   ├── CardCampanha.jsx        # Card de campanha individual
│   ├── DetalhesModal.jsx       # Modal completo de detalhes da campanha
│   ├── SimuladorDoacaoModal.jsx# Simulação de doação da Sprint 1
│   ├── SkeletonCard.jsx        # Estado de carregamento
│   ├── EmptyState.jsx          # Estado de lista vazia
│   └── Footer.jsx              # Rodapé institucional
├── services/
│   └── campanhaService.js      # Integração com /api/v1/campanhas
├── App.jsx                     # Gerenciamento de estado e filtros
├── main.jsx                    # Ponto de montagem React
└── index.css                   # Diretivas Tailwind e foco acessível
```
