import Estilos from './styles/Estilos.js';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { initDB, adicionarPessoa, listarPessoas, deletarPessoa } from './database';
import PessoaItem from './components/PessoaItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pessoas, setPessoas] = useState([]);

  async function carregarPessoas() {
    const lista = await listarPessoas();
    setPessoas(lista);
  };
  
  const prepararApp = async () => {
    await initDB();
    await carregarPessoas();
  };

  async function handleAdicionar() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await adicionarPessoa(nome, email);
    setNome('');
    setEmail('');
    await carregarPessoas();
  };

  async function handleDeletar(id) {
    await deletarPessoa(id);
    await carregarPessoas();
  };

  useEffect(() => {
    prepararApp();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Estilos.safeAreaViewContainer}>
        <Text style={Estilos.textoTitulo}>
          Cadastro de Pessoas (SQLite)
        </Text>

        <View style={Estilos.camposCadastroContainer}>
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={Estilos.campoTexto}
          />
          <Button title="Adicionar" onPress={handleAdicionar} />
        </View>

        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PessoaItem id={item.id} nome={item.nome} email={item.email} onDelete={handleDeletar} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
