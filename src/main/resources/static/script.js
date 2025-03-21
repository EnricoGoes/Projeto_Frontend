console.log("Script carregado!");

const API_URL = "http://localhost:8081/categoria";
const API_URL2 = "http://localhost:8081/contas";
const API_URL3 = "http://localhost:8081/endereco";
const API_URL4 = "http://localhost:8081/parcelas";
const API_URL5 = "http://localhost:8081/telefone";
const API_URL6 = "http://localhost:8081/usuario";
const API_URL7 = "http://localhost:8081/auth";

async function fetchData(url) {
    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados do servidor");
    }
    return resposta.json();
}