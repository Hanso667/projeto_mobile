import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaUsuarios from "../layouts/TelaUsuarios";
import TelaCarros from "../layouts/TelaCarros";
import TelaClientes from "../layouts/TelaClientes"; // Corrigido: estava "telaClientes" com minúscula
import TelaVendas from "../layouts/TelaVendas";
import TelaLogin from "../layouts/TelaLogin";
import TelaAltUsuario from "../layouts/TelaAltUsuario";
import TelaSelCliente from "../layouts/TelaSelCliente";
import TelaSelCarro from "../layouts/TelaSelCarro";

type RootStackParamList = {
  TelaPrincipal: undefined;
  TelaUsuarios: undefined;
  TelaCarros: undefined;
  TelaClientes: undefined;
  TelaVendas: {
    cliente?: any;
    carros?: any[];
    qtds?: { [carro_id: string]: string };
  };
  TelaLogin: undefined;
  TelaAltUsuario: undefined;
  TelaSelCarro: undefined;
  TelaSelCliente: undefined;
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
      <Stack.Screen name="TelaClientes" component={TelaClientes} />
      <Stack.Screen name="TelaAltUsuario" component={TelaAltUsuario} />
      <Stack.Screen name="TelaVendas" component={TelaVendas} />
      <Stack.Screen name="TelaSelCliente" component={TelaSelCliente} />
      <Stack.Screen name="TelaSelCarro" component={TelaSelCarro} />
    </Stack.Navigator>
  );
};

// Tipagens para props de navegação
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type UsuariosProps = NativeStackScreenProps<RootStackParamList, 'TelaUsuarios'>;
type CarrosProps = NativeStackScreenProps<RootStackParamList, 'TelaCarros'>;
type ClientesProps = NativeStackScreenProps<RootStackParamList, 'TelaClientes'>;
type VendasProps = NativeStackScreenProps<RootStackParamList, 'TelaVendas'>;
type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type AltUsuarioProps = NativeStackScreenProps<RootStackParamList, 'TelaAltUsuario'>;
type SelCarroProps = NativeStackScreenProps<RootStackParamList, 'TelaSelCarro'>;
type SelClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaSelCliente'>;

export default HomeNavigator;

export type {
  RootStackParamList,
  LoginProps,
  PrincipalProps,
  UsuariosProps,
  CarrosProps,
  ClientesProps,
  VendasProps,
  AltUsuarioProps,
  SelClienteProps,
  SelCarroProps,
};
