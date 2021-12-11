/* eslint-disable react/no-unescaped-entities */

import { TextareaAutosize } from '@mui/material';
import React, { useEffect } from 'react';

const ResultScript = ({ session }: { session: any }) => {
  const [script, setScript] = React.useState(``);

  useEffect(() => {
    const scriptText = `#!/bin/sh\nSESSION="${session.name}"\nSESSIONEXISTS=$(tmux list-sessions | grep $SESSION)\n\nif["$SESSIONEXISTS" = ""]\nthen\nfi\n\ntmux attach-se`;
    setScript(scriptText);
  }, [session]);

  return (
    <div>
      <TextareaAutosize value={script} />
    </div>
  );
};

export default ResultScript;
