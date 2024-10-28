import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Pressable, ImageBackground, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { CadastroProps, LoginProps } from '../navigation/HomeNavigator';
import auth from "@react-native-firebase/auth";


const Exemplo3 = (props: CadastroProps) => {
  //variável
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  let url = 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'

  function tratarErros(erro: string) {
    console.log(erro);
    if (erro.includes("[auth/invalid-email]")) {
      Alert.alert("Email inválido", "Digite um email válido")
    } else if (erro.includes("[auth/weak-password]")){
      Alert.alert("Senha fraca", 
        "A senha digitada é fraca. A senha deve conter pelo "
      + "menos 6 digitos")
    } else if (erro.includes("[auth/email-already-in-use]")){
      Alert.alert("Email em uso",
        "O email inserido já foi cadastrado em outra conta."
      )
    } else {
      Alert.alert("Erro", erro)
    }
  }
    async function cadastrar(){
      if (verificaCampos()) {
          auth()
          .createUserWithEmailAndPassword(email, senha)
          .then(() => {
              Alert.alert("Conta",
                  "Cadastrado com sucesso")
                  props.navigation.goBack();
          })
          .catch((error) => { tratarErros( String(error) ) } );
      }
  }
  
  function verificaCampos(): boolean {
      if (email == '') {
          Alert.alert("Email em branco",
              "Digite um email")
          return false;
      }
      if (senha == '') {
          Alert.alert("Senha em branco",
              "Digite uma senha")
          return false;
      }
      if (confirmaSenha == '') {
          Alert.alert("Confirmação de senha em branco",
              "Redigite a senha")
          return false;
      }
      if (senha != confirmaSenha) {
          Alert.alert("Senhas não conferem",
              "Certifique-se de que as duas senhas são iguais")
          return false;
      }
      return true;
  }

  return (

    <ScrollView>



      <View style={[styles.center, { marginTop: 215 }]}>

        {/*Login */}
        <Text style={styles.titulo2}>Email</Text>
        <TextInput
          style={[styles.caixa_texto, styles.largura_100, styles.shadow]} onChangeText={(text) => setEmail(text)}
        />

        {/*Senha*/}
        <Text style={styles.titulo2}>Senha</Text>
        <TextInput
          style={[styles.caixa_texto, styles.largura_100, styles.shadow]}
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />

        <Text style={styles.titulo2}>Confirme a Senha</Text>
        <TextInput
          style={[styles.caixa_texto, styles.largura_100, styles.shadow]} 
          secureTextEntry={true}
          onChangeText={(text) => setConfirmaSenha(text)}
        />

      </View>

      <View style={[styles.bottom, { flexDirection: 'row' }]}>

        {/*Cadastrar-se*/}
        <Pressable
          style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null, styles.shadow, { margin: 10 }]} onPress={() => { cadastrar() }}>
          <Text style={styles.texto_botao}>Salvar</Text>
        </Pressable>

        {/*Esqueceu a senha*/}
        <Pressable
          style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null, styles.shadow, { margin: 10 }]} onPress={() => { props.navigation.goBack() }}>
          <Text style={styles.texto_botao}>Cancelar</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
};

export default Exemplo3;

