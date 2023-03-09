import { Book } from "../types/Book";
import styles from "../styles.module.scss"

type Lend = {
    book: Book ,
    toggleBookListItemStatus: (id:string, done:boolean) => void
}

// 1つのTodo、内容と移動・削除ボタン
export const Lending = ({ book, toggleBookListItemStatus}: Lend) => {
  // onClickイベントが発生したら、useBookフックを呼び出す
  const handleToggleBookListItemStatus = () => {
    toggleBookListItemStatus(book.id, book.done);
  } 

  return (
    <div className={styles.booksinfo}>
        <p className={styles.Itemhead}>書籍名</p><br/>
        {book.name} <br/>
      <div className={styles.booksinfo_button}>
        <button className={styles.returnbooksButton} onClick={handleToggleBookListItemStatus}>{book.done ? "返却確認済み" : "貸し出す"}</button>
      </div>
      <hr/>
    </div>
  );
};