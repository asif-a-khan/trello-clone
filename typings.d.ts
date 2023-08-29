interface Board {
  columns: Map<TypedColumn, Column>
}

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  newTaskType: TypedColumn;
  newTaskInput: string;
  image: File | null;
  
  searchString: string;
  setSearchString: (searchString: string) => void;

  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (todoIndex: number, todoId: Todo, id: TypedColumn) => void;
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  countTodos: (columnId: TypedColumn) => number;

  setNewTaskType: (columnId: TypedColumn) => void;
  setNewTaskInput: (input: string) => void;
  setImage: (image: File | null) => void;
  setSearchString: (searchString: string) => void;
}

interface Image {
  bucketId: string;
  fileId: string;
}

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
  id: TypedColumn;
  todos: Todo[]
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string
}