import { useSQLiteContext } from "expo-sqlite";
import { useUnitDatabase } from "./useUnitDatabase";
import { useGroupDatabase } from "./useGroupDatabse";
import { useProductDatabase } from "./useProductDatabase";
import { initializedatabase } from "./InitializeDatabase";

export const useDbOperations = () => {
  const db = useSQLiteContext();

  const closeDb = async () => {
    try {
      const response = await db.getFirstAsync("SELECT * from products")
      console.log("closeee" + response)
      await db.closeAsync();
      console.log("Database closed successfully");
    } catch (error) {
      console.error("Failed to close the database: ", error);
    }
  }

  const dropDatabase = async () => {
    try {
      await db.runAsync("DELETE FROM units");
      await db.runAsync("DELETE FROM groups");
      await db.runAsync("DELETE FROM products");
      await db.runAsync("DELETE FROM productGrid");
      console.log("Tables DELETED successfully");
    } catch (error) {
      throw error;
    }
  };

  const updateLastSyncDate = async () => {
    const now = new Date().toISOString();
    const statement = await db.prepareAsync(
      `UPDATE config SET last_sync = $now`
    );

    try {
      await statement.executeAsync({
        $now: now,
      });
    } catch (error) {
      console.log("error updateLastSyncDate" + error);
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  };

  const getLastSycndate = async () => {
    const query = "SELECT last_sync FROM config";
    try {
      const response: { last_sync: string } | null = await db.getFirstAsync(
        query
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { dropDatabase, updateLastSyncDate, getLastSycndate, closeDb };
};

export const synchronizeAll = async () => {
  const unitDb = useUnitDatabase();
  const groupDb = useGroupDatabase();
  const productDb = useProductDatabase();

  await productDb.synchronizeAllProducts();
  await unitDb.synchronizeAllUnits();
  await groupDb.synchronizeAllGroups();
};
