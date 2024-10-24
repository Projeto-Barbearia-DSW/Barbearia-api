import listarAdm from "../service/trabalho/listarAdm.js";
import listarServico from "../service/trabalho/listarServico.js";
import agendamento from "../service/trabalho/agendamento.js";
import listarHoras from "../service/trabalho/listarHora.js";

import {Router} from "express";
import listarAgendamentos from "../service/trabalho/listarAgendamentos.js";
const endpoints = Router();

endpoints.get('/admin', async (req, resp) => {
    try {
        let registros = await listarAdm();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/servico', async (req, resp) => {
    try {
        let registros = await listarServico();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.post('/agendamento', async (req, resp) => {
    try {
        let agendar = req.body;

        let id = await agendamento(agendar);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/agendamentos', async (req, resp) => {
    try {
        let registros = await listarAgendamentos();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/horas', async (req, resp) => {
    try {
        let registros = await listarHoras();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

export default endpoints;