import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import ExemploLista from '../components/ExemploLista';
import TelaCadProduto from './TelaCadProduto';


const TelaPrincipal = (props: PrincipalProps) => {
    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG.png')} >
            <View
                style={[styles.tela, styles.center]}>
                <ExemploLista />
            </View>
            <View>
                <Pressable
                    style={(state) => [styles.botao2, { backgroundColor: '#395ead', width: 70, marginLeft: 400 }, state.pressed ? { opacity: 0.5 } : null, styles.shadow]} onPress={() => { props.navigation.navigate('TelaCadProduto') }}>
                    <Text style={[styles.texto_botao, { fontWeight: 'bold', fontSize: 45 }]}>+</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

export default TelaPrincipal;
