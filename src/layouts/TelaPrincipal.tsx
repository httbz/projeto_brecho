import React from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import ExemploLista from '../components/ExemploLista';
import TelaCadProduto from './TelaCadProduto';
import auth from "@react-native-firebase/auth";


const TelaPrincipal = (props: PrincipalProps) => {

    function sair() {
        auth()
        .signOut()
        .then(() => {
            Alert.alert("Logout", "Usuário desconectado");
            props.navigation.navigate('TelaLogin');
        })
        .catch((error) => {
            console.log(error);
            Alert.alert("Erro", String(error));
        });
    }


    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG.png')} >
            <View
                style={[styles.tela, styles.center]}>
                <ExemploLista />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Pressable
                    style={(state) => [styles.botao2, styles.shadow, { backgroundColor: '#a83232', width: 70, marginLeft: 15 }, state.pressed ? { opacity: 0.5 } : null, styles.shadow]} onPress={(sair)}>
                    <Text style={[styles.texto_botao, { fontWeight: 'bold', fontSize: 45, marginBottom: 10 }]}>⬅︎</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao2, styles.shadow, { backgroundColor: '#395ead', width: 70, marginLeft: 310 }, state.pressed ? { opacity: 0.5 } : null, styles.shadow]} onPress={() => { props.navigation.navigate('TelaCadProduto') }}>
                    <Text style={[styles.texto_botao, { fontWeight: 'bold', fontSize: 45 }]}>+</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

export default TelaPrincipal;
