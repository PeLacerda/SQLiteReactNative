import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco local
const db = SQLite.openDatabaseSync('tenis.db');

// Funciona de forma assincrona
// Await significa que eséra a função assincroma terminar
export async function initDB() {
  await db.execAsync(`      // Executa de forma assincrona
    CREATE TABLE IF NOT EXISTS tenis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      tamanho INTEGER NOT NULL
    );
  `);
};

export async function adicionarTenis(nome, preco, tamanho) {
  await db.runAsync(      // Aceita parametros para substituir valores
    'INSERT INTO tenis (nome, preco, tamanho) VALUES (?, ?, ?);',
    [nome, preco, tamanho]
  );
};

export async function listarTenis() {
  const tenis = await db.getAllAsync('SELECT * FROM tenis;');       // Pega todos os dados assincronos
  return tenis;
};

export async function deletarTenis(id) {
  await db.runAsync('DELETE FROM tenis WHERE id = ?;', [id]);
};
