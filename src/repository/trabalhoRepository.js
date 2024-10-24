import con from "./connection.js"

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

export async function inserirAgendamento(agendar) {
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

export async function listarHorarios() {
    const comando = `
        select id_horario as id_horario,
               horario as horario
        from horarios;
    `

    let [registros] = await con.query(comando);
    return registros;
}
