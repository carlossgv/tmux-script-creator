import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './WindowButton.module.css';

const WindowButton = ({
  name,
  index,
  handleOnClick,
  handleChange,
  isActive,
}: {
  isActive: boolean;
  name: string;
  index: number;
  handleOnClick: MouseEventHandler;
  handleChange: ChangeEventHandler;
}) => {
  const activeClass: string = isActive ? styles.active : '';

  return (
    <div
      className={`${styles.window} ${activeClass}`}
      id={`window_tab_${index}`}
    >
      <TextField
        type="text"
        label="Window Name"
        name={`window_${index}`}
        value={name}
        onChange={handleChange}
        onFocus={handleChange}
        required
        size="small"
      />
      <Button
        variant="outlined"
        onClick={handleOnClick}
        style={{ height: '100%' }}
      >
        Remove window
      </Button>
    </div>
  );
};

export default WindowButton;
