export default function validarServicoFeito(servicoFeito){
    if(!servicoFeito.imagemServicoFeito) throw new Error('imagem é obrigatório');
    if(!servicoFeito.nomeServicoFeito) throw new Error('nome é obrigatório');
}