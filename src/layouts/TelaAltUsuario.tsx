import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';

type Usuario = {
  usuario_id: string;
  nome: string;
  email: string;
  senha: string;
}

const TelaAltUsuario = (props: any) => {
  const usuarioId = props.route.params.usuario_id;

  // Estado para os dados do usuário
  const [usuario, setUsuario] = useState<Usuario>({
    usuario_id: usuarioId,
    nome: '',
    email: '',
    senha: '',
  });

  // Estado para carregar dados
  const [loading, setLoading] = useState(true);

  // Simula a função que busca o usuário da collection
  async function buscarUsuario(id: string): Promise<Usuario> {
    // Aqui você faria sua chamada para API, banco, etc.
    // Exemplo fake:
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          usuario_id: id,
          nome: 'João Silva',
          email: 'joao@email.com',
          senha: '123456',
        });
      }, 1000);
    });
  }

  useEffect(() => {
    // Buscar dados do usuário ao montar o componente
    buscarUsuario(usuarioId)
      .then(dados => {
        setUsuario(dados);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        setLoading(false);
      });
  }, [usuarioId]);

  // Função para atualizar estado do usuário conforme o texto muda
  const atualizarCampo = (campo: keyof Usuario, valor: string) => {
    setUsuario(prev => ({ ...prev, [campo]: valor }));
  };

  if (loading) {
    return (
      <View style={styles.tela}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.Texto_botao}> Voltar </Text>
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

      {/* Você pode colocar aqui o botão para salvar as alterações */}

    </View>
  );
};

export default TelaAltUsuario;
