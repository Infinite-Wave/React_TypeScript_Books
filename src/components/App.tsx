import React, { useRef } from "react";

import { useBook } from "../hooks/useBook";
import { Book } from "../types/Book";
import { BooksLending } from "./BooksLending";
import { BookAdd } from "./BookAdd";
import { BookList } from "./BookList";
import { BookTitle } from "./BookTitle";
import styles from "../styles.module.scss"

function App() {
  // カスタムフックから必要な変数を取得
  const { bookList, toggleBookListItemStatus, addBookListItem, deleteBookListItem, UpdatetoggleBooksItem, UpdateEdit } = useBook();

  
  const inputEl = useRef<HTMLInputElement>(null);
  const inputText = useRef<HTMLTextAreaElement>(null); 
  

  const handleAddBookListItem = () => {
    if (inputEl.current?.value === "") {
      return;
    }
    addBookListItem(inputEl.current!.value, inputText.current!.value);
    inputEl.current!.value = "";
    inputText.current!.value = "";
  };

  // 未完了リスト
  const incompletedList = bookList.filter((todo: Book) => !todo.done);
  // 完了リスト
  const completedList = bookList.filter((todo: Book) => todo.done);

  return (
    <div className={styles.container}>
      <div className={styles.appTitle}>
        <BookTitle title="書籍管理" as="h1" />
      </div>
      <div className={styles.wrap}> 
        <BookAdd 
            buttonText="新規書籍登録" 
            inputEl={inputText} 
            inputText={inputEl} 
            handleAddBookListItem={handleAddBookListItem} 
        />
        <div className={styles.BookListMain}>
          <BookList 
            todoList={incompletedList} 
            toggleTodoListItemStatus={toggleBookListItemStatus} 
            deleteTodoListItem={deleteBookListItem} 
            UpdatetoggleBooksItem={UpdatetoggleBooksItem} 
            UpdateEdit={UpdateEdit} 
            title="書籍一覧" 
            as="h2" 
          />
          <BooksLending 
            bookList={completedList}
            toggleBookListItemStatus={toggleBookListItemStatus} 
            title="貸出中" 
            as="h2" 
          />
        </div>
      </div>
    </div>
  );
}

export default App;