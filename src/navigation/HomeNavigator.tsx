import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLogin from "../layouts/TelaLogin";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaCadastro from "../layouts/TelaCadastro";
import TelaCadProduto from "../layouts/TelaCadProduto";
import ExemploLista from "../components/ExemploLista";
import TelaDetalhes from "../layouts/TelaDetalhes";
import { RouteProp } from "@react-navigation/native";
import TelaAltProduto from "../layouts/TelaAltProduto";

type RootStackParamList = {
    TelaLogin: undefined;
    TelaPrincipal: undefined;
    TelaCadastro: undefined;
    TelaCadProduto: undefined;
    ExemploLista: undefined;
    TelaDetalhes: { id: string };
    TelaAltProduto: { id: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="TelaLogin" 
            screenOptions={{headerShown: false}}>

            <Stack.Screen name="TelaLogin" component={TelaLogin} />

            <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
            
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />

            <Stack.Screen name="TelaCadProduto" component={TelaCadProduto} />

            <Stack.Screen name="ExemploLista" component={ExemploLista} />

            <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />

            <Stack.Screen name="TelaAltProduto" component={TelaAltProduto} />

        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;    

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;   

type CadastroProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>; 

type CadProdutoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadProduto'>;   

type DetalhesProps = NativeStackScreenProps<RootStackParamList, 'TelaDetalhes'>; 

type TelaDetalhesRouteProp = RouteProp<RootStackParamList, 'TelaDetalhes'>;

type AltProdutoProps = NativeStackScreenProps<RootStackParamList, 'TelaAltProduto'>; 

export default HomeNavigator;
export type {
    LoginProps,
    PrincipalProps,
    CadastroProps,
    CadProdutoProps,
    DetalhesProps,
    RootStackParamList,
    TelaDetalhesRouteProp,
    AltProdutoProps
};