import { Session } from '../Main/Main';
import { Pane } from '../PaneComponent/pane.interface';
import { Window } from '../WindowComponent/Window.interface';

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
  header += `SESSIONEXISTS=$(tmux list-sessions | grep -w "$SESSION")\n\n`;
  header += `if [ "$SESSIONEXISTS" = "" ]\nthen\n\n`;
  header += `  tmux new-session -d -s "$SESSION" -d -x "$(tput cols)" -y "$(tput lines)"\n\n`;

  return header;
};

const buildBody = (windows: Window[]): string => {
  let body = '';
  windows.forEach((window, index) => {
    if (index === 0) {
      body += `  tmux rename-window -t 0 '${window.name}'\n`;
      window.panes.forEach((pane: Pane) => {
        const commandsList = pane.commands.split(/\r?\n/);

        commandsList.forEach((command) => {
          body += `  tmux send-keys -t '${windows[0].name}' '${command}' C-m\n`;
        });
        if (pane.finalCommands && pane.finalCommands.length > 0) {
          pane.finalCommands.forEach((command) => {
            body += `  tmux ${command}\n`;
          });
        }
        body += '\n';
      });
      body += `  tmux select-pane -t 0\n`;
    } else {
      body += `  tmux new-window -t "$SESSION":${index} -n '${window.name}'\n`;
      window.panes.forEach((pane: Pane) => {
        const commandsList = pane.commands.split(/\r?\n/);
        commandsList.forEach((command) => {
          body += `  tmux send-keys -t '${window.name}' '${command}' C-m\n`;
        });

        if (pane.finalCommands && pane.finalCommands.length > 0) {
          pane.finalCommands.forEach((command) => {
            body += `  tmux ${command}\n`;
          });
        }
      });
      body += `  tmux select-pane -t 0\n`;
    }
    body += '\n';
  });
  body += 'fi\n\n';

  return body;
};

const buildFooter = (): string => {
  return `tmux attach-session -t "$SESSION":0\n`;
};
