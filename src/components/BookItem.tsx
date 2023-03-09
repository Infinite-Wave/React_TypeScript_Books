import { Book } from "../types/Book";
import React, { ChangeEvent, useState } from "react";
import styles from "../styles.module.scss"

type BooksItem = {
  book: Book; 
  toggleBookListItemStatus: (id:string, done:boolean) => void; 
  deleteBookListItem: (id:string) => void; 
  UpdatetoggleBooksItem: (id:string, description:string) => void; 
  UpdateEdit: (id:string, edit:boolean) => void;
}

export const BookItem = ({ book, toggleBookListItemStatus, deleteBookListItem, UpdatetoggleBooksItem, UpdateEdit }: BooksItem) => {
  const [editDescription, setEditDescription] = useState(book.description);
  const handleToggleTodoListItemStatus = () => toggleBookListItemStatus(book.id, book.done);
  const handleDeleteTodoListItem = () => deleteBookListItem(book.id);
  const handleUpdateEdit = () => UpdateEdit(book.id, book.edit);


  
    const changeContent = (e:ChangeEvent<HTMLInputElement>) => {
        setEditDescription(e.target.value);
    }

    const changeKeyDown = (key:string) => {
        if(key === "Enter") {
            UpdatetoggleBooksItem(book.id, editDescription)
        }
        return null;
    }

  const confirmContent = (e:any) => {
    e.preventDefault();
  }

  return (
    <>
      <div className={styles.booksinfo}>
        <p className={styles.Itemhead}>書籍名</p><br/>
        {book.name}  
        <form onSubmit={confirmContent}>
        <p className={styles.Itemhead}>概要</p><br/>
        {book.edit ? (
              <input type="text" value={editDescription} onKeyDown={(e) => changeKeyDown(e.key)} onChange={changeContent}></input>
          ):(
              <span onDoubleClick={handleUpdateEdit}>{book.description}</span>
        )}
        </form>
        <div className={styles.booksinfo_button}>
          <button className={styles.lendButton} onClick={handleToggleTodoListItemStatus}>{book.done ? null : "貸し出す"}</button>
          <button className={styles.deleteButton} onClick={handleDeleteTodoListItem}>削除</button>
        </div>
        <hr/>
      </div>
    </>
  );
};