#!/bin/bash

SESSION="4"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

if [ "$SESSIONEXISTS" = "" ]
then

tmux new-session -d -s $SESSION

  tmux rename-window -t 0 'window 0'
  tmux send-keys -t 'window 0' '11' C-m
  tmux splitw -h

  tmux send-keys -t 'window 0' '22' C-m
  tmux splitw -v

  tmux send-keys -t 'window 0' '44' C-m
  tmux select-pane -t 0
  tmux splitw -v

  tmux send-keys -t 'window 0' '33' C-m


fi

tmux attach-se