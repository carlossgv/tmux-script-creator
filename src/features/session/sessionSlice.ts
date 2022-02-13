import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';
import { Window } from '../../components/WindowComponent/Window.interface';

export interface Session {
  name: string;
  windows: Window[];
}

export interface SessionState {
  session: Session;
}

export enum Layout {
  Pane1 = 'One Panel',
  Pane2V = 'Two Panes Vertical',
  Pane2H = 'Two Panes Horizontal',
  Pane3V = 'Three Panes Vertical',
  Pane3V12 = 'Three Panes V: 1-2',
  Pane3V21 = 'Three Panes V: 2-1',
  Pane3H12 = 'Three Panes H: 1-2',
  Pane3H21 = 'Three Panes H: 2-1',
  Pane4 = 'Four Panes',
}

const emptySession: Session = {
  name: '',
  windows: [
    {
      id: 0,
      name: 'window 0',
      panes: [
        {
          commands: '',
          xCoordinate: 0,
          yCoordinate: 0,
          width: 1,
          height: 1,
        },
      ],
      layout: Layout.Pane1,
    },
  ],
};

const savedSession = getCookie('session')
  ? //@ts-ignore: null possibility handled properly
    JSON.parse(getCookie('session'))
  : emptySession;

const initialState: SessionState = {
  session: savedSession || emptySession,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetSession: (state) => {
      state.session = emptySession;
      window.location.reload();
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { resetSession } = sessionSlice.actions;

export default sessionSlice.reducer;
