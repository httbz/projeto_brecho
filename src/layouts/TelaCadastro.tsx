import React from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { CadastroProps, PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import ExemploCadastro from '../components/ExemploCadastro';


const TelaCadastro = (props: CadastroProps) => {
    return (
        <ImageBackground style={{flex: 1}} source={require('../images/bkgIMG.png')} >
        <View 
            style={[styles.tela, styles.center]}>
            <ExemploCadastro navigation={props.navigation} route={props.route}/>
        </View>
        </ImageBackground>
    );
}

export default TelaCadastro;
