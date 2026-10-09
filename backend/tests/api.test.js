const http = require("http");
const app = require("../src/server");

// Test runner nativo em Node.js sem dependências externas
let server;
const PORT = 8089;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    http.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    }).on("error", reject);
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FALHA NA ASSERÇÃO: ${message}`);
  }
}

async function runTests() {
  console.log("🧪 Iniciando suíte de testes de regressão da API de Campanhas (CAM-T04)...");
  server = app.listen(PORT);

  try {
    // Teste 1: Healthcheck
    console.log("  [1/6] Testando GET /health...");
    const resHealth = await request("/health");
    assert(resHealth.status === 200, `Esperado 200, obtido ${resHealth.status}`);
    assert(resHealth.body.status === "UP", "Status deve ser UP");
    console.log("   ✅ Healthcheck OK!");

    // Teste 2: Listagem de Campanhas e formato do envelope
    console.log("  [2/6] Testando GET /campanhas (Envelope e Regras de Negócio)...");
    const resList = await request("/campanhas");
    assert(resList.status === 200, `Esperado 200, obtido ${resList.status}`);
    assert(Array.isArray(resList.body.data), "Body.data deve ser um array");
    assert(resList.body.meta && typeof resList.body.meta.total === "number", "Body.meta deve conter total");
    assert(resList.body.data.length >= 3, "Deve retornar ao menos 3 campanhas públicas");

    // Valida que nenhuma campanha retornada é RASCUNHO
    const rascunhos = resList.body.data.filter((c) => c.status === "RASCUNHO");
    assert(rascunhos.length === 0, "Campanhas em RASCUNHO NÃO podem ser expostas na consulta pública");

    // Valida campos enriquecidos (percentualAtingido e recebendoDoacoes)
    const primeira = resList.body.data[0];
    assert(typeof primeira.percentualAtingido === "number", "percentualAtingido deve ser numérico");
    assert(typeof primeira.recebendoDoacoes === "boolean", "recebendoDoacoes deve ser booleano");
    console.log("   ✅ Listagem e envelope conformes!");

    // Teste 3: Detalhes de Campanha existente
    console.log("  [3/6] Testando GET /campanhas/:id (Campanha existente)...");
    const targetId = primeira.id;
    const resDetail = await request(`/campanhas/${targetId}`);
    assert(resDetail.status === 200, `Esperado 200, obtido ${resDetail.status}`);
    assert(resDetail.body.data && resDetail.body.data.id === targetId, "ID da campanha deve coincidir");
    assert(resDetail.body.data.entidade && resDetail.body.data.entidade.nomeFantasia, "Deve conter entidade vinculada");
    console.log("   ✅ Detalhes da campanha OK!");

    // Teste 4: Campanha inexistente (404 padronizado)
    console.log("  [4/6] Testando GET /campanhas/:id (404 Not Found)...");
    const res404 = await request("/campanhas/id-inexistente-12345");
    assert(res404.status === 404, `Esperado 404, obtido ${res404.status}`);
    assert(res404.body.error === "Campanha não encontrada.", "Mensagem de erro 404 padronizada conforme rotas-api.md");
    console.log("   ✅ Tratamento de 404 OK!");

    // Teste 5: Busca textual por título
    console.log("  [5/6] Testando GET /campanhas?busca=Cadeiras...");
    const resBusca = await request("/campanhas?busca=Cadeiras");
    assert(resBusca.status === 200, `Esperado 200, obtido ${resBusca.status}`);
    assert(resBusca.body.data.length >= 1, "Busca por 'Cadeiras' deve retornar ao menos 1 resultado");
    assert(resBusca.body.data[0].titulo.includes("Cadeiras"), "Título deve conter o termo buscado");
    console.log("   ✅ Filtro de busca OK!");

    // Teste 6: Filtro por status
    console.log("  [6/6] Testando GET /campanhas?status=ENCERRADA...");
    const resStatus = await request("/campanhas?status=ENCERRADA");
    assert(resStatus.status === 200, `Esperado 200, obtido ${resStatus.status}`);
    assert(resStatus.body.data.every((c) => c.status === "ENCERRADA"), "Todas devem ter status ENCERRADA");
    console.log("   ✅ Filtro por status OK!");

    console.log("\n🎉 TODOS OS 6 TESTES DE REGRESSÃO PASSARAM COM SUCESSO!\n");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("\n❌ ERRO NA EXECUÇÃO DOS TESTES:", err);
  if (server) server.close();
  process.exit(1);
});
