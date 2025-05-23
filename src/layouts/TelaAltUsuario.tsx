import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../styles/styles';

type Usuario = {
  usuario_id: string;
  nome: string;
  email: string;
  senha: string;
};

const TelaAltUsuario = (props: any) => {
  const usuarioId = props.route.params.usuario_id;

  const [usuario, setUsuario] = useState<Usuario>({
    usuario_id: usuarioId,
    nome: '',
    email: '',
    senha: '',
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Busca os dados do usuário
  const buscarUsuario = async () => {
    try {
      const docRef = await firestore().collection('usuarios').doc(usuarioId).get();

      if (docRef.exists) {
        const dados = docRef.data();
        setUsuario({
          usuario_id: usuarioId,
          nome: dados?.nome || '',
          email: dados?.email || '',
          senha: dados?.senha || '',
        });
      } else {
        Alert.alert('Erro', 'Usuário não encontrado');
      }
    } catch (error: any) {
      Alert.alert('Erro ao buscar usuário', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

  const atualizarCampo = (campo: keyof Usuario, valor: string) => {
    setUsuario(prev => ({ ...prev, [campo]: valor }));
  };

  // Salva as alterações
  const salvarAlteracoes = async () => {
    setSalvando(true);
    try {
      await firestore().collection('usuarios').doc(usuario.usuario_id).update({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
      });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro ao salvar', error.message);
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.tela}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.Texto_botao}>Voltar</Text>
      </Pressable>

      <Text>Nome:</Text>
      <TextInput
        style={styles.TextInput}
        value={usuario.nome}
        onChangeText={text => atualizarCampo('nome', text)}
        placeholder="Nome"
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.TextInput}
        value={usuario.email}
        onChangeText={text => atualizarCampo('email', text)}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text>Senha:</Text>
      <TextInput
        style={styles.TextInput}
        value={usuario.senha}
        onChangeText={text => atualizarCampo('senha', text)}
        placeholder="Senha"
        secureTextEntry
      />

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click, { marginTop: 20 }]}
        onPress={salvarAlteracoes}
        disabled={salvando}
      >
        <Text style={styles.Texto_botao}>
          {salvando ? 'Salvando...' : 'Salvar Alterações'}
        </Text>
      </Pressable>
    </View>
  );
};

export default TelaAltUsuario;
