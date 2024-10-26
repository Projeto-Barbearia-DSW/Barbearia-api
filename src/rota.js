import login from './controller/loginController.js'
import trabalho from './controller/trabalhoController.js'
import express  from "express";

export default function adicionarRotas(servidor) {
    servidor.use(login);
    servidor.use(trabalho);
    servidor.use('/storage/servicos', express.static('./storage/servicos'));
    servidor.use('/storage/servicosFeitos', express.static('./storage/servicosFeitos'));
}