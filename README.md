# 🟩 DoaSync — Equipe 2: Campanhas

> **Repositório:** `PrjDoaSync/doa-sync`  
> **GitHub Project:** [Equipe 2 — Campanhas](https://github.com/orgs/PrjDoaSync/projects/6)  
> **Organização:** [PrjDoaSync](https://github.com/PrjDoaSync)

---

## 📌 Sobre o DoaSync

O **DoaSync** é uma plataforma digital desenvolvida para modernizar e facilitar o processo de doações, conectando de maneira acessível, organizada e transparente **doadores (Pessoa Física e Jurídica)**, **entidades assistenciais / ONGs** e **gestores da plataforma**.

O projeto busca solucionar dificuldades enfrentadas por instituições sociais na divulgação de campanhas, captação de recursos e acompanhamento das arrecadações.

A plataforma será desenvolvida de maneira modular, integrando diferentes funcionalidades:

- **Gestão de Campanhas:** Criação, edição, publicação, divulgação e encerramento de campanhas de arrecadação.
- **Gerenciamento de Doações:** Registro e acompanhamento das contribuições realizadas pelos doadores.
- **Gestão de Entidades:** Cadastro e gerenciamento de instituições assistenciais beneficiadas.
- **Transparência e Acompanhamento:** Visualização de metas, progresso das arrecadações e resultados obtidos.
- **Integração entre Módulos:** Comunicação entre campanhas, doações, usuários, entidades e dashboards.

O DoaSync tem como foco inicial apoiar a **APAE** e a **Associação Amor Inclusivo**, promovendo o uso da tecnologia para gerar impacto social positivo.

---

## 🎯 Função da Equipe 2

A **Equipe 2** é responsável pelo **Módulo de Campanhas**, atuando no planejamento, desenvolvimento e integração das funcionalidades relacionadas à criação, divulgação, visualização e gerenciamento das campanhas de arrecadação da plataforma DoaSync.

O objetivo principal é permitir que entidades assistenciais possam organizar suas iniciativas de arrecadação e divulgar suas necessidades, enquanto os doadores conseguem encontrar campanhas e acompanhar suas informações de maneira simples e acessível.

### Principais Responsabilidades

- **Criação de Campanhas:** Desenvolvimento de formulários e funcionalidades para cadastrar campanhas, incluindo título, descrição, meta de arrecadação, período e entidade responsável.

- **Edição e Gerenciamento:** Implementação das funcionalidades necessárias para atualizar informações e gerenciar campanhas existentes.

- **Publicação e Encerramento:** Controle do ciclo de vida das campanhas, respeitando permissões, períodos de arrecadação e regras de negócio.

- **Listagem de Campanhas:** Desenvolvimento de interfaces para apresentar campanhas disponíveis, permitindo que os usuários conheçam as iniciativas sociais cadastradas.

- **Busca e Filtros:** Implementação de mecanismos para localizar campanhas por informações como nome, entidade e situação.

- **Detalhamento das Campanhas:** Criação de páginas com informações completas, objetivos, imagens e indicadores de progresso.

- **Compartilhamento:** Disponibilização de recursos para facilitar a divulgação das campanhas por meio de links.

- **Integração com APIs:** Comunicação entre frontend e backend para consulta, criação, atualização e persistência das informações.

- **Validação e Qualidade:** Realização de testes funcionais e verificação das regras de negócio, em colaboração com as demais equipes.

---

## ⚙️ Funcionalidades do Módulo

O módulo de Campanhas será organizado em funcionalidades principais:

| Funcionalidade | Descrição |
|---|---|
| Criar campanha | Cadastrar uma nova campanha de arrecadação |
| Editar campanha | Atualizar informações de campanhas cadastradas |
| Publicar campanha | Disponibilizar campanhas para visualização pública |
| Encerrar campanha | Finalizar campanhas e impedir novas contribuições |
| Visualizar campanhas | Consultar campanhas disponíveis na plataforma |
| Detalhes da campanha | Exibir objetivos, informações e progresso |
| Buscar campanhas | Localizar campanhas por termos de pesquisa |
| Filtrar campanhas | Organizar resultados conforme critérios definidos |
| Compartilhar campanha | Permitir a divulgação por meio de links |

As funcionalidades serão desenvolvidas progressivamente, conforme as prioridades do projeto e as entregas previstas nas sprints.

---

## 🏗️ Estrutura Funcional

```text
Módulo de Campanhas
│
├── Gerenciamento
│   ├── Criar campanha
│   ├── Editar campanha
│   ├── Publicar campanha
│   └── Encerrar campanha
│
├── Visualização
│   ├── Listagem de campanhas
│   ├── Detalhes da campanha
│   └── Progresso da arrecadação
│
├── Descoberta
│   ├── Buscar campanhas
│   ├── Filtrar campanhas
│   └── Compartilhar campanhas
│
└── Integrações
    ├── API de campanhas
    ├── Banco de dados
    ├── Autenticação e permissões
    ├── Módulo de doações
    └── Gestão e Dashboard
```

---

## 🔗 Integração com Outras Equipes

O módulo de Campanhas possui dependências com os demais módulos do DoaSync.

| Equipe / Módulo | Integração |
|---|---|
| Produto, Usuários e Entidades | Requisitos, autenticação e permissões |
| Doações | Vinculação das contribuições às campanhas |
| Gestão e Dashboard | Indicadores, relatórios e acompanhamento das arrecadações |
| Banco de Dados e APIs | Estrutura de dados, persistência e endpoints |
| Qualidade de Software | Testes, validações e acompanhamento de erros |

O alinhamento entre as equipes será essencial para garantir a consistência das informações e o funcionamento integrado da plataforma.

---

## 📅 Planejamento e Sprints

O desenvolvimento será realizado de forma incremental, utilizando **GitHub Projects** para organização e acompanhamento das atividades.

### Sprint 1 — Planejamento e Desenvolvimento Inicial

Principais atividades previstas:

- Levantamento e validação das regras de negócio.
- Alinhamento do modelo de dados e contratos das APIs.
- Revisão dos protótipos existentes.
- Desenvolvimento inicial do frontend.
- Implementação das funcionalidades prioritárias.
- Integração inicial com os serviços disponíveis.
- Testes e validações das entregas.

### Próximas Sprints

As próximas etapas contemplarão a evolução do gerenciamento de campanhas, aprimoramento das interfaces, integração completa entre módulos, correções e validação final das funcionalidades.

O planejamento poderá ser atualizado conforme as necessidades identificadas durante o desenvolvimento.

---

## 👥 Integrantes da Equipe 2

| Integrante | Atuação |
|---|---|
| [GustavoSilveira1012](https://github.com/GustavoSilveira1012) | Front-end / Planejamento e organização das atividades |
| Demais integrantes | A preencher conforme a composição da equipe |

---

## 📂 Documentação e Organização

As atividades da Equipe 2 são acompanhadas por meio do GitHub Projects, com registro de tarefas, requisitos, critérios de aceite e entregas.

### Referências

- [Repositório oficial DoaSync](https://github.com/PrjDoaSync/doa-sync)
- [GitHub Project — Equipe 2](https://github.com/orgs/PrjDoaSync/projects/6)
- [Documentação de Requisitos](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/requisitos.md)
- [Contrato das APIs](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md)
- [CAM-T01 — Validação das Regras de Negócio](https://github.com/PrjDoaSync/doa-sync/issues/152)
- [CAM-T02 — Modelo de Dados e APIs](https://github.com/PrjDoaSync/doa-sync/issues/153)
- [CAM-T03 — Protótipos de Campanhas](https://github.com/PrjDoaSync/doa-sync/issues/154)

---

## 🌎 Impacto Social

O desenvolvimento do módulo de Campanhas busca facilitar a divulgação de iniciativas sociais, ampliar a visibilidade das necessidades das entidades assistenciais e tornar o processo de contribuição mais acessível aos doadores.

Por meio da tecnologia, a Equipe 2 pretende contribuir para uma plataforma que auxilie instituições na organização de suas arrecadações e fortaleça a conexão entre a comunidade e os projetos sociais.

---

**DoaSync — Equipe 2: Campanhas**  
*Tecnologia conectando pessoas, campanhas e solidariedade.*
