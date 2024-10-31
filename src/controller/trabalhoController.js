import listarAdm from "../service/trabalho/listarAdm.js";
import listarServico from "../service/trabalho/listarServico.js";
import agendamento from "../service/trabalho/agendamento.js";
import listarHoras from "../service/trabalho/listarHora.js";
import listarAgendamentos from "../service/trabalho/listarAgendamentos.js";
import servicos from "../service/trabalho/servicos.js";
import listarServicoFeito from "../service/trabalho/listarServicoFeito.js";
import excluirAgendamentos from "../service/trabalho/deletarAgendamento.js";
import excluirServicoFeito from "../service/trabalho/deletarServicoFeito.js";
import excluirServico from "../service/trabalho/deletarServico.js";

import {
    atualizarServicoFeito,
    atualizarServico,
    atualizarAgendamento,
    atualizarServicoFeitoNome, atualizarServicoNome
} from "../repository/trabalhoRepository.js";
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


/*
Admin
 */

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




/*
Servico
 */

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

endpoints.delete('/servico/:id', async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let linhasAfetadas = await excluirServico(id);
        resp.send({ linhasAfetadas });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});




/*
Servico Feito
 */

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

endpoints.delete('/servicosfeitos/:id', async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let linhasAfetadas = await excluirServicoFeito(id);
        resp.send({ linhasAfetadas });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});




/*
Agendamento
 */

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

endpoints.delete('/agendamento/:id', async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let linhasAfetadas = await excluirAgendamentos(id);
        resp.send({ linhasAfetadas });
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





endpoints.put('/servico/:id', uploadServico.single('imagem'), async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let servico = req.body;
        servico.imagemServico = req.file?.path ?? null;


        let linhasAfetadas = null;
        if (servico.imagemServico == null) {
            linhasAfetadas = await atualizarServicoNome(id, servico);
        }
        else {
            linhasAfetadas = await atualizarServico(id, servico);
        }


        resp.send({ linhasAfetadas });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/servicosfeitos/:id', uploadServicoFeitos.single('imagem'), async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let servicoFeito = req.body;
        servicoFeito.imagemServicoFeito = req.file?.path ?? null;

        let linhasAfetadas = null;
        if (servicoFeito.imagemServicoFeito == null) {
            linhasAfetadas = await atualizarServicoFeitoNome(id, servicoFeito);
        }
        else {
            linhasAfetadas = await atualizarServicoFeito(id, servicoFeito);
        }


        resp.send({ linhasAfetadas });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.put('/agendamento/:id', async (req, resp) => {
    try {
        let id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        let agendamento = req.body;

        let linhasAfetadas = await atualizarAgendamento(id, agendamento);

        resp.send({ linhasAfetadas });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});














export default endpoints;
