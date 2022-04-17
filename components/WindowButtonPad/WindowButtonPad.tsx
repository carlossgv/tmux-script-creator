import { Button } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import WindowButton from '../WindowButton/WindowButton';
import { Window } from '../WindowComponent/Window.interface';

const WindowButtonPad = ({
  buttonsData,
  addNewWindow,
  handleRemoveWindow,
  handleRenameWindow,
  activeWindow,
}: {
  buttonsData: Window[];
  activeWindow: number;
  addNewWindow: MouseEventHandler;
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
      <Button
        style={{ marginLeft: '5px' }}
        onClick={addNewWindow}
        variant="contained"
      >
        Add new window
      </Button>
    </>
  );
};

export default WindowButtonPad;
