const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");

const rotas = require("./config/rotas");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());
app.use(logger("dev"));

app.use(rotas);

app.set("port", 4567);
app.listen(app.get("port"), () => {
    console.log(`SERVIDOR RODANDO VIOLENTAMENTE NA PORTA ${app.get("port")}`);
});
