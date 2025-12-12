import Estilos from './styles/Estilos.js';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';        // FlatList cria uma tabela em lista
import { initDB, adicionarTenis, listarTenis, deletarTenis } from './database';
import TenisItem from './components/TenisItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';      // Nova forma de usar o safeareaview

export default function App() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [tenis, setTenis] = useState([]);

  async function carregarTenis() {
    const lista = await listarTenis();
    setTenis(lista);
  };

  const prepararApp = async () => {
    await initDB();      // Chama o initdb (executa a tabela)
    await carregarTenis();      // Carrega os tênis
  };

  // Verifica se o campo está vazio ou não
  async function handleAdicionar() {
    if (!nome.trim() || !preco.trim() || !tamanho.trim()) {        // Verifica espaço vazio no inicio e final e elimina
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    
    const precoNum = parseFloat(preco);
    const tamanhoNum = parseInt(tamanho);
    
    if (isNaN(precoNum) || precoNum <= 0) {
      Alert.alert('Erro', 'Preço inválido');
      return;
    }
    
    if (isNaN(tamanhoNum) || tamanhoNum <= 0) {
      Alert.alert('Erro', 'Tamanho inválido');
      return;
    }
    
    await adicionarTenis(nome, precoNum, tamanhoNum);
    setNome('');
    setPreco('');
    setTamanho('');
    await carregarTenis();
  };

  async function handleDeletar(id) {
    await deletarTenis(id);
    await carregarTenis();
  };

  // Se não tem estado no array, não será chamado, ele será chamado apenas no inicio
  useEffect(() => {
    prepararApp();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Estilos.safeAreaViewContainer}>
        <Text style={Estilos.textoTitulo}>
          Loja de Tênis
        </Text>

        <View style={Estilos.camposCadastroContainer}>
          <TextInput
            placeholder="Nome do tênis"
            value={nome}
            onChangeText={setNome}
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="Preço (ex: 299.90)"
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
            style={Estilos.campoTexto}
          />
          <TextInput
            placeholder="Tamanho (ex: 42)"
            value={tamanho}
            onChangeText={setTamanho}
            keyboardType="numeric"
            style={Estilos.campoTexto}
          />
          <Button title="Adicionar Tênis" onPress={handleAdicionar} />
        </View>

        <FlatList
          data={tenis}      // Atribuição de dados à lista
          keyExtractor={(item) => item.id.toString()}     // Vincula chave, um id para cada item
          renderItem={({ item }) => (     // Rederiza os itens da lista e executa o que está em baixo a cada atualização
            <TenisItem id={item.id}
                                nome={item.nome}
                                preco={item.preco}
                                tamanho={item.tamanho}
                                onDelete={handleDeletar} />
          )}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
