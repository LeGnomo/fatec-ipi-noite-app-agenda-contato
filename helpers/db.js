import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase("contato.db");

export const init = () =>{
    const promise = new Promise((resolve,reject) =>{
        db.transaction ((tx)=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tb_contato (id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT NOT NULL,imagemURI TEXT NOT NULL, telefone INTERGER NOT NULL)',
                [],
                () => {resolve()},
                (_,err) => {reject(err)}
            );
        });
        
    });
    return promise;
}

export const insertContato = (nome,telefone,imagemURI) =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
            'INSERT INTO tb_contato (nome,imagemURI,telefone) VALUES (?,?,?)',
            [nome,imagemURI,telefone],
            (_,resultado) => {resolve(resultado)},
            (_,err) => {reject(err)}
            );
        })
    });
    return promise;
}

export const buscarListaContato = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
            'SELECT * FROM tb_contato',
            [],
            (_,resultado) => {resolve(resultado)},
            (_,err) => {reject(err)}
            );
        })
    });
    return promise;
}

export const deletarListarContato = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
            'delete  from tb_contato',
            [],
            (_,resultado) => {resolve(resultado)},
            (_,err) => {reject(err)}
            );
        })
    });
    return promise;
}

export const dropTableContato = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
            'DROP TABLE tb_contato',
            [],
            (_,resultado) => {resolve(resultado)},
            (_,err) => {reject(err)}
            );
        })
    });
    return promise;
}