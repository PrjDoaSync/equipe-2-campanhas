# Backend — Módulo de Campanhas (Equipe 2)

> **Task associada:** [CAM-T04] Implementar backend inicial de listagem e detalhes de campanhas  
> **Issue oficial:** [#155](https://github.com/PrjDoaSync/doa-sync/issues/155)  
> **Responsável:** Pedro Vieira (`Trincademes`)  
> **Sprint:** 1  

Este serviço disponibiliza a API executável inicial de Campanhas para a plataforma **DoaSync**, seguindo estritamente as diretrizes de [`docs/rotas-api.md`](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md) e [`docs/arquitetura.md`](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/arquitetura.md).

---

## 🚀 Como Executar

### Pré-requisitos
* Node.js v18+ (testado e homologado no Node v22)
* npm

### Instalação de dependências
```bash
cd backend
npm install
```

### Iniciar o servidor
```bash
npm start
```
O servidor será iniciado na porta **8080** (ou configurada via variável de ambiente `PORT`):
👉 `http://localhost:8080`

---

## 📡 Endpoints Disponíveis

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/api/v1/health` | Público | Diagnóstico e verificação de integridade do módulo. |
| `GET` | `/api/v1/campanhas` | Público | Vitrine e listagem paginada com busca e filtros. |
| `GET` | `/api/v1/campanhas/:id` | Público | Detalhes completos de uma campanha específica. |

### Parâmetros de Consulta em `GET /api/v1/campanhas`:
* `page`: Número da página (padrão: 1)
* `limit`: Quantidade de itens por página (padrão: 10, máx: 50)
* `busca`: Termo para busca textual no título, descrição ou categoria
* `status`: Filtro por status (`ATIVA`, `ENCERRADA`)
* `entidadeId`: Filtro pelo identificador único da entidade assistencial

---

## 🧪 Como Executar os Testes Automatizados

O backend possui uma suíte completa de testes de regressão automatizados cobrindo os critérios de aceite:

```bash
npm test
```

### Casos de teste validados:
1. `GET /health` responde 200 com status `UP`.
2. `GET /campanhas` retorna envelope com `data` e `meta`, calculando `percentualAtingido` e `recebendoDoacoes`.
3. Validação de que campanhas com status `RASCUNHO` são ocultadas da listagem pública.
4. `GET /campanhas/:id` retorna os detalhes da campanha alvo com entidade vinculada.
5. Requisição para ID inexistente retorna status `404` com erro padronizado: `{"error": "Campanha não encontrada."}`.
6. Filtro textual por `?busca=` filtra assertivamente os registros.
7. Filtro por `?status=ENCERRADA` retorna apenas campanhas encerradas.

---

## 📁 Estrutura de Pastas

```text
backend/
├── src/
│   ├── data/
│   │   └── fixtures.js         # Dados simulados da APAE e Amor Inclusivo
│   ├── services/
│   │   └── campanhaService.js  # Regras de negócio, cálculo de percentual e filtros
│   ├── controllers/
│   │   └── campanhaController.js # Handlers HTTP com envelopes padronizados
│   ├── routes/
│   │   └── campanhaRoutes.js   # Mapeamento das rotas /api/v1
│   └── server.js               # Configuração do Express, CORS e bootstrap
├── tests/
│   └── api.test.js             # Suíte de testes de regressão
├── package.json
└── README.md
```
