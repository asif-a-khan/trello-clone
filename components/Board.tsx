'use client'
import { useBoardStore } from "@/store/boardStore"
import { useEffect } from "react"
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import Column from "./Column"
import { handleOnDragEnd } from "@/util/handleOnDragEnd"

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(state => [
    state.board, 
    state.getBoard, 
    state.setBoardState, 
    state.updateTodoInDB
  ])

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return (
    <DragDropContext onDragEnd={(e) => handleOnDragEnd(e, board, setBoardState, updateTodoInDB)}>
      <Droppable 
        droppableId="board" 
        direction="horizontal"
        type="column"
      >
        {(provided) => 
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                id={id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        }
      </Droppable>
    </DragDropContext>
  )
}

export default Board