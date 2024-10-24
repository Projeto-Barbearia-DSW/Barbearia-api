import login from './controller/loginController.js'
import trabalho from './controller/trabalhoController.js'

export default function adicionarRotas(servidor) {
    servidor.use(login);
    servidor.use(trabalho);
}