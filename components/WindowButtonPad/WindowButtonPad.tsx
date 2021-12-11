import { Button } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import WindowButton from '../WindowButton/WindowButton';

const WindowButtonPad = ({ buttonsData }: { buttonsData: Array<string> }) => {
  const [buttonList, setButtonList] = React.useState<FC[WindowButton]>([]);

  useEffect(() => {
    setButtonList(
      buttonsData.map((button, index) => (
        <WindowButton index={index} key={index} name={button} />
      ))
    );
  }, [buttonsData]);

  return (
    <>
      {buttonList}
      <Button variant="contained">Add new window</Button>
    </>
  );
};

export default WindowButtonPad;
