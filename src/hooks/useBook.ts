import { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../apis/books";
import { Book } from "../types/Book";

export const useBook = () => {
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    todoData.getAllBooksData().then((book) => {
      console.log(...book);
      setBookList([...book].reverse());
    });
  }, []);

  // doneを反転させる
  const toggleBookListItemStatus = (id: string, done: boolean) => {
    // Listから、idが一致する1件を取り出す
    console.log(bookList);
    const todoItem = bookList.find((item: Book) => item.id === id);
    // doneを反転させて、新たなitemを作成
    const newTodoItem: Book = { ...todoItem!, done: !done };
    // サーバに更新API呼ぶ
    todoData.updateBookData(id, newTodoItem).then((updatedBook) => {
      // 成功したら、Listを更新。idが一致しているものを、サーバーから返ってきたupdatedBookで更新する
      const newBookList = bookList.map((item) => (item.id !== updatedBook.id ? item : updatedBook));
      console.log(newBookList);
      // 新しいListをstateにセットする
      setBookList(newBookList);

    });
  };

  const UpdateEdit = (id:string, edit: boolean) => {
    const todoItem = bookList.find((item: Book) => item.id === id);
    console.log(todoItem);
    const newTodos =  {...todoItem!, edit: !edit};
    todoData.updateBookData(id, newTodos).then((updatedBook) => {
        // 成功したら、Listを更新。idが一致しているものを、サーバーから返ってきたupdatedBookで更新する
        const newTodoList = bookList.map((item) => {
            console.log(updatedBook);
           return item.id !== updatedBook.id ? item : updatedBook;
        })
        // 新しいListをstateにセットする
        setBookList(newTodoList);
    })
  }

  const UpdatetoggleBooksItem = (id: string, des: string) => {
    console.log(des);
    const todoItem = bookList.find((item: Book) => item.id === id);
    const newTodo: Book = {...todoItem!, description:des, edit:false};
    todoData.updateBookData(id, newTodo).then((updatedBook) => {
      // 成功したら、Listを更新。idが一致しているものを、サーバーから返ってきたupdatedBookで更新する
      const newTodoList = bookList.map((item) => {
       return item.id !== updatedBook.id ? item : updatedBook;
    })
      // 新しいListをstateにセットする
      setBookList(newTodoList);

    })
  }

  const addBookListItem = (todoName: string , todoContent: string) => {
    // あたらしいitemを作成する
    const newTodoItem = { id: ulid(), name: todoName, description: todoContent, done: false, edit: false};

    // サーバーの追加APIを呼ぶ
    todoData.addBookData(newTodoItem).then((addBook) => {
      // addBookをListに追加してstateにセットする
      setBookList([addBook, ...bookList]);
    });
  };

  const deleteBookListItem = (id: string) => {
    // サーバーの削除APIを呼ぶ
    todoData.deleteBookData(id).then((deletedid) => {
      const newTodoList = bookList.filter((item) => item.id !== deletedid);
      // 1件削除された新しいListに追加してstateにセットする
      setBookList(newTodoList);
    });
  };

  // 作成した関数を返す
  return { bookList, toggleBookListItemStatus, addBookListItem, deleteBookListItem, UpdatetoggleBooksItem, UpdateEdit };
};