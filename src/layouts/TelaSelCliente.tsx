import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { styles } from '../styles/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'TelaSelCliente'>;
type TelaSelClienteRouteProp = RouteProp<RootStackParamList, 'TelaSelCliente'>;

const TelaSelCliente = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<TelaSelClienteRouteProp>();

  const usuario = route.params.usuario;  // pega o usuario dos params da rota

  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('clientes')
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientes(lista);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.tela}>
      <FlatList
        style={{ marginTop: 40 }}
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card_view}
            onPress={() => navigation.navigate("TelaVendas", { cliente: item, usuario })}
          >
            <Text style={{ fontSize: 18 }}>{item.nome}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default TelaSelCliente;
