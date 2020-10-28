export const ADD_CONTATO = 'ADD-CONTATO';
export const LISTA_CONTATO = 'LISTA-CONTATO';
import * as FileSystem from 'expo-file-system'
import { insertContato,buscarListaContato } from '../helpers/db';
import {Platform} from 'react-native';

export const listarContatos = () =>{
    return async dispatch => {
        try{
            const resultDB = await buscarListaContato();
            // console.log (resultDB);
            dispatch({type : LISTA_CONTATO,contatos : resultDB.rows._array || [] })
        }
        catch (err){
            console.log(err);
            throw err;
        }
    }
}


export const addContato = (nome,telefone,imagemURI,lng,lat,data) => {

    return async dispatch => {
        const nomeArquivo = imagemURI.split('/').pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo ;

        try{

            const resultDB =   await insertContato(nome,telefone,novoPath,lng,lat,data);
            console.log(resultDB);
            dispatch({type : ADD_CONTATO,dadosContato :{id:resultDB.insertId,nome : nome,telefone:telefone,imagemURI:novoPath,lng:lng,lat:lat,data: data }});
                        await FileSystem.moveAsync({
                from : imagemURI,
                to : novoPath
            });
        }
        catch (err){
            console.log(err);
            throw err;
        }
    }
}
