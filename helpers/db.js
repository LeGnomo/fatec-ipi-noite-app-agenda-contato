import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase("contato.db");

export const init = () =>{
    // console.log('a');
    const promise = new Promise((resolve,reject) =>{
        db.transaction ((tx)=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tb_contato (id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT NOT NULL,imagemURI TEXT NOT NULL, telefone INTERGER NOT NULL,lng TEXT NOT NULL,lat TEXT NOT NULL,data TEXT NOT NULL)',
                [],
                () => {resolve()},
                (_,err) => {reject(err)}
            );
        });
        
    });
    // console.log("b");
    return promise;
}

export const insertContato = (nome,telefone,imagemURI,lng,lat,data) =>{
    console.log("3");
    const promissa = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO tb_contato (nome,imagemURI,telefone,lng,lat,data) VALUES (?,?,?,?,?,?)',
                [nome,imagemURI,telefone,lng,lat,data],
                (_,resultado) => {resolve(resultado)},
                (_,err) => {reject(err)}
                );
                
            })
        });
        return promissa;
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