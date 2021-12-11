import { TextField } from '@mui/material';
import React from 'react';
import { FC } from 'react';

type Window = {
  name: string;
  panes: Pane[];
};

type Pane = {
  commands: string[];
};

const Main: FC = () => {
  const [sessionState, setSessionState] = React.useState({
    name: '',
    windows: [{ name: '', panes: [{ commands: [] }] }],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionState({
      ...sessionState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div>
        <TextField
          type="text"
          label="Session Name"
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};

export default Main;
