import Estilos from './styles/Estilos.js';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';        // FlatList cria uma tabela em lista
import { initDB, adicionarPessoa, listarPessoas, deletarPessoa } from './database';
import PessoaItem from './components/PessoaItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';      // Nova forma de usar o safeareaview

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pessoas, setPessoas] = useState([]);

  async function carregarPessoas() {
    const lista = await listarPessoas();
    setPessoas(lista);
  };

  const prepararApp = async () => {
    await initDB();      // Chama o initdb (executa a tabela)
    await carregarPessoas();      // Carrega as pessoas
  };

  // Verifica se o campo está vazio ou não
  async function handleAdicionar() {
    if (!nome.trim() || !email.trim()) {        // Verifica espaço vazio no inicio e final e elimina
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

  // Se não tem estado no array, não será chamado, ele será chamado apenas no inicio
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
          data={pessoas}      // Atribuição de dados à lista
          keyExtractor={(item) => item.id.toString()}     // Vincula chave, um id para cada item
          renderItem={({ item }) => (     // Rederiza os itens da lista e executa o que está em baixo a cada atualização
            <PessoaItem id={item.id}
                                nome={item.nome}
                                email={item.email}
                                onDelete={handleDeletar} />
          )}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
