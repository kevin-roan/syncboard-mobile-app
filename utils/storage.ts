import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const getStorageItem = (key: string): string | undefined => {
  try {
    return storage.getString(key) ?? undefined;
  } catch (error) {
    console.error(`Failed to get storage item for key "${key}":`, error);
    return undefined;
  }
};

const setStorageItem = (key: string, value: string): void => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.error(`Failed to set storage item for key "${key}":`, error);
  }
};

export { storage, getStorageItem, setStorageItem };
