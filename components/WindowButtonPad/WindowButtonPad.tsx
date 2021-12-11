import { Button } from '@mui/material';
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
} from 'react';
import { useState } from 'react';
import WindowButton from '../WindowButton/WindowButton';

const WindowButtonPad = ({
  buttonsData,
  handleClick,
  handleRemoveWindow,
  handleRenameWindow,
}: {
  buttonsData: Array<string>;
  handleClick: MouseEventHandler;
  handleRemoveWindow: MouseEventHandler;
  handleRenameWindow: ChangeEventHandler;
}) => {
  const [buttons, setButtons] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    setButtons(
      buttonsData.map((button, index) => (
        <WindowButton
          index={index}
          key={index}
          name={button}
          handleOnClick={handleRemoveWindow}
          handleChange={handleRenameWindow}
        />
      ))
    );
  }, [buttonsData, handleRemoveWindow, handleRenameWindow]);

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
