/* eslint-disable react/no-unescaped-entities */

import { Button, Paper, TextareaAutosize } from '@mui/material';
import React, { useEffect } from 'react';
import { Session } from '../Main/Main';
import styles from './ResultScript.module.css';

const ResultScript = ({ session }: { session: Session }) => {
  const [script, setScript] = React.useState(``);

  const buildHeader = (session: Session): string => {
    return `#!/bin/sh\nSESSION="${session.name}"\nSESSIONEXISTS=$(tmux list-sessions | grep $SESSION)\n\n`;
  };

  const buildBody = (session: Session): string => {
    let body = `if [ -z "$SESSIONEXISTS" ]; then\n  tmux new-session -s $SESSION\n`;
    body += `tmux rename-window -t 0 '${session.windows[0].name}'\n`;

    body += `fi\n\n`;

    return body;
  };

  const buildFooter = (session: Session): string => {
    return `tmux attach-se\n`;
  };

  useEffect(() => {
    const scriptText =
      buildHeader(session) + buildBody(session) + buildFooter(session);
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
