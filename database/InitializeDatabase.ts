import { type SQLiteDatabase } from "expo-sqlite";

export async function initializedatabase(db: SQLiteDatabase) {
  if (!db) {
    console.log("Database has not been initialized.");
    return;
  }

  try {
    // Tabela Unidades
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY,
        description TEXT,
        abbreviation TEXT,
        weigh BOOLEAN,
        company_id INTEGER,
        created_at DATE,
        updated_at DATE
    );
`);
    // Tabela Grupos
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY,
        description TEXT,
        company_id INTEGER,
        created_at DATE,
        updated_at DATE
    );
`);
    // Tabela Produtos
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                description TEXT NOT NULL,
                barcode TEXT,
                reference TEXT,
                price_cost TEXT,
                price_cash TEXT,
                price_forward TEXT,
                type_product TEXT,
                quantity TEXT,
                ncm TEXT,
                origin TEXT,
                cst TEXT,
                cfop TEXT,
                pis_cst TEXT,
                pis_percent TEXT,
                cofins_cst TEXT,
                cofins_percent TEXT,
                icms_percent TEXT,
                inactive BOOLEAN,
                size BOOLEAN,
                group_id INTEGER,
                measure_id INTEGER,
                company_id INTEGER,
                created_at DATE,
                updated_at DATE,
                code_internal INTEGER,
                FOREIGN KEY (group_id) REFERENCES groups(id),
                FOREIGN KEY (measure_id) REFERENCES units(id)
            );
            `);
    // Tabela Grid de Produtos
    await db.execAsync(`
                CREATE TABLE IF NOT EXISTS productGrid (
                    id INTEGER PRIMARY KEY,
                    size TEXT,
                    quantity TEXT,
                    product_id INTEGER,
                    created_at DATE,
                    updated_at DATE,
                    FOREIGN KEY (product_id) REFERENCES products(id)
                );
                `);
    // tabela Config
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY,
        last_sync DATE
      )
    `);
    // Verifica se a config já tem uma linha
    const existingConfig = await db.getFirstAsync("SELECT * FROM config");
    // Se não existir, insere a linha com id 1
    if (!existingConfig) {
      await db.execAsync(`
      INSERT INTO config (id) VALUES (1)
    `);
    }
  } catch (error) {
    console.log("Error initializing database :" + error)
  }
}
