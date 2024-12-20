import con from "./connection.js"

/*
Inserir
 */

export async function inserirAgendamento(agendar) {
    const disponivel = await verificarDisponibilidade(agendar.dataAgendamento, agendar.idHorario);
    if (!disponivel) {
        throw new Error('Horário já está reservado para esta hora.');
    }

    const comando = `
        INSERT INTO agendamento (nome_cliente, telefone_cliente, data_agendamento, id_horario, id_servico)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [info] = await con.query(comando, [
        agendar.nomeCliente,
        agendar.telefoneCliente,
        agendar.dataAgendamento,
        agendar.idHorario,
        agendar.idServico
    ]);

    return info.insertId;
}

export async function inserirServico(servico) {
    const comando = `
        INSERT INTO servicos (imagem, nome, valor, tempo)
        VALUES (?, ?, ?, ?)
    `;

    let [info] = await con.query(comando, [
        servico.imagemServico,
        servico.nomeServico,
        servico.valorServico,
        servico.tempoServico
    ]);

    return info.insertId;
}

export async function inserirServicoFeito(servicoFeito) {
    const comando = `
        INSERT INTO servicos_feitos (imagem, nome)
        VALUES (?, ?)
    `;

    let [info] = await con.query(comando, [
        servicoFeito.imagemServicoFeito,
        servicoFeito.nomeServicoFeito
    ]);

    return info.insertId;
}






/*
Listar
 */



export async function listarAdmin() {
    const comando = `
        select id_admin as id_admin,
               email as email_admin,
               senha as senha_admin
        from admin;
    `

    let [registros] = await con.query(comando);
    return registros;
}

export async function listarAgendamento() {
    const comando = `
        SELECT ag.id_agendamento AS id_agendamento,
               ag.nome_cliente AS nome_cliente,
               ag.telefone_cliente AS telefone_cliente,
               ag.data_agendamento AS data_agendamento,
               hr.horario AS horario,
               sv.nome AS nome_servico
        FROM agendamento ag
                 INNER JOIN servicos sv ON ag.id_servico = sv.id_servico
                 INNER JOIN horarios hr ON ag.id_horario = hr.id_horario;
    `;

    let [registros] = await con.query(comando);
    return registros;
}



export async function listarServicos() {
    const comando = `
        select id_servico as id_servico,
               imagem as imagem_servico,
               nome as nome_servico,
               valor as valor_servico,
               tempo as tempo_servico
        from servicos;

    `

    let [registros] = await con.query(comando);
    return registros;
}


export async function listarServicosFeitos() {
    const comando = `
        select id_servico_feito as id_servico_feito,
                imagem as imagem_servico_feito,
                nome as nome_servico_feito
        from servicos_feitos;
    `

    let [registros] = await con.query(comando);
    return registros;
}



export async function listarHorarios() {
    const comando = `
        select id_horario as id_horario,
               horario as horario
        from horarios;
    `

    let [registros] = await con.query(comando);
    return registros;
}





/*
Deletar
 */
export async function deletarAgendamento(id_agendamento) {
    const comando = `delete from agendamento where id_agendamento = ?;`;

    let [info] = await con.query(comando, [id_agendamento])
    return info.affectedRows;
}


export async function deletarServicoFeito(id_servico_feito) {
    const comando = `delete from servicos_feitos where id_servico_feito = ?;`;

    let [info] = await con.query(comando, [id_servico_feito])
    return info.affectedRows;
}

export async function deletarServico(id_servico) {
    const comando = `delete from servicos where id_servico = ?;`;

    let [info] = await con.query(comando, [id_servico])
    return info.affectedRows;
}



/*
Editar
 */


export async function atualizarServico(id, servico) {
    const comando = `
        UPDATE servicos
        SET imagem = ?, nome = ?, valor = ?, tempo = ?
        WHERE id_servico = ?
    `;

    let [info] = await con.query(comando, [
        servico.imagemServico,
        servico.nomeServico,
        servico.valorServico,
        servico.tempoServico,
        id
    ]);

    return info.affectedRows;
}

export async function atualizarServicoNome(id, servico) {
    const comando = `
        UPDATE servicos
        SET nome = ?, valor = ?, tempo = ?
        WHERE id_servico = ?
    `;

    let [info] = await con.query(comando, [
        servico.nomeServico,
        servico.valorServico,
        servico.tempoServico,
        id
    ]);

    return info.affectedRows;
}

export async function atualizarServicoFeito(id, servicoFeito) {
    const comando = `
        UPDATE servicos_feitos
        SET imagem = ?, nome = ?
        WHERE id_servico_feito = ?
    `;

    let [info] = await con.query(comando, [
        servicoFeito.imagemServicoFeito,
        servicoFeito.nomeServicoFeito,
        id
    ]);

    return info.affectedRows;
}



export async function atualizarServicoFeitoNome(id, servicoFeito) {
    const comando = `
        UPDATE servicos_feitos
        SET nome = ?
        WHERE id_servico_feito = ?
    `;

    let [info] = await con.query(comando, [
        servicoFeito.nomeServicoFeito,
        id
    ]);

    return info.affectedRows;
}



export async function atualizarAgendamento(id, agendamento) {
    const comando = `
        UPDATE agendamento
        SET nome_cliente = ?, telefone_cliente = ?, data_agendamento = ?, id_horario = ?, id_servico = ?
        WHERE id_agendamento = ?
    `;

    let [info] = await con.query(comando, [
        agendamento.nomeCliente,
        agendamento.telefoneCliente,
        agendamento.dataAgendamento,
        agendamento.idHorario,
        agendamento.idServico,
        id
    ]);

    return info.affectedRows;
}




export async function inserirAgendamentoFeito(agendamentoFeito) {
    const comando = `
        INSERT INTO agendamento_feito (nome_cliente, telefone_cliente, data_agendamento, horario, nome_servico)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [info] = await con.query(comando, [
        agendamentoFeito.nome_cliente,
        agendamentoFeito.telefone_cliente,
        agendamentoFeito.data_agendamento,
        agendamentoFeito.horario,
        agendamentoFeito.nome_servico
    ]);

    // Get the service value
    const [servico] = await con.query(`
        SELECT valor
        FROM servicos
        WHERE nome = ?
    `, [agendamentoFeito.nome_servico]);

    const valorServico = servico[0].valor;

    const mes = new Date(agendamentoFeito.data_agendamento).getMonth() + 1;
    const ano = new Date(agendamentoFeito.data_agendamento).getFullYear();

    const [valoresMensais] = await con.query(`
        SELECT id_valor, valor_total
        FROM valores_mensais
        WHERE mes = ? AND ano = ?
    `, [mes, ano]);

    if (valoresMensais.length > 0) {
        await con.query(`
            UPDATE valores_mensais
            SET valor_total = valor_total + ?
            WHERE id_valor = ?
        `, [valorServico, valoresMensais[0].id_valor]);
    } else {
        // Insert a new entry
        await con.query(`
            INSERT INTO valores_mensais (mes, ano, valor_total)
            VALUES (?, ?, ?)
        `, [mes, ano, valorServico]);
    }

    return info.insertId;
}


export async function listarAgendamentosFeitos() {
    const comando = `
        SELECT id_agendamento_feito, nome_cliente, telefone_cliente, data_agendamento, horario, nome_servico
        FROM agendamento_feito;
    `;

    let [registros] = await con.query(comando);
    return registros;
}


export async function deletarAgendamentoFeito(id_agendamento_feito) {
    const comando = `DELETE FROM agendamento_feito WHERE id_agendamento_feito = ?;`;

    let [info] = await con.query(comando, [id_agendamento_feito]);
    return info.affectedRows;
}

export async function verificarDisponibilidade(data, idHorario) {
    const comando = `
        SELECT COUNT(*) as count
        FROM agendamento
        WHERE data_agendamento = ? AND id_horario = ?
    `;

    let [result] = await con.query(comando, [data, idHorario]);
    return result[0].count === 0;
}

export async function listarValoresMensais() {
    const comando = `
        SELECT id_valor, mes, ano, valor_total
        FROM valores_mensais
    `;

    let [registros] = await con.query(comando);
    return registros;
}
