import React, { useState } from 'react';
import {View,Button,Text,ActivityIndicator,Alert,StyleSheet} from 'react-native';

import Cores from  '../constantes/Cores';

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import PreviewMapa from './previewMapa';

const CapturaLocalizacao = (props) =>{

    const [estarCapturando,setEstarCapturando] = useState(false);
    const [localizacao,setLocalizacao] = useState();
    const verificarPermissao = async () =>  {
        const resultado = await Permissions.askAsync(Permissions.LOCATION);
        if(resultado.status !=='granted'){
            Alert.alert(
                "Sem permissão para uso do mecanismo de localização",
                "É preciso liberar acesso de localiziação",
                [{text : 'Ok'}]
            )
            return false;
        }
        props.onLocalizacaoCapturada (localizacao);
        return true;
    }

    const capturarLocalizacao = async () =>{
        const temPermissao =  verificarPermissao();
        if(temPermissao){
            try{
                setEstarCapturando(true);
                const localizacao = await Location.getCurrentPositionAsync({timeout : 8000});
                // console.log(localizacao);
                setLocalizacao({
                    lat : localizacao.coords.latitude,
                    lng : localizacao.coords.longitude
                });


            }catch (err){
                Alert.alert(
                    "Impossivel obter localizacao",
                    "Tente novamente mais tarde ou escolha uma no mapa",
                    [{text : "ok"}]
                )
            };
            setEstarCapturando(false);
        }
        
    }

    return (
        <View style={estilos.capturarLocalizacao} localizacao = {localizacao}>
            <PreviewMapa style = {estilos.previewDoMapa}>
            {
                estarCapturando ? <ActivityIndicator 
                size='large'
                color={Cores.primary}
                />
                : <Text>Nenhuma localização disponível</Text>
            }
                
            </PreviewMapa>
            <Button 
                title = 'obter localização'
                color = {Cores.primary}
                onPress={capturarLocalizacao}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    capturarLocalizacao : {
        marginBottom : 16,
    },
    previewDoMapa : {
        marginBottom : 12,
        width: '100%',
        height : 150,
        borderColor : "#DDD",
        borderWidth : 1,
        justifyContent : "center",
        alignItems : 'center'

    }
});

export default CapturaLocalizacao;