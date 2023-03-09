import { BookTitle } from "./BookTitle";
import { Lending } from "./Lending";
import { Book } from "../types/Book";
import styles from "../styles.module.scss"

// Itemをループして表示
// Listが0件の場合、タイトルとリストを表示しない
export const BooksLending = ({
  bookList,
  toggleBookListItemStatus,
  title,
  as,
}: {
  bookList: Book[];
  toggleBookListItemStatus: (id: string, status: boolean) => void;
  title: string;
  as: string;
}) => {
  return (
    <div className={styles.BooksLending}>
      {bookList.length !== 0 ? (
        <>
          <div className={styles.listName}>
            <BookTitle title={title} as={as} />
          </div>
          <ul>
            {bookList.map((book) => (
              <li key={book.id}>
                <Lending book={book} key={book.id} toggleBookListItemStatus={toggleBookListItemStatus}  />
              </li>
            ))}
          </ul>
        </>
      ):
        <>
          <div className={styles.listName}>
            <BookTitle title={title} as={as} />
          </div>
          <p className={styles.listNone}>貸出記録なし</p>
        </>
    
    }
    </div>
  );
};