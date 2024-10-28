import { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { AltProdutoProps, CadProdutoProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { launchImageLibrary } from "react-native-image-picker";

const TelaAltProduto = (props: AltProdutoProps) => {
  const [id,] = useState(props.route.params.id);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  async function carregar() {
    console.log(id);
    const resultado = await firestore()
      .collection('produtos')
      .doc(id)
      .get();

    const produto = {
      id: resultado.id,
      ...resultado.data()
    } as Produto;

    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco.toFixed(2));
    setImagemUri(produto.imagemUri);
  };

  useEffect(() => {
    carregar();
  }, []);

  function alterar() {
    if (verificaCampos()) {
      let produto = {
        nome: nome,
        descricao: descricao,
        preco: Number.parseFloat(preco),
        imagemUri: imagemUri,
      } as Produto;

      firestore()
        .collection('produtos')
        .doc(id)
        .update(produto)
        .then(() => {
          Alert.alert("Produto", "Alterado com sucesso")
          props.navigation.goBack();
        })
        .catch((error) => console.log(error));
    }
  }

  function verificaCampos() {
    if (!nome) {
      Alert.alert("Nome em branco",
        "Digite um nome")
      return false;
    }
    if (!descricao) {
      Alert.alert("Código de Barras em branco",
        "Digite um código de barras")
      return false;
    }
    if (!preco) {
      Alert.alert("Preço em branco",
        "Digite um preço")
      return false;
    }

    let precoNumero = Number.parseFloat(preco)
    if (precoNumero <= 0) {
      Alert.alert("Preço incorreto",
        "Digite um preço maior do que zero")
      return false;
    }

    return true;
  }

  function selecionarImagem() {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Seleção cancelada');
      } else if (response.errorMessage) {
        Alert.alert('Erro ao selecionar a imagem');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        setImagemUri(selectedImage.uri ?? null);
      }
    });
  }
  function deletarProduto(id: string) {
    firestore()
      .collection('produtos')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Excluisão", "Produto excluido com sucesso!"
        );
        props.navigation.navigate('TelaPrincipal')
      })
      .catch((error) => console.log(error));
  }
  return (
    <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG2.png')} >
      <ScrollView>
        <View
          style={[styles.tela, { marginTop: 25 }]}>
          <Text style={[styles.titulo1]}>Alteração de Produto</Text>

          <TextInput
            style={[styles.caixa_texto, styles.shadow, { width: '60%', marginBottom: 25 }]}
            defaultValue={nome}
            onChangeText={(text) => { setNome(text) }} />

          {imagemUri && (
            <Image source={{ uri: imagemUri }} style={styles.imagem} />
          )}
          <Pressable style={[styles.botao, styles.shadow]} onPress={selecionarImagem}>
            <Text style={styles.texto_botao}>Selecionar Imagem</Text>
          </Pressable>

          <Text style={styles.titulo2}>Descrição</Text>
          <TextInput
            style={[styles.caixa_texto, styles.shadow, { width: '60%' }]}
            multiline
            numberOfLines={10}
            defaultValue={descricao}
            onChangeText={(text) => { setDescricao(text) }}
          />

          <Text
            style={styles.titulo2}>
            Preço
          </Text>
          <TextInput
            defaultValue={preco}
            maxLength={7}
            style={[styles.caixa_texto, { width: '40%' }]}
            onChangeText={(text) => { setPreco(text) }} />


          <View style={{ flexDirection: 'row', marginTop: 25 }}>
            <Pressable
              style={[styles.botao, { marginHorizontal: 10 }]}
              onPress={() => alterar()}>
              <Text style={styles.texto_botao}>Alterar</Text>
            </Pressable>
                      <Pressable
            style={[styles.botao_vermelho, { marginHorizontal: 10 }]}
            onPress={() => deletarProduto(id)}>
            <Text style={[styles.texto_botao, {fontSize: 50}]}>🗑</Text>
          </Pressable>
          </View>
          <Pressable
              style={[styles.botao, { marginHorizontal: 5, marginBottom: 25 }]}
              onPress={() => { props.navigation.goBack() }}>
              <Text style={styles.texto_botao}>Cancelar</Text>
            </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default TelaAltProduto;
