import Estilos from '../styles/Estilos.js';
import { View, Text, TouchableOpacity } from 'react-native';

export default function PessoaItem({ id, nome, email, onDelete }) {
  return (
    <View style={Estilos.pessoaItemContainer}>
      <View>
        <Text style={Estilos.pessoaItemNome}>{nome}</Text>
        <Text style={Estilos.pessoaItemEmail}>{email}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Text style={Estilos.pessoaItemBtnExcluirText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}
