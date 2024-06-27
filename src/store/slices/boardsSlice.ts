import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TDeleteListsAction = {
  boardId: string;
  listId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'Task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'Hojun',
            },
            {
              taskId: 'Task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'Hojun',
            },
            {
              taskId: 'Task-2',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'Hojun',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'Task-3',
              taskName: 'Task 4',
              taskDescription: 'Description',
              taskOwner: 'Hojun',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map(list =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.push(payload.task),
                    }
                  : list
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map(list =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map(task =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map(list =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        task => task.taskId !== payload.taskId
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListsAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(list => list.listId !== payload.listId),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const {
  addBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
