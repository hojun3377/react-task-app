import React, { ChangeEvent, FC, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { input, sideForm, icon } from './SideForm.css';

type TSideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<TSideFormProps> = ({ inputRef, setIsFormOpen }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        // autoFocus
        ref={inputRef}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} />
    </div>
  );
};

export default SideForm;
