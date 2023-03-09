import { BookTitle } from "./BookTitle";
import { BookItem } from "./BookItem";
import { Book } from "../types/Book";
import styles from "../styles.module.scss"

// TodoItemをループして表示
// todoListが0件の場合、タイトルとTODOリストを表示しない
type List = {
  todoList: Book[];
  toggleTodoListItemStatus: (id: string, status: boolean) => void;
  deleteTodoListItem: (id: string) => void;
  UpdatetoggleBooksItem: (id: string,description: string) => void; 
  UpdateEdit: (id:string, status: boolean) => void;
  title: string;
  as: string;
}

export const BookList = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  UpdatetoggleBooksItem,
  UpdateEdit,
  title,
  as,
}: List

) => {
  return (
    <div className={styles.BooksList}>
      {todoList.length !== 0 ? (
        <>
          <div className={styles.listName}>
            <BookTitle title={title} as={as} />
          </div>
          <ul>
            {todoList.map((todo) => (
              <li key={todo.id}>
                <BookItem book={todo} key={todo.id} toggleBookListItemStatus={toggleTodoListItemStatus} deleteBookListItem={deleteTodoListItem} UpdatetoggleBooksItem={UpdatetoggleBooksItem} UpdateEdit={UpdateEdit} />
              </li>
            ))}
          </ul>
        </>
      ):         
        <>
          <div className={styles.listName}>
            <BookTitle title={title} as={as} />
          </div>
          <p className={styles.listNone}>登録書籍なし</p>
        </>
    }
    </div>
  );
};