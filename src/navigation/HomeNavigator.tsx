import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaUsuarios from "../layouts/TelaUsuarios";
import TelaCarros from "../layouts/TelaCarros";
import TelaClientes from "../layouts/TelaClientes"; // Corrigido: estava "telaClientes" com minúscula
import TelaVendas from "../layouts/TelaVendas";
import TelaLogin from "../layouts/TelaLogin";
import TelaAltUsuario from "../layouts/TelaAltUsuario";
import TelaAltCliente from "../layouts/TelaAltCliente";
import TelaAltCarro from "../layouts/TelaAltCarro";
import TelaSelCliente from "../layouts/TelaSelCliente";
import TelaSelCarro from "../layouts/TelaSelCarro";
import TelaSelMarca from "../layouts/TelaSelMarca";

type RootStackParamList = {
  TelaPrincipal: {
    usuario_id?: any;
  };
  TelaUsuarios: undefined;
  TelaCarros: {
    marca?: any;
  };
  TelaClientes: undefined;
  TelaVendas: {
    usuario?: any;
    cliente?: any;
    carros?: any[];
    qtds?: { [carro_id: string]: string };
  };
  TelaLogin: undefined;
  TelaAltUsuario: {
    usuario_id?: string 
  };
  TelaAltCarro: {
    carro_id?: string 
  };
  TelaAltCliente: {
    cliente_id?: string 
  };
  TelaSelCarro: undefined;
  TelaSelCliente: undefined;
  TelaSelMarca: undefined;
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
      <Stack.Screen name="TelaAltCarro" component={TelaAltCarro} />
      <Stack.Screen name="TelaAltCliente" component={TelaAltCliente} />
      <Stack.Screen name="TelaVendas" component={TelaVendas} />
      <Stack.Screen name="TelaSelCliente" component={TelaSelCliente} />
      <Stack.Screen name="TelaSelCarro" component={TelaSelCarro} />
      <Stack.Screen name="TelaSelMarca" component={TelaSelMarca} />
    </Stack.Navigator>
  );
};

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type UsuariosProps = NativeStackScreenProps<RootStackParamList, 'TelaUsuarios'>;
type CarrosProps = NativeStackScreenProps<RootStackParamList, 'TelaCarros'>;
type ClientesProps = NativeStackScreenProps<RootStackParamList, 'TelaClientes'>;
type VendasProps = NativeStackScreenProps<RootStackParamList, 'TelaVendas'>;
type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type AltUsuarioProps = NativeStackScreenProps<RootStackParamList, 'TelaAltUsuario'>;
type SelCarroProps = NativeStackScreenProps<RootStackParamList, 'TelaSelCarro'>;
type SelClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaSelCliente'>;
type AltClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCliente'>;
type AltCarroProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCarro'>;
type SelMarcaProps = NativeStackScreenProps<RootStackParamList, 'TelaSelMarca'>;

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
  AltCarroProps,
  AltClienteProps,
  SelMarcaProps
};
