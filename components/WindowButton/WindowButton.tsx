import { Button, TextField } from '@mui/material';
import styles from './WindowButton.module.css';
const WindowButton = ({ name, index }: { name: string; index: number }) => {
  return (
    <div className={styles.window}>
      <TextField
        type="text"
        label="Window Name"
        name={`window_${index}`}
        value={name}
        required
      />
      <Button>Remove window</Button>
    </div>
  );
};

export default WindowButton;
