import listarAdm from "../service/trabalho/listarAdm.js";
import listarServico from "../service/trabalho/listarServico.js";
import agendamento from "../service/trabalho/agendamento.js";
import listarHoras from "../service/trabalho/listarHora.js";
import { Router } from "express";
import listarAgendamentos from "../service/trabalho/listarAgendamentos.js";
import { inserirServico } from "../repository/trabalhoRepository.js";
import multer from 'multer';
import path from 'path';

const endpoints = Router();

let storage = multer.diskStorage({
    destination: './storage/servicos',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}${extension}`;
        cb(null, fileName);
    }
});

let uploadServico = multer({ storage: storage });

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

endpoints.get('/agendamentos', async (req, resp) => {
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

endpoints.post('/servicos', uploadServico.single('imagem'), async (req, resp) => {
    try {
        let servico = req.body;
        servico.imagemServico = req.file.path;

        let id = await inserirServico(servico);

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

export default endpoints;
