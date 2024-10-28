import { useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Produto } from "../types/Produto";
import { CadProdutoProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { launchImageLibrary } from "react-native-image-picker";

const TelaCadProduto = (props: CadProdutoProps) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagemUri, setImagemUri] = useState<string | null>(null);

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

    function cadastrar() {
        if (verificaCampos()) {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert("Erro", "Usuário não autenticado");
                return;
            }

            const produto: Produto = {
                id: '',
                nome: nome,
                descricao: descricao,
                preco: Number.parseFloat(preco),
                imagemUri: imagemUri,
                uId: user.uid,
                email: user.email,
            };

            firestore()
                .collection('produtos')
                .add(produto)
                .then((docRef) => {
                    firestore()
                        .collection('produtos')
                        .doc(docRef.id)
                        .update({ id: docRef.id })
                        .then(() => {
                            Alert.alert("Produto", "Cadastrado com sucesso!");
                            props.navigation.goBack();
                        });
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("Erro", String(error));
                });
        }
    }

    function verificaCampos() {
        if (!nome || !descricao || !preco || !imagemUri) {
            Alert.alert("Erro", "Preencha todos os campos e selecione uma imagem.");
            return false;
        }

        let precoNumero = Number.parseFloat(preco);
        if (precoNumero <= 0) {
            Alert.alert("Preço incorreto", "Digite um preço maior do que zero");
            return false;
        }

        return true;
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG.png')}>
                        <ScrollView style={{ flex: 1 }}>
                <View style={[styles.center, styles.tela]}>
                    <Text style={styles.titulo1}>Cadastro de Roupa</Text>

                    <Text style={styles.titulo1}>Titulo</Text>
                    <TextInput
                        style={[styles.caixa_texto, styles.shadow, { width: '60%' }]}
                        onChangeText={(text) => { setNome(text) }}
                    />

                    <Text style={styles.titulo2}>Descrição</Text>
                    <TextInput
                        style={[styles.caixa_texto, styles.shadow, { width: '60%' }]}
                        multiline
                        numberOfLines={10}
                        onChangeText={(text) => { setDescricao(text) }}
                    />

                    <Text style={styles.titulo2}>Preço</Text>
                    <TextInput
                        maxLength={7}
                        style={[styles.caixa_texto, styles.shadow, { width: '40%' }]}
                        onChangeText={(text) => { setPreco(text) }}
                    />

                    <Text style={styles.titulo2}>Imagem</Text>
                    <Pressable style={[styles.botao, styles.shadow]} onPress={selecionarImagem}>
                        <Text style={styles.texto_botao}>Selecionar Imagem</Text>
                    </Pressable>
                    {imagemUri && (
                        <Image source={{ uri: imagemUri }} style={{ width: 100, height: 100, marginTop: 10 }} />
                    )}

                    <View style={{ flexDirection: "row" }}>
                        <Pressable
                            style={[styles.botao, styles.shadow, { backgroundColor: '#395ead', marginRight: 10 }]}
                            onPress={() => cadastrar()}
                        >
                            <Text style={styles.texto_botao}>Cadastrar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.botao, styles.shadow, { backgroundColor: '#395ead', marginLeft: 10 }]}
                            onPress={() => props.navigation.goBack()}
                        >
                            <Text style={styles.texto_botao}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default TelaCadProduto;


/*import { useState } from "react";
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

export default TelaCadProduto;*/