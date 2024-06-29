import clsx from 'clsx';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { FC, useRef, useState } from 'react';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';

import { app } from '../../firebase';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import { removeUser, setUser } from '../../store/slices/userSlice';
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from './BoardList.css';
import SideForm from './SideForm/SideForm';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const dispatch = useTypedDispatch();
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFromOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAuth } = useAuth();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    setIsFromOpen(!isFormOpen);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(userCredential => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch(error => {
        console.error(error);
      });
  };

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
          <SideForm inputRef={inputRef} setIsFormOpen={setIsFromOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
