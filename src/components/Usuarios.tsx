import React, { useState, useEffect } from 'react';
import {
    Alert, FlatList, Pressable, Text, TextInput, View, ScrollView
} from 'react-native';
import { styles } from '../styles/styles';
import firestore from "@react-native-firebase/firestore";
import { Usuario } from '../types/Usuario';

type props = {
    onAlter: (id: string) => void
}


const UsuarioScreen = (props: props) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // 🧹 Limpa os campos após cadastro
    const limparCampos = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
    };

    // ✅ Verifica se os campos estão corretos
    const verificaCampos = (): boolean => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Aviso', 'Todos os campos são obrigatórios.');
            return false;
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Aviso', 'As senhas não coincidem.');
            return false;
        }
        return true;
    };

    // 💾 Cadastra usuário no Firestore
    const cadastrarUsuario = () => {
        if (!verificaCampos()) return;

        const usuario: Omit<Usuario, 'usuario_id'> = {
            nome,
            email,
            senha,
        };

        firestore()
            .collection('usuarios')
            .add(usuario)
            .then(() => {
                Alert.alert("Usuário", "Cadastrado com sucesso!");
                limparCampos();
            })
            .catch(error => {
                Alert.alert("Erro", String(error));
            });
    };

    // ❌ Deleta usuário
    const deletarUsuario = (id: string) => {
        firestore()
            .collection('usuarios')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Usuário", "Removido com sucesso");
            })
            .catch(error => {
                console.error("Erro ao deletar:", error);
                Alert.alert("Erro", "Não foi possível deletar o usuário.");
            });
    };

    
    const alterarUsuario = (id: string) => {
        props.onAlter(id);
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('usuarios')
            .onSnapshot(snapshot => {
                const data: Usuario[] = snapshot.docs.map(doc => ({
                    usuario_id: doc.id,
                    ...(doc.data() as Omit<Usuario, 'usuario_id'>)
                }));
                setUsuarios(data);
            });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            {/* 🔹 FORMULÁRIO DE CADASTRO */}
            <View style={styles.tela}>
                <Text style={styles.texto_01}>Nome</Text>
                <TextInput style={styles.TextInput} value={nome} onChangeText={setNome} />

                <Text style={styles.texto_01}>Email</Text>
                <TextInput style={styles.TextInput} value={email} onChangeText={setEmail} keyboardType="email-address" />

                <Text style={styles.texto_01}>Senha</Text>
                <TextInput style={styles.TextInput} value={senha} onChangeText={setSenha} secureTextEntry />

                <Text style={styles.texto_01}>Confirmar Senha</Text>
                <TextInput style={styles.TextInput} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />

                <Pressable
                    style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                    onPress={cadastrarUsuario}
                >
                    <Text style={styles.Texto_botao}>Cadastrar</Text>
                </Pressable>
            </View>

            {/* 🔹 LISTA DE USUÁRIOS */}
            <View style={styles.lista_01}>
                <Text style={[styles.texto_01, { marginTop: 24, marginBottom: 8 }]}>Usuários Cadastrados</Text>
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.usuario_id}
                    renderItem={({ item }) => (
                        <View style={styles.card_view}>
                            <View style={styles.card}>
                                <Text style={{ fontSize: 16 }}>ID: {item.usuario_id}</Text>
                                <Text style={{ fontSize: 16 }}>Nome: {item.nome}</Text>
                                <Text style={{ fontSize: 16 }}>Email: {item.email}</Text>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Senha: ••••••••</Text>
                            </View>

                            <View style={styles.botoes_view}>
                                <View style={[styles.botoes_card, styles.botao_deletar]}>
                                    <Pressable onPress={() => deletarUsuario(item.usuario_id)}>
                                        <Text style={styles.Texto_botao}>Deletar</Text>
                                    </Pressable>
                                </View>

                                <View style={[styles.botoes_card, styles.botao_alterar]}>
                                    <Pressable onPress={() => alterarUsuario(item.usuario_id)}>
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

export default UsuarioScreen;