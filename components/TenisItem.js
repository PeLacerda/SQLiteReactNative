import Estilos from '../styles/Estilos.js';
import { View, Text, TouchableOpacity } from 'react-native';

export default function TenisItem({ id, nome, preco, tamanho, onDelete }) {
  return (
    <View style={Estilos.tenisItemContainer}>

      <View>
        <Text style={Estilos.tenisItemNome}>{nome}</Text>
        <Text style={Estilos.tenisItemPreco}>R$ {preco.toFixed(2)}</Text>
        <Text style={Estilos.tenisItemTamanho}>Tamanho: {tamanho}</Text>
      </View>

      <TouchableOpacity onPress={() => onDelete(id)}>
        <Text style={Estilos.tenisItemBtnExcluirText}>Excluir</Text>
      </TouchableOpacity>
      
    </View>
  );
}

