
import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { styles } from "../styles/styles";

const ExemploLista = () => {
  //cria a lista de produtos 
  const [produtos, setProdutos] = useState([] as Produto[]);

  //O useEffect executa a função que for passada como parâmetro
  useEffect(() => {
    //Buscar os dados da tabela de produtos
    const subscribe = firestore()
      .collection('produtos')
      .onSnapshot(querySnapshot => { //A cada atualização dos dados no banco de dados é acionado o evento onSnapshot
        /*
        Os registros ficam em querySnapshot.docs eles são percorridos usando a função map
        onde para cada objeto na lista será armazenado o seu valor na variável doc
        e então executada uma função*/
        const data = querySnapshot.docs.map(doc => {
          /*Nessa função estão sendo retornados 1 objeto para cada item da lista de produtos
          cada objeto está sendo guardado na constante data, formando um array [] */
          return {
            id: doc.id,
            ...doc.data() //doc.data() está sendo decomposto para colocar os campo de produto lado a lado com o id
          }

        }) as Produto[];

        //data contém a lista atualizada dos produtos, então é preenchido o state com data para atualizar a FlatList
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
        Alert.alert("Compra", "Compra efetuada com sucesso!")
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
            onDeletar={deletarProduto}/>} />

    </View>
  );
}

type ItemProdutoProps = {
  numeroOrdem: number;
  prod: Produto;
  onDeletar: (id: string) => void;
}

const ItemProduto = (props: ItemProdutoProps) => {

  return (
    <View style={styles.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {props.prod.nome}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Descrição:{props.prod.descricao.slice(0,30)}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Preço: R${props.prod.preco.toFixed(2)}
        </Text>
      </View>

      <View
        style={styles_local.botoes_card}>
        <View style={[styles.botao, {backgroundColor: 'white', borderRadius: 1}]}>
          <Pressable
            onPress={() => props.onDeletar(props.prod.id)}>
            <Text style={styles_local.texto_botao_card}>
            🛒
            </Text>
          </Pressable>
        </View>
        
      </View>
    </View>
  );
}

export default ExemploLista;

const styles_local = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: 'grey',
    margin: 5,
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  dados_card: {
    flex: 1
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  botao_deletar: {
    backgroundColor: 'red',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_alterar: {
    backgroundColor: 'yellow',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_botao_card: {
    fontWeight: "bold",
    fontSize: 40,
    color: 'black'
  }
});
