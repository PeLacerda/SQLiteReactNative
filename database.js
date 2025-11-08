import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco local
const db = SQLite.openDatabaseSync('cadastros.db');

// Funciona de forma assincrona
// Await significa que eséra a função assincroma terminar
export async function initDB() {
  await db.execAsync(`      // Executa de forma assincrona
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);
};

export async function adicionarPessoa(nome, email) {
  await db.runAsync(      // Aceita parametros para substituir valores
    'INSERT INTO pessoas (nome, email) VALUES (?, ?);',
    [nome, email]
  );
};

export async function listarPessoas() {
  const pessoas = await db.getAllAsync('SELECT * FROM pessoas;');       // Pega todos os dados assincronos
  return pessoas;
};

export async function deletarPessoa(id) {
  await db.runAsync('DELETE FROM pessoas WHERE id = ?;', [id]);
};
