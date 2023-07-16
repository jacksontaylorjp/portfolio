const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
let mensagem = "";

formulario.addEventListener("submit", (e) => {
        const listaRespostas = {
            "nome": e.target.elements["nome"].value,
            "email": e.target.elements["email"].value,
            "assunto": e.target.elements["assunto"].value,
            "mensagem": e.target.elements["mensagem"].value,
        }

        localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
        alert("Mensagem enviada com sucesso!")
});

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'tooLong',
    'customError'
]
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Nome muito curto. Digite no mínimo 3 caracteres.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido. Ex: nome@exemplo.com",
        tooShort: "Email muito curto. Digite no mínimo 4 caracteres."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio.",
        tooShort: "Assunto muito curto. Digite no mínimo 5 caracteres.",
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
        tooShort: "Mensagem muito curta.  Digite no mínimo 50 caracteres.",
    },
    btEnviar: {
        customError: "Para enviar é necessário preencher todos os campos do formulário"
    }
}

function verificaCampo (campo){
    campo.setCustomValidity('');
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorDeInput = campo.checkValidity();
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
        document.querySelector(".contato__botao").removeAttribute("disabled");
    }
}

