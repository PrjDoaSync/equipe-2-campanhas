# 🟩 DoaSync — Equipe 2: Campanhas

> **Repositório do Módulo:** `PrjDoaSync/equipe-2-campanhas`  
> **GitHub Project:** [Equipe 2 — Campanhas (Project #6)](https://github.com/orgs/PrjDoaSync/projects/6)  
> **Organização:** [PrjDoaSync](https://github.com/PrjDoaSync)  
> **Repositório Central da Organização:** [PrjDoaSync/doa-sync](https://github.com/PrjDoaSync/doa-sync)  

---

## 📌 Sobre o DoaSync

O **DoaSync** é uma plataforma digital desenvolvida para modernizar e facilitar o processo de doações, conectando de maneira acessível, organizada e transparente **doadores (Pessoa Física e Jurídica)**, **entidades assistenciais / ONGs** e **gestores da plataforma**.

O projeto busca solucionar dificuldades enfrentadas por instituições sociais na divulgação de campanhas, captação de recursos e acompanhamento das arrecadações.

O DoaSync tem como foco inicial apoiar a **APAE** e a **Associação Amor Inclusivo**, promovendo o uso da tecnologia para gerar impacto social positivo.

---

## 🎯 Função da Equipe 2

A **Equipe 2** é responsável pelo **Módulo de Campanhas**, atuando no planejamento, desenvolvimento e integração das funcionalidades relacionadas à criação, divulgação, visualização e gerenciamento das campanhas de arrecadação da plataforma DoaSync.

### Principais Responsabilidades

- **Criação e Edição de Campanhas:** Cadastrar e gerenciar campanhas com metas, prazos e entidade vinculada.
- **Ciclo de Vida:** Controle de estados (*Rascunho*, *Ativa*, *Encerrada*, *Desativada*).
- **Vitrine e Listagem Pública:** Interfaces acessíveis para apresentação de campanhas com filtros e busca.
- **Detalhamento:** Páginas completas com histórico, metas, progresso e chamada para doação.
- **Integração com APIs:** Comunicação padronizada conforme contratos oficiais da organização.
- **Qualidade e Acessibilidade:** Conformidade com o Design System oficial e WCAG 2.1 AA.

---

## 🚀 Entregas da Sprint 1 (MVP Inicial)

A Sprint 1 foca no alinhamento de regras, contratos de API e entrega do MVP inicial funcional:

| ID da Task | Título da Atividade | Status | Responsável | Entregável |
|---|---|---|---|---|
| **[CAM-T01]** | Validar regras e necessidades das campanhas | Em Validação | `GustavoSilveira1012` | [`docs/relatorio-cam-t01.md`](./docs/relatorio-cam-t01.md) |
| **[CAM-T02]** | Alinhar modelo de dados e contrato da API | Em Andamento | `GustavoSilveira1012` | Especificação de endpoints e DTOs |
| **[CAM-T03]** | Revisar e reutilizar protótipos da Equipe 4 | ✅ Concluído | `Trincademes` *(Pedro Vieira)* | [`docs/relatorio-cam-t03.md`](./docs/relatorio-cam-t03.md) |
| **[CAM-T04]** | Implementar backend inicial de listagem e detalhes | ✅ Concluído | `Trincademes` *(Pedro Vieira)* | Módulo [`backend/`](./backend/) + Testes de Regressão |
| **[CAM-T05]** | Implementar frontend de listagem e detalhes | ✅ Concluído | `Trincademes` *(Pedro Vieira)* | Módulo [`frontend/`](./frontend/) (React + Tailwind) |
| **[CAM-T06]** | Validar demonstração da Sprint 1 | Previsto | Toda a Equipe | Roteiro de testes integrados |

---

## 💻 Como Executar o Projeto Localmente

O módulo de Campanhas é desacoplado e pode ser executado em conjunto ou de forma independente:

### 1. Executando o Backend (API de Campanhas)
```bash
cd backend
npm install
npm start
```
* **URL Base da API:** `http://localhost:8080/api/v1`
* **Testes Automatizados:** `npm test`
* **Healthcheck:** `GET http://localhost:8080/api/v1/health`
* **Listagem:** `GET http://localhost:8080/api/v1/campanhas`
* **Detalhes:** `GET http://localhost:8080/api/v1/campanhas/{id}`

### 2. Executando o Frontend (Aplicação Web)
Em um novo terminal:
```bash
cd frontend
npm install
npm run dev
```
* Acesse no navegador: 👉 `http://localhost:5173`

> **Nota de Resiliência:** O frontend possui detecção automática de status da API. Caso o backend não esteja ativo no momento, a aplicação ativa o **Modo Demonstração Offline (Fallback)** com dados simulados da APAE e Amor Inclusivo, garantindo total navegabilidade e validação da interface.

---

## 👥 Integrantes da Equipe 2

| Integrante | GitHub | Atuação no Módulo |
|---|---|---|
| **Pedro Vieira** | [@Trincademes](https://github.com/Trincademes) | Front-end & Back-end / Protótipos (CAM-T03, CAM-T04, CAM-T05) |
| **Gustavo Silveira** | [@GustavoSilveira1012](https://github.com/GustavoSilveira1012) | Front-end / Planejamento e Requisitos (CAM-T01, CAM-T02) |
| Demais integrantes | — | A preencher conforme alocação nas próximas sprints |

---

## 📂 Documentação e Referências

- [Repositório Oficial DoaSync](https://github.com/PrjDoaSync/doa-sync)
- [GitHub Project — Equipe 2](https://github.com/orgs/PrjDoaSync/projects/6)
- [Contrato Oficial de Rotas da API](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md)
- [Design System e Guia Visual](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/DESIGN-SYSTEM.md)
- [Relatório de Validação de Regras (CAM-T01)](./docs/relatorio-cam-t01.md)
- [Relatório de Revisão de Protótipos (CAM-T03)](./docs/relatorio-cam-t03.md)

---

**DoaSync — Equipe 2: Campanhas**  
*Tecnologia conectando pessoas, campanhas e solidariedade.*
