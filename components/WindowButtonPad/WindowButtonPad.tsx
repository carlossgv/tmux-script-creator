import { Button } from '@mui/material';
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
} from 'react';
import { useState } from 'react';
import { Window } from '../Main/Main';
import WindowButton from '../WindowButton/WindowButton';

const WindowButtonPad = ({
  buttonsData,
  handleClick,
  handleRemoveWindow,
  handleRenameWindow,
  activeWindow,
}: {
  buttonsData: Array<Window>;
  activeWindow: number;
  handleClick: MouseEventHandler;
  handleRemoveWindow: MouseEventHandler;
  handleRenameWindow: ChangeEventHandler;
}) => {
  const [buttons, setButtons] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    setButtons(
      buttonsData.map((window, index) => (
        <WindowButton
          index={index}
          key={index}
          name={window.name}
          handleOnClick={handleRemoveWindow}
          handleChange={handleRenameWindow}
          isActive={activeWindow === window.id}
        />
      ))
    );
  }, [activeWindow, buttonsData, handleRemoveWindow, handleRenameWindow]);

  return (
    <>
      {buttons}
      <Button onClick={handleClick} variant="contained">
        Add new window
      </Button>
    </>
  );
};

export default WindowButtonPad;
