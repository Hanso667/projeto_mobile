import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator'; // certifique-se do caminho correto
import { Carro } from '../types/Carro';
import { styles } from '../styles/styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'TelaSelCarro'>;

const TelaSelCarros = () => {
    const [carros, setCarros] = useState<Carro[]>([]);
    const [selecionados, setSelecionados] = useState<{ [id: string]: boolean }>({});
    const [quantidades, setQuantidades] = useState<{ [id: string]: string }>({});
    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('carros')
            .onSnapshot(snapshot => {
                const lista = snapshot.docs.map(doc => ({
                    carro_id: doc.id,
                    ...doc.data(),
                })) as Carro[];
                setCarros(lista);
            });

        return () => unsubscribe();
    }, []);

    const finalizarSelecao = () => {
        const selecionadosList = carros.filter(c => selecionados[c.carro_id]);
        navigation.navigate("TelaVendas", {
            carros: selecionadosList,
            qtds: quantidades,
        });
    };

    return (
        <View>
            <FlatList
                data={carros}
                keyExtractor={(item) => item.carro_id}
                renderItem={({ item }) => (
                    <View style={styles.card_view}>
                        <Text style={{ fontSize: 18 }}>
                            {item.modelo} - R$ {item.valor.toFixed(2)}
                        </Text>
                        <Pressable
                            style={[styles.botao_01, selecionados[item.carro_id] && styles.click]}
                            onPress={() =>
                                setSelecionados(prev => ({ ...prev, [item.carro_id]: !prev[item.carro_id] }))
                            }
                        >
                            <Text style={styles.Texto_botao}>
                                {selecionados[item.carro_id] ? 'Remover' : 'Selecionar'}
                            </Text>
                        </Pressable>
                        {selecionados[item.carro_id] && (
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Quantidade"
                                keyboardType="numeric"
                                value={quantidades[item.carro_id] || '1'}
                                onChangeText={(text) =>
                                    setQuantidades(prev => ({ ...prev, [item.carro_id]: text }))
                                }
                            />
                        )}
                    </View>
                )}
            />
            <Pressable style={styles.botao_01} onPress={finalizarSelecao}>
                <Text style={styles.Texto_botao}>Confirmar Seleção</Text>
            </Pressable>
        </View>
    );
};

export default TelaSelCarros;
