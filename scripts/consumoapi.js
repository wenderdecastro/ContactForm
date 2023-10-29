const urlViaCep = "https://viacep.com.br/ws";

const formulario = {
    nome: document.getElementById("nome"),
    sobrenome: document.getElementById("sobrenome"),
    email: document.getElementById("email"),
    telefone: {
        pais: document.getElementById("pais"),
        ddd: document.getElementById("ddd"),
        numeroTelefone: document.getElementById("telefone"),
    },
    endereco: {
        cep: document.getElementById("cep"),
        rua: document.getElementById("rua"),
        numero: document.getElementById("numero"),
        complemento: document.getElementById("complemento"),
        bairro: document.getElementById("bairro"),
        cidade: document.getElementById("cidade"),
        UF: document.getElementById("UF")
    },
    anotacoes: document.getElementById("anotacoes")
}

const autoPreencher = async event => {
    event.preventDefault();

    if (event.target.value.length == 8)
        try {
            const cep = event.target.value

            const recurso = `/${cep}/json`
            const promise = await fetch(`${urlViaCep + recurso}`)
            const dados = await promise.json()
            console.log(dados);

            if (dados.erro == true) {

                alert("insira um cep válido")

            }
            else {
                formulario.endereco.rua.value = dados.logradouro
                formulario.endereco.bairro.value = dados.bairro
                formulario.endereco.cidade.value = dados.localidade
                formulario.endereco.UF.value = dados.uf
            }

        } catch (error) {
            console.log(error);
        }

}

const cadastrar = async event => {

    event.preventDefault();

    const dadosCadastro = {
        nome: formulario.nome.value,
        sobrenome: formulario.sobrenome.value,
        email: formulario.email.value,
        telefone: {
            pais: formulario.telefone.pais.value,
            ddd: formulario.telefone.ddd.value,
            numeroTelefone: formulario.telefone.numeroTelefone.value,
        },
        endereco: {
            cep: formulario.endereco.cep.value,
            rua: formulario.endereco.rua.value,
            numero: formulario.endereco.numero.value,
            complemento: formulario.endereco.complemento.value,
            bairro: formulario.endereco.bairro.value,
            cidade: formulario.endereco.cidade.value,
            UF: formulario.endereco.UF.value
        },
        anotacoes: formulario.anotacoes.value
    }

    try {
        axios.post("http://localhost:3000/contatos", dadosCadastro)
        alert("Sucesso")
    } catch (error) {
        alert(error)
    }

}

function limparFormulario() {
    formulario.nome.value = "",
        formulario.sobrenome.value = "",
        formulario.email.value = "",
        formulario.pais.value = "",
        formulario.ddd.value = "",
        formulario.numeroTelefone.value = "",
        formulario.cep.value = "",
        formulario.endereco.rua.value = "",
        formulario.numero.value = "",
        formulario.complemento.value = "",
        formulario.endereco.bairro.value = "",
        formulario.endereco.cidade.value = "",
        formulario.endereco.UF.value = ""
    formulario.anotacoes.value = ""
}



document.getElementById("cep").addEventListener('input', function ()  {
    const valorInput = this.value;
    if (valorInput.length > 8) {
        this.value = valorInput.slice(0, 8);
    }
})
formulario.endereco.cep.addEventListener('blur', autoPreencher)
document.getElementById("form-contato").addEventListener('submit', cadastrar)
