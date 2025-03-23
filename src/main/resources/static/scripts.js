console.log("Script carregado!");

const API_URL = "http://localhost:8081/categoria";
const API_URL2 = "http://localhost:8081/contas";
const API_URL3 = "http://localhost:8081/usuario";
const API_URL4 = "http://localhost:8081/parcelas";

async function fetchData(url) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do servidor");
        }
        return resposta.json();
    } catch (error) {
        console.error(`Erro ao buscar dados do servidor: ${error.message}`);
        throw error;
    }
}

// Mover a função getCookie para fora do DOMContentLoaded
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener("DOMContentLoaded", () => {
    const userId = getCookie('userId');
    if (!userId) {
        alert('Usuário não está logado.');
        window.location.href = '/';
        return;
    }

    // Verificação para redirecionar o usuário para o dashboard se ele tentar acessar a página de login
    if (window.location.pathname === '/login') {
        window.location.href = '/dashboard';
        return;
    }

    document.getElementById('btnLogout').addEventListener('click', () => {
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        alert('Logout realizado com sucesso!');
        window.location.href = '/';
    });

    getContas(userId);
});

function BotoesCategoria(categoria) {
    return `
        <button class="btn-editar" onclick="editarCategoria(${categoria.id})">Editar</button>
        <button class="btn-deletar" onclick="deletarCategoria(${categoria.id})">Deletar</button>
    `;
}

function BotoesConta(conta) {
    return `
        <button class="btn-visualizar" onclick="verDetalhesConta(${conta.id})">Ver Detalhes</button>
        <button class="btn-deletar" onclick="deletarConta(${conta.id})">Deletar</button>
    `;
}

async function getCategorias(contas) {
    try {
        const categorias = await fetchData(API_URL + "/listall");
        const categoriasFiltradas = categorias.filter(categoria => contas.some(conta => conta.categoriaId === categoria.id));
        renderizarCategorias(categoriasFiltradas, contas);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
    }
}

async function getContas(userId) {
    try {
        const contas = await fetchData(API_URL2 + "/listall");
        const contasFiltradas = contas.filter(conta => conta.usuarioId == userId); 
        getCategorias(contasFiltradas); 
    } catch (error) {
        console.error("Erro ao listar contas:", error);
    }
}

function renderizarCategorias(categorias, contas) {
    const categoriasContainer = document.getElementById("categoriasContainer");
    categoriasContainer.innerHTML = "";

    categorias.forEach((categoria) => {
        const categoriaDiv = document.createElement("div");
        categoriaDiv.classList.add("categoria");

        categoriaDiv.innerHTML = `
            <h3>${categoria.descricao ? categoria.descricao : 'Nome não encontrado'} ${BotoesCategoria(categoria)}</h3>
            <p>Tipo: ${categoria.tipo ? categoria.tipo : 'Tipo não encontrado'}</p>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="contasCategoria${categoria.id}">
                    <!-- As contas serão inseridas aqui pelo JavaScript -->
                </tbody>
            </table>
        `;

        categoriasContainer.appendChild(categoriaDiv);
    });

    renderizarContas(contas);
}

function renderizarContas(contas) {
    contas.forEach((conta) => {
        const contasCategoria = document.getElementById(`contasCategoria${conta.categoriaId}`);
        if (contasCategoria) {
            const contaRow = document.createElement("tr");
            contaRow.innerHTML = `
                <td>${conta.descricao}</td>
                <td>${BotoesConta(conta)}</td>
            `;
            contasCategoria.appendChild(contaRow);
        }
    });
}

async function deletarCategoria(id) {
    if (!confirm("Tem certeza que deseja deletar esta categoria?")) {
        return; 
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!resposta.ok) {
            if (resposta.status === 404) {
                console.log("Categoria não encontrada para deletar.");
                alert("Categoria não encontrada. Ela pode já ter sido deletada.");
                const userId = getCookie('userId');
                getContas(userId);
                return;
            } else if (resposta.status === 500) {
                console.error("Erro interno do servidor ao deletar categoria.");
                alert("Erro interno do servidor. Tente novamente mais tarde.");
                return;
            }
            throw new Error("Erro ao deletar categoria");
        }
        alert("Categoria deletada com sucesso!");
        const userId = getCookie('userId');
        getContas(userId); 
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        alert("Erro ao deletar categoria. Tente novamente.");
    }
}

async function deletarConta(id) {
    if (!confirm("Tem certeza que deseja deletar esta conta?")) {
        return; 
    }

    try {
        const resposta = await fetch(`${API_URL2}/${id}`, { method: "DELETE" });
        if (!resposta.ok) {
            if (resposta.status === 404) {
                console.log("Conta não encontrada para deletar.");
                alert("Conta não encontrada. Ela pode já ter sido deletada.");
                const userId = getCookie('userId');
                getContas(userId);
                return;
            }
            throw new Error("Erro ao deletar conta");
        }
        alert("Conta deletada com sucesso!");
        const userId = getCookie('userId');
        getContas(userId); 
    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        alert("Erro ao deletar conta. Tente novamente.");
    }
}

function navegar(rota, id, modo) {
    const url = new URL(window.location.origin + rota);
    url.searchParams.append("id", id);
    url.searchParams.append("modo", modo);
    window.location.href = url.toString();
}

function verDetalhesConta(id) {
    navegar("/cadastrarConta", id, "editar");
}

function editarCategoria(id) {
    navegar("/cadastrarCategoria", id, "editar");
}