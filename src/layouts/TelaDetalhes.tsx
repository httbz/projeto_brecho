import React, { useEffect, useState } from "react";
import { ImageBackground, Alert, Pressable, Text, View, Image, ScrollViewBase, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { useRoute } from '@react-navigation/native';
import { styles } from "../styles/styles";
import { DetalhesProps, TelaDetalhesRouteProp } from "../navigation/HomeNavigator";

const TelaDetalhes = (props: DetalhesProps) => {
    const route = useRoute<TelaDetalhesRouteProp>();
    const { id } = route.params;
    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('produtos')
            .doc(id)
            .onSnapshot(doc => {
                if (doc.exists) {
                    const produtoData = { id: doc.id, ...doc.data() } as Produto;
                    setProduto(produtoData);
                }
            });

        return () => unsubscribe();
    }, [id]);

    const finalizarCompra = () => {
        if (produto?.id) {
            firestore()
                .collection('produtos')
                .doc(produto.id)
                .delete()
                .then(() => {
                    Alert.alert("Compra", "Compra efetuada com sucesso!");
                    props.navigation.navigate('TelaPrincipal');
                })
                .catch(() => {
                    Alert.alert("Erro", "Não foi possível efetuar a compra.");
                });
        }
    };

    if (!produto) {
        return <Text>Carregando...</Text>;
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={require('../images/bkgIMG2.png')}>
            <ScrollView>
                <View style={styles.center}>
                    <Text style={[styles.titulo1, { textAlign: 'center', marginTop: 25 }]}>{produto.nome}</Text>

                    <View style={[styles.shadow, { backgroundColor: 'white', borderRadius: 15, marginTop: 20, marginBottom: 20 }]}>
                        <Text style={styles.titulo3}>Anunciado por: {produto.email || "E-mail não disponível"}</Text>
                    </View>

                    {produto.imagemUri ? (
                        <Image source={{ uri: produto.imagemUri }} style={styles.imagem} />
                    ) : (
                        <Text>Imagem não disponível</Text>
                    )}

                    <View style={[styles.shadow, { backgroundColor: 'white', borderRadius: 15 }]}>
                        <Text style={styles.descricao}>{produto.descricao}</Text>
                    </View>
                    <View style={[styles.shadow, { backgroundColor: 'white', borderRadius: 15, marginTop: 20 }]}>
                        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                        <Pressable style={[styles.botao, { marginHorizontal: 15 }]} onPress={() => { props.navigation.goBack() }}>
                            <Text style={styles.texto_botao}>Voltar</Text>
                        </Pressable>
                        <Pressable style={[styles.botao, { marginHorizontal: 15 }]} onPress={finalizarCompra}>
                            <Text style={styles.texto_botao}>Finalizar Compra</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default TelaDetalhes;
