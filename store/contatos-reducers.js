import { ADD_CONTATO,LISTA_CONTATO } from "./contatos-actions";
import Contato from '../modelo/Contato';

const estadoInicial = {
    contatos: []
};

export default (estado = estadoInicial, action) => {
    switch (action.type) {
        case ADD_CONTATO:
            const contato = new Contato (
                action.dadosContato.id.toString(),
                action.dadosContato.nome,
                action.dadosContato.telefone,
                action.dadosContato.imagemURI
            );
            return {
                contatos: estado.contatos.concat(contato)
            }
        case LISTA_CONTATO:
            // console.log(action.contatos);
            
            return{
                contatos : action.contatos.map((contato) => new Contato(contato.id.toString(),contato.nome,contato.telefone,contato.imagem))
            }
        default:
        return estado;
    }
}