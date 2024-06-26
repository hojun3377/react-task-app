import { FC } from 'react';

import { IList } from '../../types';
import List from '../List/List';
import { listsContainer } from './ListsContainer.css';

type TListsContainerProps = {
  lists: IList[];
  boardId: string;
};

const ListsContainer: FC<TListsContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listsContainer}>
      {lists.map(list => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
    </div>
  );
};

export default ListsContainer;
