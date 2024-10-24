export default function validarAgendamento(agendamento){
    if(!agendamento.nomeCliente) throw new Error('Nome é obrigatório');
    if(!agendamento.telefoneCliente) throw new Error('telefone é obrigatório');
    if(!agendamento.dataAgendamento) throw new Error('Data é obrigatório');
    if(!agendamento.idHorario) throw new Error('Horario é obrigatório');
    if(!agendamento.idServico) throw new Error('Serviço é obrigatório');
}