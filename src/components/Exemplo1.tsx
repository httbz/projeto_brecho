import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { PrincipalProps } from '../navigation/HomeNavigator';

const Exemplo1 = (props: PrincipalProps) => {
  //variável
  let url = 'https://reactnative.dev/docs/assets/p_cat2.png';
  //O retorno da função é o que será construído em tela
  return (
    //painel que desliza
    <ScrollView>
      <View style={[styles.center, { marginTop: 200 }]}>
        {/*texto ou label */}
        <Text style={styles.titulo1}>Exemplo 1 com style</Text>

        {/*painel */}

        <View>

          {/*imagem, o campo source é o caminho da imagem */}
          <Image
            source={{ uri: url }}
            style={styles.imagem_200}
          />
        </View>
        {/*caixa de texto */}
        <TextInput
          style={[styles.caixa_texto, styles.largura_70]}
          defaultValue="Digite aqui"
        />

        <Pressable
          style={(state) => [styles.botao, styles.largura_100, { backgroundColor: '#fff2e0' }, state.pressed ? { opacity: 0.5 } : null, styles.shadow]} onPress={() => { props.navigation.goBack() }}>
          <Text style={[styles.texto_botao, { color: '#643085', fontWeight: 'bold' }]}>Voltar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Exemplo1;

