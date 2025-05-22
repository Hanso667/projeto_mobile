import React, { useState, useEffect } from 'react';
import {
    Alert, FlatList, Pressable, Text, TextInput, View, ScrollView
} from 'react-native';
import { styles } from '../styles/styles';
import firestore from "@react-native-firebase/firestore";
import { Cliente } from '../types/Cliente';

type Props = {
    onAlter: (id: string) => void
};

const ClienteScreen = ({ onAlter }: Props) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const limparCampos = () => {
        setNome('');
        setEndereco('');
        setCpf('');
    };

    const verificaCampos = (): boolean => {
        if (!nome || !endereco || !cpf) {
            Alert.alert('Aviso', 'Todos os campos são obrigatórios.');
            return false;
        }
        return true;
    };

    const cadastrarCliente = () => {
        if (!verificaCampos()) return;

        const novoCliente: Omit<Cliente, 'cliente_id'> = {
            nome,
            endereco,
            cpf,
        };

        firestore()
            .collection('clientes')
            .add(novoCliente)
            .then(() => {
                Alert.alert("Cliente", "Cadastrado com sucesso!");
                limparCampos();
            })
            .catch(error => {
                Alert.alert("Erro", String(error));
            });
    };

    const deletarCliente = (id: string) => {
        firestore()
            .collection('clientes')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Cliente", "Removido com sucesso");
            })
            .catch(error => {
                console.error("Erro ao deletar:", error);
                Alert.alert("Erro", "Não foi possível deletar o cliente.");
            });
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('clientes')
            .onSnapshot(snapshot => {
                const data: Cliente[] = snapshot.docs.map(doc => ({
                    cliente_id: doc.id,
                    ...(doc.data() as Omit<Cliente, 'cliente_id'>)
                }));
                setClientes(data);
            });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* 🔹 Formulário de cadastro */}
            <View style={styles.tela}>
                <Text style={styles.texto_01}>Nome</Text>
                <TextInput style={styles.TextInput} value={nome} onChangeText={setNome} />

                <Text style={styles.texto_01}>Endereço</Text>
                <TextInput style={styles.TextInput} value={endereco} onChangeText={setEndereco} />

                <Text style={styles.texto_01}>CPF</Text>
                <TextInput style={styles.TextInput} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

                <Pressable
                    style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                    onPress={cadastrarCliente}
                >
                    <Text style={styles.Texto_botao}>Cadastrar</Text>
                </Pressable>
            </View>

            {/* 🔹 Lista de clientes */}
            <View style={styles.lista_01}>
                <Text style={[styles.texto_01, { marginTop: 24, marginBottom: 8 }]}>Clientes Cadastrados</Text>
                <FlatList
                    data={clientes}
                    keyExtractor={(item) => item.cliente_id}
                    renderItem={({ item }) => (
                        <View style={styles.card_view}>
                            <View style={styles.card}>
                                <Text style={{ fontSize: 16 }}>ID: {item.cliente_id}</Text>
                                <Text style={{ fontSize: 16 }}>Nome: {item.nome}</Text>
                                <Text style={{ fontSize: 16 }}>Endereço: {item.endereco}</Text>
                                <Text style={{ fontSize: 16 }}>CPF: {item.cpf}</Text>
                            </View>

                            <View style={styles.botoes_view}>
                                <View style={[styles.botoes_card, styles.botao_deletar]}>
                                    <Pressable onPress={() => deletarCliente(item.cliente_id)}>
                                        <Text style={styles.Texto_botao}>Deletar</Text>
                                    </Pressable>
                                </View>

                                <View style={[styles.botoes_card, styles.botao_alterar]}>
                                    <Pressable onPress={() => onAlter(item.cliente_id)}>
                                        <Text style={[styles.Texto_botao, { color: 'black' }]}>Alterar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default ClienteScreen;
