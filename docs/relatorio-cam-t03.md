# Relatório de Revisão e Reutilização de Protótipos — CAM-T03

> **Projeto:** DoaSync — Plataforma de Conexão e Arrecadação Social  
> **Módulo:** Campanhas (Equipe 2)  
> **Atividade:** [CAM-T03] Revisar e reutilizar protótipos de campanhas da Equipe 4  
> **Issue oficial:** [#154](https://github.com/PrjDoaSync/doa-sync/issues/154)  
> **Responsável:** Pedro Vieira (`Trincademes`)  
> **Sprint:** 1  
> **Status:** Concluído / Em Revisão  

---

## 1. Objetivo e Escopo

O objetivo desta atividade é realizar a revisão detalhada, alinhamento técnico e mapeamento para desenvolvimento dos protótipos visuais de campanhas criados no Figma pela **Equipe 4 (Gestão e Dashboard)**.

Esta atividade assegura que o desenvolvimento de frontend da Equipe 2 (**CAM-T05** e futuras telas de gestão) esteja 100% alinhado com o [Design System oficial do DoaSync](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/DESIGN-SYSTEM.md), com o [Contrato de Rotas da API](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md) e com as regras de acessibilidade e responsividade (WCAG 2.1 AA).

---

## 2. Rastreabilidade dos Protótipos de Origem

Foram analisadas as seguintes entregas e protótipos no ecossistema do projeto:

| ID de Origem | Título da Issue / Protótipo | Escopo no Módulo de Campanhas |
|---|---|---|
| [equipe-4#48](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/48) | *Home pública - vitrine de campanhas em destaque* | Vitrine inicial, cards de destaque, badges de urgência e chamada para doação. |
| [equipe-4#49](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/49) | *Listagem de campanhas com filtros* | Grade pública de campanhas, busca por palavra-chave, filtros por entidade (APAE / Amor Inclusivo) e status. |
| [equipe-4#10](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/10) | *Prototipar Telas de Doações e Detalhes* | Tela completa de detalhes da campanha, barra de progresso, dados da entidade e fluxo de encaminhamento para doação. |
| [equipe-4#28](https://github.com/PrjDoaSync/equipe-4-gestao-dashboard/issues/28) | *Telas de Gestão de Campanhas, Doações e Entidades* | Interface administrativa privada da entidade para visualização de status (*Rascunho*, *Ativa*, *Encerrada*). |

---

## 3. Mapeamento de Telas e Estrutura de Componentes

### 3.1 Tela 1: Vitrine e Listagem Pública de Campanhas
* **Objetivo:** Permitir ao visitante ou doador encontrar iniciativas sociais ativas das entidades cadastradas.
* **Componentes Principais:**
  1. **Header Institucional:** Navegação global, logo DoaSync, links rápidos (*Início*, *Campanhas*, *Entidades*).
  2. **Banner Hero com Indicadores:** Apresentação da causa social com foco na APAE e Associação Amor Inclusivo.
  3. **Barra de Busca e Filtros Rápidos:**
     - Campo de texto para filtro por título com ícone de pesquisa (`MagnifyingGlass`).
     - Abas/Chips de filtro por status (`Todas`, `Ativas`, `Encerradas`).
     - Seletor de entidade beneficiada.
  4. **Grid Responsivo de Cards de Campanha:**
     - Grade em 1 coluna no mobile (`< 768px`), 2 colunas no tablet (`768px - 1023px`) e 3 colunas no desktop (`>= 1024px`).
  5. **Card de Campanha Individual:**
     - Imagem da campanha em proporção 16:9 (`rounded-t-lg` ou `rounded-lg`).
     - Badge flutuante de status (*ATIVA* em verde esmeralda, *ENCERRADA* em cinza ardósia).
     - Nome da entidade assistencial com badge institucional.
     - Título com truncamento em até 2 linhas (`line-clamp-2`).
     - Breve descrição resumida.
     - Barra de progresso com indicador numérico de porcentagem arrecadada.
     - Valores monetários em destaque: `R$ Arrecadado` vs `R$ Meta`.
     - Botão primário "Ver Detalhes / Doar".

### 3.2 Tela 2: Detalhes da Campanha
* **Objetivo:** Apresentar a prestação de contas, a meta financeira, a história da necessidade e o gatilho de doação.
* **Componentes Principais:**
  1. **Banner Principal / Galeria:** Imagem em alta resolução com fallback para ausência de foto.
  2. **Cabeçalho da Campanha:** Título h1, badge de status e data de encerramento formatada.
  3. **Card da Entidade Responsável:** Razão social, nome fantasia, resumo da missão e link para o perfil da entidade.
  4. **Painel de Arrecadação (Card em Destaque):**
     - Valor acumulado em fonte grande (`font-bold text-3xl`).
     - Meta estipulada e percentual atingido.
     - Barra de progresso com cor semântica.
     - Indicador de dias restantes até o encerramento.
  5. **Ações:**
     - Botão primário em destaque: `Doar para esta Campanha` (habilitado apenas se `recebendoDoacoes: true`).
     - Botão secundário / utilitário: `Compartilhar Campanha` (copia link ou abre diálogo).

### 3.3 Tela 3: Painel de Gestão da Entidade (Visão Futura / Sprint 2)
* **Objetivo:** Permitir que os gestores da APAE ou Associação Amor Inclusivo gerenciem suas próprias campanhas.
* **Componentes:**
  - Tabela com ações rápidas (Editar, Pausar, Encerrar).
  - Botão de ação primária no topo: `+ Nova Campanha`.
  - Filtro por status interno (incluindo *Rascunhos* e *Desativadas*).

---

## 4. Mapeamento de Estados da Interface (Design System)

Para assegurar uma experiência de usuário sem quebras e consistente com as diretrizes do `DESIGN-SYSTEM.md`:

```
┌──────────────────────────────────────────────────────────────┐
│                    ESTADOS DA INTERFACE                      │
├──────────────────────────────────────────────────────────────┤
│ 1. Loading State     -> Skeletons pulsantes (animate-pulse)  │
│ 2. Empty State       -> Ícone de lupa/caixa + Ação de limpar │
│ 3. Error State       -> Banner de erro + Botão Tentar Novam. │
│ 4. Not Found (404)   -> Ilustração 404 + Voltar à vitrine    │
│ 5. Image Fallback    -> SVG vetorial temático DoaSync        │
└──────────────────────────────────────────────────────────────┘
```

### 4.1 Carregando (Loading State / Skeleton)
* Não utilizar tela em branco ou spinners centrais isolados que causem salto de layout (Cumulative Layout Shift).
* Exibir réplicas exatas dos cards com blocos cinzas animados (`bg-slate-200 animate-pulse rounded`).

### 4.2 Lista Vazia (Empty State)
* Acionado quando a busca não encontra correspondências ou quando a entidade ainda não possui campanhas.
* Conteúdo: Ícone `MagnifyingGlass` ou `FolderSimple`, texto explicativo *"Nenhuma campanha encontrada para os filtros selecionados"* e botão secundário *"Limpar filtros"*.

### 4.3 Falha de Conexão / Erro de API (Error State)
* Acionado em caso de indisponibilidade do backend (HTTP 500 ou queda de rede).
* Conteúdo: Caixa de aviso suave (`bg-red-50 border-red-200 text-red-700`), mensagem amigável e botão *"Tentar novamente"*.

### 4.4 Campanha Inexistente (404)
* Acionado quando o ID da campanha na URL não existir ou tiver sido desativado para acesso público.
* Conteúdo: Aviso de recurso não localizado com atalho para retornar à listagem geral.

### 4.5 Ausência de Imagem (Image Fallback)
* Quando `imagemUrl` for nulo ou falhar ao carregar no `onError` da tag `<img>`, a aplicação deve renderizar um placeholder SVG elegante com a paleta de cores oficial da plataforma.

---

## 5. Design Tokens e Conformidade Visual

Seguindo estritamente as regras de `docs/DESIGN-SYSTEM.md`:

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
| **Border Radius** | `rounded-lg` (8px) | Cards e modais. |
| **Border Radius** | `rounded-full` (9999px) | Badges de status e avatares. |

---

## 6. Acessibilidade (WCAG 2.1 Nível AA)

1. **Relação de Contraste:** Mínimo de 4.5:1 para todos os textos informativos e botões em relação ao fundo.
2. **Navegação por Teclado:** Todos os elementos clicáveis (cards, botões, filtros) devem receber foco visível com `focus:ring-2 focus:ring-blue-500 focus:outline-none`.
3. **Leitores de Tela:** 
   - A barra de progresso deve conter `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"` e `aria-valuemax="100"`.
   - Botões com ícones devem possuir `aria-label` descritivo.
4. **Alvos de Toque em Mobile:** Dimensões mínimas de toque de 44x44px para botões e campos de entrada.

---

## 7. Conclusão e Próximos Passos

A análise dos protótipos da Equipe 4 comprova a viabilidade dos fluxos de Vitrine e Detalhes de Campanhas. As especificações levantadas neste relatório serviram de base direta para:
1. A implementação do **Backend Executável de Simulação da Sprint 1 (CAM-T04)**.
2. A construção da **Interface Frontend de Listagem e Detalhes da Sprint 1 (CAM-T05)**.

---
*Documento homologado para a entrega da atividade CAM-T03 da Equipe 2 (Campanhas).*
