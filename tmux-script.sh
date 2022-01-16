#!/bin/bash

SESSION="Tmux SC"
SESSIONEXISTS=$(tmux list-sessions | grep -w "$SESSION")

if [ "$SESSIONEXISTS" = "" ]
then

  tmux new-session -d -s "$SESSION" -d -x "$(tput cols)" -y "$(tput lines)"

  tmux rename-window -t 0 'Aux'
  tmux send-keys -t 'Aux' 'clear' C-m
  tmux splitw -h

  tmux send-keys -t 'Aux' 'npm run dev' C-m


  tmux new-window -t "$SESSION":1 -n 'Code'
  tmux send-keys -t 'Code' 'vim' C-m
  tmux select-pane -t 0

fi

tmux attach-session -t "$SESSION":0

