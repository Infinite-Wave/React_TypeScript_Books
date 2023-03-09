
import { RefObject } from "react";
import styles from "../styles.module.scss"

type AddBooks = {
  buttonText: string; 
  inputEl: RefObject<HTMLTextAreaElement>; 
  inputText: RefObject<HTMLInputElement>; 
  handleAddBookListItem: () => void
}

export const BookAdd = ({ buttonText, inputEl, inputText, handleAddBookListItem }: AddBooks) => {
  return (
    <div className={styles.BookAdd}>
      <div className={styles.input_bookname}>
          <input ref={inputText} placeholder="書籍名" /><br/>
      </div>

      <textarea placeholder="書籍の概要" ref={inputEl} /><br/>
      <button className={styles.newItemButton} onClick={handleAddBookListItem}>{buttonText}</button>
    </div>
  );
};
