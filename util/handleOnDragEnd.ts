import { DropResult } from "react-beautiful-dnd"

export const handleOnDragEnd = (
    result: DropResult, 
    board: Board, 
    setBoardState: (board: Board) => void, 
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
  ) => {
  const { destination, source, type } = result

  // Handle column drag
  if (!destination) return

  if (type === 'column') {
    const entries = Array.from(board.columns.entries())
    const [removed] = entries.splice(source.index, 1)
    entries.splice(destination.index, 0, removed)
    const rearrangedColumns = new Map(entries)
    setBoardState({
      ...board,
      columns: rearrangedColumns
    })
  }

  // Handle todo drag
  const columns = Array.from(board.columns)
  const startColIndex = columns[Number(source.droppableId)]
  const finishColIndex = columns[Number(destination.droppableId)]

  const startCol: Column = {
    id: startColIndex[0],
    todos: startColIndex[1].todos
  }

  const finishCol: Column = {
    id: finishColIndex[0],
    todos: finishColIndex[1].todos
  }

  if (!startCol || !finishCol) return
  if (source.index === destination.index && startCol === finishCol) return

  const newTodos = startCol.todos
  const [todoMoved] = newTodos.splice(source.index, 1)

  if (startCol.id === finishCol.id) {
    // Move a todo within the same column
    newTodos.splice(destination.index, 0, todoMoved)
    const newCol = {
      id: startCol.id,
      todos: newTodos
    }
    const newColumns = new Map(board.columns)
    newColumns.set(startCol.id, newCol)

    setBoardState({ ...board, columns: newColumns })
  } else {
    // Move a todo to a different column
    const finishTodos = Array.from(finishCol.todos)
    finishTodos.splice(destination.index, 0, todoMoved)

    const newColumns = new Map(board.columns)
    const newCol = {
      id: startCol.id,
      todos: newTodos
    }
    newColumns.set(startCol.id, newCol)
    newColumns.set(finishCol.id, {
      id: finishCol.id,
      todos: finishTodos
    })

    // Update in db
    updateTodoInDB(todoMoved, finishCol.id)

    setBoardState({ ...board, columns: newColumns })
  }
}