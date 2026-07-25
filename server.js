
const express = require("express");
require("dotenv").config();


const apiKey = process.env.OPENWEATHER_KEY;


const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.static("public"));




async function buscarClima(cidade) {
    const requisicao = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return await requisicao.json();
}

async function buscarPrevisao(cidade) {
    const requisicao = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},BR&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return await requisicao.json();
}




app.get("/clima/:cidade", async (req, res) => {
    const clima = await buscarClima(req.params.cidade);
 const previsao = await buscarPrevisao(req.params.cidade);

console.log("Rota nova executada");

    res.json({
      previsao,
      clima

       
    });
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});