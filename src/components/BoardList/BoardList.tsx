import React, { FC, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import clsx from 'clsx';

import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from './BoardList.css';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFromOpen] = useState(false);

  return (
    <div className={container}>
      <div className={title}>게시판: </div>
      {boardArray.map((board, index) => (
        <div
          key={index}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(b => b.boardId === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boardArray.findIndex(b => b.boardId === activeBoardId) !==
                index,
            }
          )}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}>
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm />
        ) : (
          <FiPlusCircle
            className={addButton}
            onClick={() => setIsFromOpen(!isFormOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default BoardList;
