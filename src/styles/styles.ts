import { Image, ImageBackgroundBase, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tela: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        //backgroundColor: '#FFFACD',

    },
    descricao: {
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 15,
        color: 'black'
    },
    usuario: {
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 15,
        color: 'black'
    },
    preco: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        color: 'green'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    imagem: {
        width: '90%',
        height: 450,
        borderRadius: 10,
        marginBottom: 15,
    },
    titulo1: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },
    titulo2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    titulo3: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: '#395ead',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 50,
    },
    botao2: {
        justifyContent: 'center',

        alignItems: 'center',
        marginTop: 20,
        borderRadius: 50,
    },
    botao_vermelho: {
        justifyContent: 'center',
        backgroundColor: '#ab2929',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 50,
    },
    texto_botao: {
        fontSize: 20,
        color: '#eef0ed',

    },

    caixa_texto: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 20,
        borderRadius: 50,
        margin: 3,
    },

    largura_70: {
        width: '70%'
    },

    largura_100: {
        width: '100%'
    },

    imagem_200: {
        width: 200,
        height: 200
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flex: 7,
    },

    bottom: {
        marginTop: 200,
        justifyContent: 'space-evenly',
        display: 'flex',
        flex: 0.3
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 55, height: 55 },
        shadowOpacity: 1.5,
        elevation: 5,
    },
    item: {
        justifyContent: 'center',
        alignContent: 'center',
        padding: 25,
        fontSize: 20,
        color: 'black',//'#643085' 

    },
    click: {
        opacity: 0.5
    },
    caixaNum: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 20,
        borderRadius: 50,
        margin: 3,
        width: '20%'
    },
    botao_deletar: {
        backgroundColor: 'red',
        width: 40,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50
    },
    botao_alterar: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 15,
        color: 'black'
    },
    card: {
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'white'
    },
    dados_card: {
        flex: 1
    }

});

export { styles };