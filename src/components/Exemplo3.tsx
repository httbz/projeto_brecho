import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Pressable, ImageBackground, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { LoginProps } from '../navigation/HomeNavigator';
import auth from "@react-native-firebase/auth";


const Exemplo3 = (props: LoginProps) => {
  //variável
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  let url = 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'

  function tratarErros(erro: string) {
    console.log(erro);
    if (erro.includes("[auth/invalid-email]")) {
      Alert.alert("Email inválido", "Digite um email válido")
    } else if (erro.includes("[INVALID_LOGIN_CREDENTIALS]")) {
      Alert.alert("Login ou senha incorretos")
    } else if (erro.includes("[auth/invalid-credential]")) {
      Alert.alert("Login ou senha incorretos")
    } else {
      Alert.alert("Erro", erro)
    }
  }


  function logar() {
    if (verificaCampos()) {
      auth()
        .signInWithEmailAndPassword(login, senha)
        .then(() => {
          props.navigation.navigate('TelaPrincipal')
        })
        .catch((error) => { tratarErros(String(error)) })
    }
  }

  function verificaCampos(): boolean {
    if (login == '') {
      Alert.alert("Login em branco",
        "Digite o Login")
      return false;
    }
    if (senha == '') {
      Alert.alert("Email em branco",
        "Digite uma senha")
      return false;
    }
    return true;
  }

  function redefinirSenha() {
    if (login == '') {
      Alert.alert("Email em branco", "Preencha o email")
      return

    }
    auth()
      .sendPasswordResetEmail(login)
      .then(() => Alert.alert("Redefinir senha",
        "Enviamos um email para você redefinir sua senha"))
      .catch((error) => console.log(error))
  }
  //O retorno da função é o que será construído em tela
  return (

    <ScrollView>



      <View style={[styles.center, { marginTop: 50 }]}>

        <View>

          <Image
            source={{ uri: url }}
            style={[styles.imagem_200, styles.shadow]}
          />
        </View>

        {/*Login */}
        <Text style={styles.titulo2}>Login</Text>
        <TextInput
          style={[styles.caixa_texto, styles.largura_100, styles.shadow]} onChangeText={(text) => setLogin(text)}
        />

        {/*Senha*/}
        <Text style={styles.titulo2}>Senha</Text>
        <TextInput
          style={[styles.caixa_texto, styles.largura_100, styles.shadow]}
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />

        {/*Entrar*/}
        <Pressable
          style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null, styles.shadow, { marginLeft: 300 }]} onPress={() => { logar() }}>
          <Text style={styles.texto_botao}>➡︎</Text>
        </Pressable>

      </View>

      <View style={[styles.bottom, { flexDirection: 'row' }]}>

        {/*Cadastrar-se*/}
        <Pressable
          style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null, styles.shadow, { margin: 10 }]} onPress={() => { props.navigation.navigate('TelaCadastro') }}>
          <Text style={styles.texto_botao}>Cadastrar-se</Text>
        </Pressable>

        {/*Esqueceu a senha*/}
        <Pressable
          style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null, styles.shadow, { margin: 10 }]} onPress={() => { redefinirSenha() }}>
          <Text style={styles.texto_botao}>Esqueceu a senha</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
};

export default Exemplo3;

