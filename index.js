( () => {
    const camposDoFormulario = document.querySelectorAll("[required]");
    const formulario = document.querySelector("[data-formulario]");
    var mensagem = "";
    //quando o botão enviar for acionado, será armazenado os dados no localStorage
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
    //usando a função forEach para executar a função verificaCampo para cada campo input, o blur escuta quando for tirado a seleção do input.
    camposDoFormulario.forEach((campo) => {
        campo.addEventListener("blur", () => verificaCampo(campo));
        //removendo as validações default
        campo.addEventListener("invalid", evento => evento.preventDefault());
    });
    //alguns tipos de erros possiveis, pode ser adicionados outros
    const tiposDeErro = [
        'valueMissing',
        'typeMismatch',
        'patternMismatch',
        'tooShort',
        'tooLong',
        'customError'
    ]
    //lista de mensagem para cada campo name e erro específico
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
        //percorrendo os tipos de erros e relacionando a cada um sua mensagem
        tiposDeErro.forEach(erro => {
            if (campo.validity[erro]) {
                mensagem = mensagens[campo.name][erro];
            }
        });
        //identificando os nós quem tem a classe informada para posterior inserção da mensagem de erro no span
        const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
        //verifica se tem[false] ou não[true] erro
        const validadorDeInput = campo.checkValidity();
        //inserindo a mensagem de erro a cada span correspondente
        if (!validadorDeInput) {
            mensagemErro.textContent = mensagem;
        } else {
            //inserindo "" nos spans quando não ocorre erro
            mensagemErro.textContent = "";
            //ativando o botão quando não ocorre nenhum erro, ou seja, removendo o atributo disabled
            document.querySelector(".contato__botao").removeAttribute("disabled");
        }
    }

})

();
