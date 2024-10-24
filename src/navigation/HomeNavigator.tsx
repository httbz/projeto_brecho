import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLogin from "../layouts/TelaLogin";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaCadastro from "../layouts/TelaCadastro";

type RootStackParamList = {
    TelaLogin: undefined;
    TelaPrincipal: undefined;
    TelaCadastro: undefined;

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

        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;    

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;   

type CadastroProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;   

export default HomeNavigator;
export type {
    LoginProps,
    PrincipalProps,
    CadastroProps
};