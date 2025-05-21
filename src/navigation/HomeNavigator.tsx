import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaUsuarios from "../layouts/TelaUsuarios";
import TelaCarros from "../layouts/TelaCarros";
import telaClientes from "../layouts/TelaClientes";
import TelaVendas from "../layouts/TelaVendas";
import TelaLogin from "../layouts/TelaLogin";

type RootStackParamList = {
  TelaPrincipal: undefined;
  TelaUsuarios: undefined;
  TelaCarros: undefined;
  TelaClientes: undefined;
  TelaVendas: undefined;
  TelaLogin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TelaLogin" component={TelaLogin} />
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaUsuarios" component={TelaUsuarios} />
      <Stack.Screen name="TelaCarros" component={TelaCarros} />
      <Stack.Screen name="TelaClientes" component={telaClientes} />
      <Stack.Screen name="TelaVendas" component={TelaVendas} />
    </Stack.Navigator>

  );
}

type PrincipalProps = NativeStackScreenProps<RootStackParamList,
  'TelaPrincipal'>;
type UsuariosProps = NativeStackScreenProps<RootStackParamList,
  'TelaUsuarios'>;
type CarrosProps = NativeStackScreenProps<RootStackParamList,
  'TelaCarros'>;
type ClientesProps = NativeStackScreenProps<RootStackParamList,
  'TelaClientes'>;
type VendasProps = NativeStackScreenProps<RootStackParamList,
  'TelaVendas'>;
type LoginProps = NativeStackScreenProps<RootStackParamList,
  'TelaLogin'>;

export default HomeNavigator;

export type {
  LoginProps,PrincipalProps, UsuariosProps, CarrosProps, ClientesProps, VendasProps
};