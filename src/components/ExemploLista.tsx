import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, Image } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { styles } from "../styles/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../navigation/HomeNavigator';
import auth from "@react-native-firebase/auth";

const ExemploLista = () => {
  const [produtos, setProdutos] = useState([] as Produto[]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('produtos')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as Produto[];
        setProdutos(data);
      });

    return () => subscribe();
  }, []);

  function deletarProduto(id: string) {
    firestore()
      .collection('produtos')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Excluir", "Produto excluido com sucesso!");
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo1}>Brechó Online</Text>
      <FlatList
        data={produtos}
        renderItem={(info) =>
          <ItemProduto
            numeroOrdem={info.index + 1}
            prod={info.item}
            onDeletar={deletarProduto}
          />
        }
      />
    </View>
  );
}

type ItemProdutoProps = {
  numeroOrdem: number;
  prod: Produto;
  onDeletar: (id: string) => void;
}

const ItemProduto = (props: ItemProdutoProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = auth().currentUser;

  return (
    <View style={{marginVertical: 50}}>
      <Pressable onPress={() => navigation.navigate('TelaDetalhes', { id: props.prod.id })}>
      {props.prod.imagemUri ? (
        <Image source={{ uri: props.prod.imagemUri }} style={[styles.imagem, styles.shadow, { marginTop: 15, marginLeft: 20}]} />
      ) : (
        <Text>Imagem não disponível</Text>
      )}
      </Pressable>

      <View style={[styles.card, styles.shadow]}>
        <View style={styles_local.dados_card}>
          <Text style={{ fontSize: 30, color: 'black', textAlign: 'center' }}>
            {props.prod.nome}
          </Text>
          {/*<Text style={{ marginTop: 15, fontSize: 20, textAlign: 'center' }}>
            Descrição: {props.prod.descricao.slice(0, 30)}
          </Text>*/}
          <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center', color: 'green' }}>
            R${props.prod.preco.toFixed(2)}
            {user && user.uid === props.prod.uId && (
            <View style={[styles.botao2]}>
              <Pressable onPress={() => navigation.navigate('TelaAltProduto', { id: props.prod.id })}>
                <Text style={[styles_local.texto_botao_card, {marginLeft: 30}]}>🖊</Text>
              </Pressable>
            </View>
          )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExemploLista;

const styles_local = StyleSheet.create({
  dados_card: {
    flex: 1
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  botao_alterar: {
    backgroundColor: 'yellow',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_botao_card: {
    fontWeight: "bold",
    fontSize: 25,
    color: 'black'
  }
});
