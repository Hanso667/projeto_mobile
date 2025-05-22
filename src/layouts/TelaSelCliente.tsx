import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'TelaSelCliente'>;

const TelaSelCliente = () => {
    const [clientes, setClientes] = useState<any[]>([]);
    const navigation = useNavigation<NavigationProps>();

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
        <FlatList
            data={clientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.card_view}
                    onPress={() => navigation.navigate("TelaVendas", { cliente: item })}
                >
                    <Text style={{ fontSize: 18 }}>{item.nome}</Text>
                </Pressable>
            )}
        />
    );
};

export default TelaSelCliente;
