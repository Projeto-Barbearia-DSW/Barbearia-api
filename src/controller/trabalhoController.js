import listarAdm from "../service/trabalho/listarAdm.js";
import listarServico from "../service/trabalho/listarServico.js";
import agendamento from "../service/trabalho/agendamento.js";
import listarHoras from "../service/trabalho/listarHora.js";
import listarAgendamentos from "../service/trabalho/listarAgendamentos.js";
import servicos from "../service/trabalho/servicos.js";
import listarServicoFeito from "../service/trabalho/listarServicoFeito.js";
import servicosFeitos from "../service/trabalho/servicosFeitos.js";
import { Router } from "express";
import multer from 'multer';
import path from 'path';
import {inserirServicoFeito} from "../repository/trabalhoRepository.js";


const endpoints = Router();

let storageServicos = multer.diskStorage({
    destination: './storage/servicos',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}${extension}`;
        cb(null, fileName);
    }
});

let uploadServico = multer({ storage: storageServicos });

let storageServicosFeitos = multer.diskStorage({
    destination: './storage/servicosFeitos',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}${extension}`;
        cb(null, fileName);
    }
});

let uploadServicoFeitos = multer({ storage: storageServicosFeitos });

endpoints.get('/admin', async (req, resp) => {
    try {
        let registros = await listarAdm();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
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
        });
    }
});

endpoints.post('/servico', uploadServico.single('imagem'), async (req, resp) => {
    try {
        let servico = req.body;
        servico.imagemServico = req.file.path;

        let id = await servicos(servico);

        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/servicosfeitos', async (req, resp) => {
    try {
        let registros = await listarServicoFeito();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/servicosfeitos', uploadServicoFeitos.single('imagem') ,async (req, resp) => {
    try {
        let servicoFeito = req.body;
        servicoFeito.imagemServicoFeito = req.file.path;

        let id = await inserirServicoFeito(servicoFeito);

        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/agendamento', async (req, resp) => {
    try {
        let agendar = req.body;

        let id = await agendamento(agendar);

        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/agendamento', async (req, resp) => {
    try {
        let registros = await listarAgendamentos();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
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
        });
    }
});

export default endpoints;
