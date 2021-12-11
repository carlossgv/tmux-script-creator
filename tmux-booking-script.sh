#!/bin/sh

# Set Session Name
SESSION="booking"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

# Only create tmux session if it doesn't already exist
if [ "$SESSIONEXISTS" = "" ]
then
    # Start New Session with our name
    tmux new-session -d -s $SESSION

    # Name first Pane and start zsh
    tmux rename-window -t 0 'Aux'
    tmux send-keys -t 'Aux' 'zsh' C-m 'clear' C-m
    tmux send-keys -t 'Aux' 'tmux source ~/.config/tmux/tmux.conf' C-m 'clear' C-m 
    tmux send-keys -t 'Aux' 'vim' C-m ':q' C-m

    tmux new-window -t $SESSION:1 -n 'Front'
    tmux send-keys -t 'Front' 'cd ~/projects/booking-app/booking-app-front; npm run dev' C-m 

    tmux new-window -t $SESSION:2 -n 'Back'
    tmux send-keys -t 'Back' 'cd  ~/projects/booking-app/booking-app-back; docker-compose up' C-m 
    tmux splitw -h 
    tmux send-keys -t 'Back' 'cd  ~/projects/booking-app/booking-app-back; npm run start:dev' C-m 

    tmux new-window -t $SESSION:3 -n 'Auth'
    tmux send-keys -t 'Auth' 'cd ~/projects/booking-app/booking-app-auth; docker-compose up' C-m 
    tmux splitw -h 
    tmux send-keys -t 'Auth' 'cd ~/projects/booking-app/booking-app-auth; npm run start:dev' C-m 
fi

# Attach Session, on the Main window
tmux attach-se