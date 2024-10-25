import { useState } from "react";
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { CadProdutoProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

const TelaCadProduto = (props: CadProdutoProps) => {
    const [nome, setNome] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    function cadastrar() {
        if (verificaCampos()) {
            //crie um objeto do tipo Produto
            let produto = {
                nome: nome,
                descricao: Descricao,
                preco: Number.parseFloat(preco)
            } as Produto;

            //adiciona o objeto produto na tabela produtos
            firestore()
                .collection('produtos')
                .add(produto)
                .then(() => {
                    Alert.alert("Produto", "Cadastrado com sucesso!");
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert("Erro", String(error));
                });
        }
    }

    function verificaCampos() {
        if (!nome) {
            Alert.alert("Nome em branco",
                "Digite um nome")
            return false;
        }
        if (!Descricao) {
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

    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG.png')} >
            <ScrollView
                style={{ flex: 1 }}>
                <View
                    style={[styles.center, styles.tela]}>
                    <Text style={styles.titulo1}>Cadastro de Roupa</Text>
                    <Text
                        style={styles.titulo1}>
                        Titulo
                    </Text>
                    <TextInput
                        style={[styles.caixa_texto, styles.shadow, { width: '60%' }]}
                        onChangeText={(text) => { setNome(text) }} />

                    <Text
                        style={styles.titulo2}>
                        Descrição
                    </Text>
                    <TextInput
                        style={[styles.caixa_texto, styles.shadow,  { width: '60%', }]}
                        multiline
                        numberOfLines={10}
                        onChangeText={(text) => { setDescricao(text) }} />

                    <Text
                        style={styles.titulo2}>
                        Preço
                    </Text>
                    <TextInput
                        maxLength={7}
                        style={[styles.caixa_texto, styles.shadow,  { width: '40%' }]}
                        onChangeText={(text) => { setPreco(text) }} />
                    <View style={{flexDirection: "row"}}>
                        <Pressable
                            style={[styles.botao, styles.shadow,  { backgroundColor: '#395ead', marginRight: 10 }]}
                            onPress={() => cadastrar()}>
                            <Text style={styles.texto_botao}>Cadastrar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.botao, styles.shadow,  { backgroundColor: '#395ead', marginLeft: 10 }]}
                            onPress={() => props.navigation.goBack()}>
                            <Text style={styles.texto_botao}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default TelaCadProduto;