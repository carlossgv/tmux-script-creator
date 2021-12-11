import { TextField } from '@mui/material';

const Pane = ({ commands }: { commands: Array<string> }) => {
  return (
    <div>
      <TextField
        type="text"
        label="Session Name"
        name="name"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default Pane;
