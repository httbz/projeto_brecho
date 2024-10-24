import React from 'react';
import { ImageBackground, View } from 'react-native';
import { LoginProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import Exemplo3 from '../components/Exemplo3';


const TelaLogin = (props: LoginProps) => {


    return (
        <ImageBackground style={{flex: 1}} source={require('../images/bkgIMG.png')} >
        <View 
            style={[styles.tela, styles.center]}>
            <Exemplo3 navigation={props.navigation} route={props.route}/>
        </View>
        </ImageBackground>
    );
}

export default TelaLogin;
