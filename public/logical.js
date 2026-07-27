const menus = [
    // Menu principal
    {
        menu: "principal",
        nome: "Clima",
        icone: "fa-solid fa-cloud",
        evento: "clima"
    },

    {
        menu: "principal",
        nome: "Salva",
        icone: "fa-solid fa-map-location-dot",
        evento: "salvar"
    },
    {
        menu: "principal",
        nome: "Maps",
        icone: "fa-solid fa-map-location-dot",
        evento: "maps"
    },
    {
        menu: "principal",
        nome: "Configurações",
        icone: "fa-solid fa-gear",
        evento: "configuracoes"
    },

    // Menu de configurações
    {
        menu: "configuracoes",
        nome: "Tema",
        icone: "fa-solid fa-palette",
        evento: "tema"
    },

    {
        menu: "configuracoes",
        nome: "Idioma",
        icone: "fa-solid fa-language",
        evento: "idioma"
    },
    {
        menu: "configuracoes",
        nome: "Voltar",
        icone: "fa-solid fa-arrow-left",
        evento: "voltar"
    }
];
// Menu do Aside
let opcoesMenu = document.querySelectorAll(".opcao-menu")

let nuvem = document.querySelector(".nuvem")
let option = document.querySelector(".option")
let maps = document.querySelector(".maps")
let settings = document.querySelector(".settings")
let menuPrincipal = "principal";

function carregarMenu(acao) {
    menuPrincipal = acao;

    let MenuFiltrado = menus.filter(menu => menu.menu === acao)

    MenuFiltrado.forEach((item, index) => {

        const botao = opcoesMenu[index];

        const icone = botao.querySelector("i");
        const texto = botao.querySelector("span");

        icone.className = item.icone;
        texto.textContent = item.nome;

    })
};

opcoesMenu.forEach((botao, index) => {

    botao.addEventListener("click", () => {
        const menuAtual = menus.filter(menu => menu.menu === menuPrincipal);

        executarAcao(menuAtual[index].evento);
    });
});

function executarAcao(acao) {
    switch (acao) {
        case "configuracoes":
            carregarMenu("configuracoes");
            break;

        case "voltar":
            carregarMenu("principal");
            break;

        case "clima":

            break;

        case "maps":
            abrirMaps();
            break;

        case "salvar":
            salvadados()
            break
        case "tema":

            break;

        case "idioma":

            break;
    }
}

let GuardarDados = []
function salvadados(resposta) {
console.log(resposta)


}





function abrirMaps() {
    const cidade = inputCidade.value.trim();

    if (!cidade) {
        alert("Digite uma cidade.");
        return;
    }

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cidade)}`
    );
}


// 
let nomeCidade = document.querySelector(".Nome-Cidade h2")
let ProbalidadeDechuva = document.querySelector(".Nome-Cidade .Probali")
let graus = document.querySelector(".Graus")
let cards = document.querySelector(" .painel .cards")
let inputCidade = document.querySelector(".background input");

let body = document.querySelector("body")


async function Clima(cidade) {

    if (cidade === "") {
        alert("preencha o campo")
    }
    console.log("Cidade digitada:", cidade);

    try {

        console.log("Antes do fetch");

        const resposta = await fetch(`https://api-clima-ijt0.onrender.com/clima/${cidade}`);
        // console.log("Depois do fetch");
        const dados = await resposta.json();
        // console.log("Dados recebidos:");
        console.log(dados);

        nomeCidade.innerHTML = dados.clima.name;
        graus.innerHTML = `${Math.round(dados.clima.main.temp)}°C`;
        ProbalidadeDechuva.innerHTML = `Chance of Rain ${dados.previsao.list[0].pop * 100}%`;



        cards.innerHTML = "";
        for (let i = 0; i < 4; i++) {

            let climaHora = document.createElement("div");
            let pHora = document.createElement("p");
            let icon = document.createElement("img");
            let pTemp = document.createElement("p");

            climaHora.className = "climaHora";
            pHora.className = "hora";
            icon.className = "icone";
            pTemp.className = "temperatura";

            const previsao = dados.previsao.list[i];

            console.log(previsao)

            pHora.textContent = previsao.dt_txt.split(" ")[1].slice(0, 5);
            icon.src = `https://openweathermap.org/img/wn/${previsao.weather[0].icon}@2x.png`;
            pTemp.textContent = `${Math.round(previsao.main.temp)}°C`;

            console.log(previsao);

            climaHora.appendChild(pHora)
            climaHora.appendChild(icon)
            climaHora.appendChild(pTemp)
            cards.appendChild(climaHora)
        }

        let SensacaoTermica = document.querySelector(".feel_like")
        let PorcetagemDeChuva = document.querySelector(".PorcetagemDeChuva")
        let velocidadeDoVento = document.querySelector(".speedWind")
        let Uv = document.querySelector(".Uv h4")


        SensacaoTermica.innerHTML = Math.round(dados.clima.main.feels_like);
        PorcetagemDeChuva.innerHTML = `${dados.previsao.list[0].pop * 100}%`;

        velocidadeDoVento.innerHTML = `${Math.round(dados.clima.wind.speed)} Km/h`
    }
    catch (error) {
        console.log("ERRO:", error);
    }
}

let buttonCidade = document.querySelector(".background i").addEventListener("click", () => {

    let cidade = inputCidade.value;
    Clima(cidade)
 salvadados(dados)

})

window.addEventListener("DOMContentLoaded", () => {
    Clima("vitoria da conquista");


});


async function mostraImagem() {
    try {
        const url = "https://picsum.photos/1920/1080";

        const img = new Image();

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });

        document.body.style.backgroundImage = `url(${img.src})`;

    } catch (erro) {
        console.log("Erro ao carregar a imagem:", erro);
    }
}

mostraImagem();



