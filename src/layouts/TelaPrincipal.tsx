import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import Exemplo1 from '../components/Exemplo1';


const TelaPrincipal = (props: PrincipalProps) => {
    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG.png')} >
            <ScrollView>
                <View>
                    <Pressable
                        style={(state) => [styles.botao, styles.largura_100, { backgroundColor: 'blue' }, state.pressed ? { opacity: 0.5 } : null, styles.shadow]} onPress={() => { props.navigation.goBack() }}>
                        <Text style={[styles.texto_botao, { color: '#643085', fontWeight: 'bold' }]}>Voltar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default TelaPrincipal;
