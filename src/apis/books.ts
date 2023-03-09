import axios from "axios";
import { Book } from "../types/Book";

// jsonサーバー起動 : yarn json-server --watch db.json --port 3100

const BookDataUrl = "http://localhost:3100/books";

// 全リスト取得
export const getAllBooksData = async () => {
  const response = await axios.get(BookDataUrl);
  return response.data;
};

// 1件の書籍を追加する
export const addBookData = async (todo: Book) => {
  const response = await axios.post(BookDataUrl, todo);
  return response.data;
};

// 1件の書籍を削除する
export const deleteBookData = async (id: string) => {
  await axios.delete(`${BookDataUrl}/${id}`);
  return id;
};

// 1件の書籍を更新する
export const updateBookData = async (id: string, todo: Book) => {
  const response = await axios.put(`${BookDataUrl}/${id}`, todo);
  return response.data;
};