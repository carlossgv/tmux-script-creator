/* eslint-disable react/no-unescaped-entities */

import { Button, Paper, TextareaAutosize } from '@mui/material';
import React, { useEffect } from 'react';
import { Session } from '../Main/Main';
import styles from './ResultScript.module.css';
import { buildScript } from './scriptBuilder';

const ResultScript = ({ session }: { session: Session }) => {
  const [script, setScript] = React.useState(``);

  useEffect(() => {
    const scriptText = buildScript(session);
    setScript(scriptText);
  }, [session]);

  return (
    <Paper elevation={8} className={styles.root}>
      <TextareaAutosize value={script} minRows={45} />
      <Button variant="contained" color="primary">
        Get Script!
      </Button>
    </Paper>
  );
};

export default ResultScript;
