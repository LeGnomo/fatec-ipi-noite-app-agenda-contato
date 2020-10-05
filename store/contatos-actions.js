export const ADD_CONTATO = 'ADD-CONTATO';
export const LISTA_CONTATO = 'LISTA-CONTATO';
import * as FileSystem from 'expo-file-system'
import { insertContato,buscarListaContato } from '../helpers/db';


export const listarContatos = () =>{
    return async dispatch => {
        try{
            const resultDB = await buscarListaContato();

            dispatch({type : LISTA_CONTATO,contatos : resultDB.rows._array || [] })
        }
        catch (err){
            console.log(err);
            throw err;
        }
    }
}
export const addContato = (nome,telefone,imagemURI) => {
    return async dispatch => {
        const nomeArquivo = imagemURI.split('/').pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
        try{
            await FileSystem.moveAsync({
                from : imagemURI,
                to : novoPath
            });

            const resultDB = await insertContato(nome,telefone,imagemURI);
            console.log(resultDB);
            dispatch({type : ADD_CONTATO,dadosContato :{id:resultDB.insertId,nome : nome,telefone:telefone,imagemURI:novoPath}});
        }
        catch (err){
            console.log(err);
            throw err;
        }
    }
}
