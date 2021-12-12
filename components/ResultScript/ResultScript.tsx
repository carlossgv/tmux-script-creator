/* eslint-disable react/no-unescaped-entities */

import { Button, Paper, TextareaAutosize } from '@mui/material';
import React, { useEffect } from 'react';
import { welcomeScript } from '../../welcomeScript';
import { Session } from '../Main/Main';
import styles from './ResultScript.module.css';
import { buildScript } from './scriptBuilder';

const ResultScript = ({ session }: { session: Session }) => {
  const [script, setScript] = React.useState<string>(welcomeScript);

  const handleBuildScript = () => {
    const newScript = buildScript(session);
    setScript(newScript);
  };

  return (
    <Paper elevation={8} className={styles.root}>
      <TextareaAutosize value={script} minRows={45} />
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuildScript}
          className={styles.button}
        >
          Show Script!
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setScript(welcomeScript)}
          className={styles.button}
        >
          Show Instructions
        </Button>
      </div>
    </Paper>
  );
};

export default ResultScript;
