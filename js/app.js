import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const contatos = collection(db, "contatos");

const form = document.getElementById("contatoForm");
const lista = document.getElementById("listaContatos");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const contatoId = document.getElementById("contatoId");

const btnCancelar = document.getElementById("btnCancelar");
const btnNovo = document.getElementById("btnNovo");
const btnBuscar = document.getElementById("btnBuscar");
const buscaNome = document.getElementById("buscaNome");

carregarContatos();

async function carregarContatos() {

    lista.innerHTML = "";

    const snapshot = await getDocs(contatos);

    snapshot.forEach((documento) => {

        const contato = documento.data();

        lista.innerHTML += `
            <tr>
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.telefone}</td>

                <td>
                    <button onclick="editarContato('${documento.id}')">
                        ✏️
                    </button>

                    <button onclick="excluirContato('${documento.id}')">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value
    };

    if (contatoId.value === "") {

        await addDoc(contatos, dados);

    } else {

        await updateDoc(
            doc(db, "contatos", contatoId.value),
            dados
        );
    }

    limparFormulario();

    carregarContatos();
});

window.excluirContato = async function(id) {

    const confirmar =
        confirm("Deseja excluir o contato?");

    if (confirmar) {

        await deleteDoc(
            doc(db, "contatos", id)
        );

        carregarContatos();
    }
}

window.editarContato = async function(id) {

    const documento =
        await getDoc(doc(db, "contatos", id));

    const contato = documento.data();

    contatoId.value = id;
    nome.value = contato.nome;
    email.value = contato.email;
    telefone.value = contato.telefone;
}

btnCancelar.addEventListener("click", limparFormulario);

btnNovo.addEventListener("click", limparFormulario);

function limparFormulario() {

    form.reset();

    contatoId.value = "";
}

btnBuscar.addEventListener("click", async () => {

    const texto = buscaNome.value.toLowerCase();

    lista.innerHTML = "";

    const snapshot = await getDocs(contatos);

    snapshot.forEach((documento) => {

        const contato = documento.data();

        if (
            contato.nome.toLowerCase().includes(texto)
        ) {

            lista.innerHTML += `
                <tr>
                    <td>${contato.nome}</td>
                    <td>${contato.email}</td>
                    <td>${contato.telefone}</td>

                    <td>
                        <button onclick="editarContato('${documento.id}')">
                            ✏️
                        </button>

                        <button onclick="excluirContato('${documento.id}')">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        }
    });
});