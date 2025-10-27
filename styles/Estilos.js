import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    pessoaItemContainer: {
      backgroundColor: '#f2f2f2',
      padding: 12,
      borderRadius: 8,
      marginVertical: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    pessoaItemNome: { fontSize: 16, fontWeight: 'bold' },
    pessoaItemEmail: { color: '#555' },
    pessoaItemBtnExcluirText: { color: 'red', fontWeight: 'bold' },
    safeAreaViewContainer: { flex: 1, backgroundColor: '#fff', padding: 20 },
    textoTitulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    camposCadastroContainer: { marginBottom: 20 },
    campoTexto: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    }
});