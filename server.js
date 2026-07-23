
const express = require("express");
require("dotenv").config();


const apiKey = process.env.OPENWEATHER_KEY;

const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.static("public"));
async function  buscarClima(cidade) {
    
   const requisicao = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`)

let resposta = await requisicao.json();

return resposta 
}
app.get("/clima/:cidade", async (req, res) => {
    const dados = await buscarClima(req.params.cidade);

    res.json(dados);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
