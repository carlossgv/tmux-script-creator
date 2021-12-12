import { Session, Window, Pane } from '../Main/Main';

export const buildScript = (session: Session): string => {
  let script: string = '';
  script += buildHeader(session.name);
  script += buildBody(session.windows);
  script += buildFooter();

  return script;
};

const buildHeader = (sessionName: string): string => {
  let header = `#!/bin/bash\n\n`;

  header += `SESSION="${sessionName}"\n`;
  header += `SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)\n\n`;
  header += `if [ "$SESSIONEXISTS" = "" ]\nthen\n\n`;
  header += `tmux new-session -d -s $SESSION\n\n`;

  return header;
};

const buildBody = (windows: Window[]): string => {
  let body = '';
  windows.forEach((window, index) => {
    if (index === 0) {
      body += `tmux rename-window -t 0 '${window.name}'\n`;
      window.panes.forEach((pane) => {
        pane.commands.forEach((command) => {
          body += `tmux send-keys -t '${windows[0].name}' '${command}' C-m\n`;
        });

        if (pane.finalCommand) {
          body += `tmux ${pane.finalCommand}\n\n`;
        }
      });
    } else {
      body += `tmux new-window -t $SESSION:${index} -n '${window.name}'\n`;
      window.panes.forEach((pane) => {
        pane.commands.forEach((command) => {
          body += `tmux send-keys -t '${window.name}' '${command}' C-m\n`;
        });

        if (pane.finalCommand) {
          body += `tmux ${pane.finalCommand}\n`;
        }
      });
    }
    body += '\n';
  });

  return body;
};

const buildFooter = (): string => {
  return `tmux attach-se\n`;
};
