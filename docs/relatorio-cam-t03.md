# Relatório de Revisão e Reutilização de Protótipos — CAM-T03

> **Projeto:** DoaSync — Plataforma de Conexão e Arrecadação Social  
> **Módulo:** Campanhas (Equipe 2)  
> **Atividade:** [CAM-T03] Revisar e reutilizar protótipos de campanhas da Equipe 4  
> **Issue oficial:** [#154](https://github.com/PrjDoaSync/doa-sync/issues/154)  
> **Responsável:** Pedro Vieira (`Trincademes`)  
> **Sprint:** 1  
> **Status:** Concluído / Em Revisão (In Review)  

---

## 1. Objetivo e Escopo

O objetivo desta atividade é realizar a revisão detalhada, alinhamento técnico e mapeamento para desenvolvimento dos protótipos visuais de campanhas criados no Figma pela **Equipe 4 (Gestão e Dashboard)**.

Esta atividade assegura que o desenvolvimento de frontend da Equipe 2 (**CAM-T05** e futuras telas de gestão) esteja 100% alinhado com o [Design System oficial do DoaSync](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/DESIGN-SYSTEM.md), com o [Contrato de Rotas da API](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md), com os critérios de acessibilidade (WCAG 2.1 AA) e com a experiência responsiva em dispositivos móveis e desktop.

---

## 2. Rastreabilidade dos Protótipos de Origem (Equipe 4)

Os protótipos de origem foram inspecionados diretamente no arquivo oficial do projeto no Figma e nas issues de planejamento da Equipe 4:

* **Link Oficial do Figma:** [DoaSync — Protótipos Figma (Node 55-2)](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-2)
* **Organização das Issues de Origem:**

| ID de Origem | Título da Issue / Protótipo | Escopo Mapeado para o Módulo de Campanhas |
|---|---|---|
| [equipe-4#48](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/48) | *[CAM-01] Home pública - vitrine de campanhas em destaque* | Vitrine inicial, cards de destaque, badges de urgência e chamadas de ação para doação. |
| [equipe-4#49](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/49) | *[CAM-02] Listagem de campanhas com filtros* | Grade pública de campanhas, busca por palavra-chave, filtros por entidade (APAE / Amor Inclusivo) e status. |
| [equipe-4#10](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/10) | *[IS-01] Prototipar 10 Telas de Campanhas* | Conjunto das 10 telas desktop do fluxo de campanhas (vitrine, detalhes, criação, gestão, encerramento). |
| [equipe-4#28](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/28) | *Implementar telas de Gestão de Campanhas, Doações e Entidades* | Interface administrativa privada da entidade para controle de status (*Rascunho*, *Ativa*, *Encerrada*). |

### 2.1 Mapeamento das 10 Telas Propostas na Issue #10 da Equipe 4

| Tela | Nome no Protótipo da Equipe 4 | Reutilização no Módulo de Campanhas (Equipe 2) |
|:---:|---|---|
| **01** | Home pública / vitrine de campanhas em destaque | Reutilizada diretamente na tela inicial pública do frontend (**CAM-T05**). |
| **02** | Listagem de campanhas com filtros | Reutilizada na visualização em grade com filtros por status e entidade (**CAM-T05**). |
| **03** | Detalhe da campanha | Reutilizada no Modal e visão detalhada de metas, prazos e entidade (**CAM-T05**). |
| **04** | Criar campanha - dados básicos | Base de especificação para o formulário de cadastro (**CAM-T09 / #160**). |
| **05** | Criar campanha - meta financeira e/ou itens | Base para definição de metas monetárias e itens físicos (**CAM-T09 / #160**). |
| **06** | Criar campanha - imagens, revisão e publicação | Base para módulo de anexação de mídia e publicação (**CAM-T09 / #160**). |
| **07** | Minhas campanhas | Base para a tela privada de gestão de campanhas da entidade (**CAM-T17 / #168**). |
| **08** | Editar campanha | Base para formulário de alteração de rascunhos e campanhas (**CAM-T09 / #160**). |
| **09** | Acompanhamento da campanha | Base para métricas e indicadores de arrecadação (**CAM-T13 / #164**). |
| **10** | Encerramento e prestação de contas | Base para fluxo de fechamento e transparência (**CAM-T08 / #159**). |

---

## 3. Lacunas Identificadas nos Protótipos da Equipe 4 (Registro de Gaps)

A inspeção detalhada das issues e frames da Equipe 4 apontou as seguintes lacunas técnicas e de UX, as quais foram solucionadas na implementação da Equipe 2:

1. **Ausência de Layouts Mobile/Tablet no Figma:**  
   * *Lacuna:* A Equipe 4 prototipou apenas telas em viewport desktop (1440px), sem frames dedicados para dispositivos móveis (`< 768px`) ou tablets (`768px - 1024px`).
   * *Solução Equipe 2:* Implementação de grid responsivo fluido no Tailwind CSS (1 coluna no mobile, 2 no tablet, 3 no desktop) e botões com alvos de toque mínimos de 44x44px.

2. **Ausência de Frames para Estados de Transição e Exceção:**  
   * *Lacuna:* O protótipo de origem não contemplou telas para carregamento (Loading/Skeletons), listas vazias (Empty State), falha de conexão de API (Error State) ou rota inexistente (404 Not Found).
   * *Solução Equipe 2:* Criação de componentes dedicados no frontend (`SkeletonCard.jsx`, `EmptyState.jsx`, banner de erro com retry e modal 404).

3. **Indefinição de Fallback para Imagens Ausentes:**  
   * *Lacuna:* Não havia tratamento previsto para campanhas sem foto cadastrada (`imagemUrl: null`) ou URLs externas quebradas.
   * *Solução Equipe 2:* Adição de container com SVG vetorial gradiente temático do DoaSync e tratamento automático via evento `onError` da tag de imagem.

4. **Indefinição da Transição para o Módulo de Doações (Equipe 3):**  
   * *Lacuna:* Os botões "Doar" no protótipo não especificavam os dados necessários a serem transmitidos para o fluxo de pagamento/checkout.
   * *Solução Equipe 2:* Especificação e simulação do contrato de handoff com o módulo de Doações (ver Seção 4.1).

5. **Diferenciação de Status Público vs. Administrativo:**  
   * *Lacuna:* O protótipo exibia indistintamente campanhas sem indicar a regra de que campanhas em *Rascunho* nunca podem ser expostas na vitrine pública.
   * *Solução Equipe 2:* Trava estrita no backend (CAM-T04) e frontend (CAM-T05), expondo publicamente apenas campanhas `ATIVA` e `ENCERRADA`.

---

## 4. Mapeamento de Telas e Estrutura de Componentes

### 4.1 Tela 1: Vitrine e Listagem Pública de Campanhas
* **Objetivo:** Permitir ao doador navegar pelas iniciativas sociais ativas das entidades cadastradas.
* **Componentes Principais:**
  1. **Header Institucional:** Navegação global, logo DoaSync, links rápidos (*Início*, *Campanhas*, *Entidades*).
  2. **Banner Hero com Indicadores:** Apresentação da causa social com foco na APAE e Associação Amor Inclusivo.
  3. **Barra de Busca e Filtros Rápidos:**
     - Campo de texto para filtro por título com ícone de pesquisa (`Search`).
     - Abas/Chips de filtro por status (`Todas`, `Ativas`, `Encerradas`).
     - Seletor de entidade beneficiada (APAE / Amor Inclusivo).
  4. **Grid Responsivo de Cards de Campanha:**
     - Grade em 1 coluna no mobile (`< 768px`), 2 colunas no tablet (`768px - 1023px`) e 3 colunas no desktop (`>= 1024px`).
  5. **Card de Campanha Individual:**
     - Imagem da campanha em proporção 16:9 com fallback inteligente.
     - Badge flutuante de status (*ATIVA* em verde esmeralda, *ENCERRADA* em cinza ardósia).
     - Nome da entidade assistencial com badge institucional.
     - Título com truncamento em até 2 linhas (`line-clamp-2`).
     - Breve descrição resumida.
     - Barra de progresso acessível (`role="progressbar"`).
     - Valores monetários em destaque: `R$ Arrecadado` vs `R$ Meta`.
     - Botões de ação rápida: `Detalhes` e `Doar`.

### 4.2 Tela 2: Detalhes da Campanha
* **Objetivo:** Apresentar a prestação de contas, a meta financeira, a história da necessidade e o gatilho de doação.
* **Componentes Principais:**
  1. **Banner Principal:** Imagem em alta resolução com fallback para ausência de foto.
  2. **Cabeçalho da Campanha:** Título h1, badge de status e data de encerramento formatada.
  3. **Card da Entidade Responsável:** Razão social, nome fantasia, cidade/UF e resumo da missão.
  4. **Painel de Arrecadação:**
     - Valor acumulado em fonte de grande destaque (`text-2xl font-black`).
     - Meta estipulada e percentual atingido formatado em moeda brasileira (BRL).
     - Barra de progresso com cor semântica.
  5. **Ações:**
     - Botão primário: `Apoiar Agora` (habilitado apenas se `recebendoDoacoes: true`).
     - Botão secundário: `Compartilhar` (copia link direto com parâmetro `?campanhaId={id}`).

### 4.3 Navegação e Handoff até o Módulo de Doações (Equipe 3)
Ao acionar o botão `Doar` no Card ou `Apoiar Agora` no Modal de Detalhes, a aplicação executa o fluxo acordado com a Equipe de Doações:
* **Validação de Elegibilidade:** O botão só fica ativo se `status === "ATIVA"` e a data corrente estiver dentro do período de vigência (`recebendoDoacoes: true`). Campanhas encerradas exibem botão desabilitado com o rótulo *"Campanha Concluída"*.
* **Payload de Integração:**
  ```json
  {
    "campanhaId": "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c01",
    "entidadeId": "a1b2c3d4-1111-4a8b-9c0d-1e2f3a4b5c01",
    "tituloCampanha": "Cadeiras de Rodas Adaptadas para Alunos da APAE",
    "metaValor": 12000.00,
    "valorArrecadado": 7800.00,
    "metodosDisponiveis": ["PIX", "CARTAO", "BOLETO"]
  }
  ```
* **Feedback em Tempo Real:** No simulador implementado para a Sprint 1, a confirmação da doação atualiza imediatamente o acumulado em memória e a barra de progresso da campanha.

---

## 5. Mapeamento de Estados da Interface (Design System)

Para assegurar uma experiência de usuário sem quebras e consistente com as diretrizes do `DESIGN-SYSTEM.md`:

```
┌──────────────────────────────────────────────────────────────┐
│                    ESTADOS DA INTERFACE                      │
├──────────────────────────────────────────────────────────────┤
│ 1. Loading State     -> Skeletons pulsantes (animate-pulse)  │
│ 2. Empty State       -> Ícone de lupa/caixa + Ação de limpar │
│ 3. Error State       -> Banner de erro + Botão Tentar Novam. │
│ 4. Not Found (404)   -> Modal / Aviso de campanha inexist.   │
│ 5. Indisponível      -> Badge Encerrada + Botão desabilitado │
│ 6. Image Fallback    -> Placeholder SVG temático DoaSync     │
└──────────────────────────────────────────────────────────────┘
```

1. **Carregando (Loading / Skeletons):**  
   Não utilizar spinners isolados que causam salto de layout. Exibir réplicas cinzas animadas (`bg-slate-200 animate-pulse rounded`).
2. **Lista Vazia (Empty State):**  
   Acionado quando a busca por texto ou filtro de entidade não encontra registros. Exibe ícone, mensagem orientativa e botão para limpar filtros.
3. **Falha de Conexão (Error State):**  
   Acionado caso a API backend esteja indisponível. Exibe alerta semântico com botão para tentar novamente.
4. **Campanha Inexistente (404):**  
   Retornado quando um ID informado via URL não existe ou é um rascunho não público.
5. **Indisponível / Encerrada:**  
   Campanhas com meta atingida ou período expirado mantêm visibilidade pública para prestação de contas, mas com botão de doação bloqueado.
6. **Ausência de Imagem (Image Fallback):**  
   Renderiza placeholder gradiente elegante caso `imagemUrl` seja nulo ou ocorra erro de rede na mídia.

---

## 6. Design Tokens e Conformidade Visual

Seguindo estritamente as especificações do `docs/DESIGN-SYSTEM.md`:

| Token | Valor Oficial | Aplicação nos Componentes |
|---|---|---|
| **Brand Primary** | `#2563EB` (`blue-600`) | Botões de Doação, cabeçalhos de destaque, links ativos. |
| **Brand Hover** | `#1D4ED8` (`blue-700`) | Estado `:hover` dos botões primários. |
| **Brand Secondary** | `#F1F5F9` (`slate-100`) | Fundo de botões secundários, cards de apoio. |
| **Feedback Success** | `#10B981` / `#059669` | Barra de progresso de arrecadação, badge de campanha `ATIVA`. |
| **Feedback Warning** | `#F59E0B` (`amber-500`) | Campanhas próximas da data limite de encerramento. |
| **Feedback Error** | `#EF4444` (`red-500`) | Alertas de validação e status `DESATIVADA`. |
| **Background Superfície** | `#FFFFFF` (`white`) | Fundo de cards, modais e containers. |
| **Background Página** | `#F8FAFC` (`slate-50`) | Fundo principal da aplicação. |
| **Tipografia** | Família `Inter`, sans-serif | Títulos em `font-bold` (18px a 30px), corpo em 14px/16px. |
| **Border Radius** | `rounded-2xl` / `rounded-3xl` | Cards e modais modernos. |
| **Border Radius** | `rounded-full` | Badges de status e barra de progresso. |

---

## 7. Acessibilidade (WCAG 2.1 Nível AA)

1. **Relação de Contraste:** Mínimo de 4.5:1 para todos os textos informativos e botões em relação ao fundo.
2. **Navegação por Teclado:**
   - Todos os elementos clicáveis recebem foco visível (`focus:ring-2 focus:ring-blue-500 focus:outline-none`).
   - Modais possuem fechamento nativo pela tecla `Escape`.
3. **Leitores de Tela:**
   - Barra de progresso com `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` e `aria-label`.
   - Modais acessíveis com `role="dialog"`, `aria-modal="true"` e `aria-labelledby`.
4. **Alvos de Toque em Mobile:** Dimensões mínimas de toque de 44x44px para botões e campos de entrada.

---

## 8. Registro de Validação com Professor e Entidades Parceiras

* **Alinhamento Institucional:** As regras de negócio e dados representativos foram alinhados a partir do levantamento da atividade **CAM-T01**, refletindo as demandas prioritárias da **APAE** e da **Associação Amor Inclusivo**.
* **Condição de Homologação:**  
  Conforme estabelecido nos critérios de aceite da issue oficial [#154](https://github.com/PrjDoaSync/doa-sync/issues/154), este relatório e a implementação correspondente encontram-se atualmente na coluna **In Review (Em Revisão)** no [GitHub Project #6](https://github.com/orgs/PrjDoaSync/projects/6).  
  *A aprovação formal e transição para "Done" ocorrerá durante a sessão de demonstração da Sprint 1 perante o professor e os representantes das entidades, sem presunção antecipada de aprovação.*

---

## 9. Instruções e Links para Próximas Atividades do Backlog

As especificações levantadas nesta revisão de protótipos fornecem as diretrizes diretas para as atividades subsequentes:

1. **[CAM-T05 — Issue #156](https://github.com/PrjDoaSync/doa-sync/issues/156):**  
   *Implementar frontend de listagem e detalhes consumindo a API inicial.*  
   *Diretriz:* Construir os componentes `CardCampanha`, `DetalhesModal`, filtros por status/entidade e estados de skeleton/empty state consumindo a API executável de CAM-T04.
2. **[CAM-T09 — Issue #160](https://github.com/PrjDoaSync/doa-sync/issues/160):**  
   *Implementar formulário e ações de gerenciamento de campanhas.*  
   *Diretriz:* Reutilizar a identidade dos componentes de formulário da Equipe 4 (Telas 04, 05 e 06), com validação de campos obrigatórios (título, meta, datas e entidade).
3. **[CAM-T17 — Issue #168](https://github.com/PrjDoaSync/doa-sync/issues/168):**  
   *Implementar tela Minhas campanhas da entidade.*  
   *Diretriz:* Reutilizar o padrão da Tela 07 da Equipe 4 para listagem administrativa privada, exibindo status de Rascunho e ações de edição/encerramento.

---
*Documento homologado para a entrega da atividade CAM-T03 da Equipe 2 (Campanhas).*
