import { Valid } from "./Valid";

class BoardStorage {
  static set(key: string, value: string): void {
    if (typeof value !== "object") sessionStorage.setItem(key, value);

    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  static get(key: string) {
    let item = <string>sessionStorage.getItem(key);

    if (!Valid.isJSON(item)) return item;
    return JSON.parse(item);
  }
}

export { BoardStorage };