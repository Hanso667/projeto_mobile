import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text, TextInput, Pressable, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Venda, Carro_venda } from '../types/venda'; // ou seu caminho real
import { Carro } from '../types/Carro';
import { styles } from '../styles/styles';

const AddVenda = () => {
    const [clienteId, setClienteId] = useState('');
    const [carros, setCarros] = useState<Carro[]>([]);
    const [selecionados, setSelecionados] = useState<{ [carro_id: string]: boolean }>({});
    const [quantidades, setQuantidades] = useState<{ [carro_id: string]: string }>({});

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('carros')
            .onSnapshot(snapshot => {
                const lista: Carro[] = snapshot.docs.map(doc => ({
                    carro_id: doc.id,
                    ...doc.data(),
                })) as Carro[];
                setCarros(lista);
            });

        return () => unsubscribe();
    }, []);

    const toggleSelecionado = (id: string) => {
        setSelecionados(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const cadastrarVenda = async () => {
        if (!clienteId) {
            Alert.alert("Erro", "Cliente ID obrigatório.");
            return;
        }

        const carrosSelecionados = carros.filter(c => selecionados[c.carro_id]);
        if (carrosSelecionados.length === 0) {
            Alert.alert("Erro", "Selecione pelo menos um carro.");
            return;
        }

        const vendaData: Omit<Venda, 'venda_id'> = {
            cliente_id: clienteId,
            valor_total: carrosSelecionados.reduce((soma, carro) => {
                const quantidade = parseInt(quantidades[carro.carro_id] || '1');
                return soma + (carro.valor * quantidade);
            }, 0),
        };

        try {
            const vendaRef = await firestore().collection('vendas').add(vendaData);
            const vendaId = vendaRef.id;

            for (const carro of carrosSelecionados) {
                const quantidade = parseInt(quantidades[carro.carro_id] || '1');
                const carroVenda: Omit<Carro_venda, 'venda_id'> = {
                    carro_id: carro.carro_id,
                    quantidade,
                    valor: carro.valor * quantidade,
                };

                await firestore().collection('carros_vendas').add({
                    ...carroVenda,
                    venda_id: vendaId,
                });
            }

            Alert.alert("Venda", "Venda registrada com sucesso!");
            setClienteId('');
            setSelecionados({});
            setQuantidades({});
        } catch (error) {
            Alert.alert("Erro", String(error));
        }
    };

    return (
        <View style={styles.tela}>
            <Text style={styles.texto_01}>Cliente ID</Text>
            <TextInput
                style={styles.TextInput}
                value={clienteId}
                onChangeText={setClienteId}
            />

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
                            onPress={() => toggleSelecionado(item.carro_id)}
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

            <Pressable style={styles.botao_01} onPress={cadastrarVenda}>
                <Text style={styles.Texto_botao}>Registrar Venda</Text>
            </Pressable>
        </View>
    );
};

export default AddVenda;
