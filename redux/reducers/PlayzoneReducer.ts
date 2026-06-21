import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CHANGE_BUTTON_LOCK_STATUS,
  CHANGE_PAUSE_STATUS,
  CURRENT_GRID_UPDATE,
  DELETE_ACTION_HISTORY,
  FORM_THE_GAME_PATTERN,
  GRID_UPDATE,
  INCREASE_MISTAKE_COUNT,
  INSERT_ACTION_HISTORY,
  SELECTED_BUTTON_UPDATE,
  UPDATE_ASYNCSTORAGE_FOR_NEW_GAME,
  UPDATE_FROM_LAST_PLAYED_GAME,
  UPDATE_REMAINING_NUMS_LIST,
  UPDATE_SELECTED_SMALL_SQUARE_INDEX,
  UPDATE_USER_INFO,
  PlayzoneState,
  PlayzoneAction,
} from '../types';

const initialState: PlayzoneState = {
  grid: [[]],
  current_playing_grid: [[]],
  is_editable: [[]],
  remainingNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  mistakes: 0,
  is_paused: false,
  action_history: [],
  is_Num_Button_Locked: false,
  selected_Button: 0,
  selected_small_square_index: 0,
  selected_small_square_value: 0,
  matched_all_squares: false,
  currentPlayer_info: {
    userRef: '',
    userProfilePic: '',
    userName: '',
    userEmail: '',
  },
};

export const PlayzoneReducer = (
  state: PlayzoneState = initialState,
  action: PlayzoneAction | { type: unknown }
): PlayzoneState => {
  const typedAction = action as PlayzoneAction;

  switch (typedAction.type) {
    // New Game Creation Reducers
    case GRID_UPDATE: {
      const gridAction = typedAction as any;
      return {
        ...state,
        grid: gridAction.new_game,
        action_history: [],
        mistakes: 0,
        is_paused: false,
        selected_Button: 0,
        is_Num_Button_Locked: false,
        selected_small_square_index: 0,
        selected_small_square_value: 0,
        matched_all_squares: false,
      };
    }

    case FORM_THE_GAME_PATTERN: {
      const patternAction = typedAction as any;
      return {
        ...state,
        current_playing_grid: patternAction.game,
        is_editable: patternAction.is_editable,
      };
    }

    case UPDATE_REMAINING_NUMS_LIST: {
      const temp_remaining_num_list = Array(10).fill(0);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (state.grid[i][j] === state.current_playing_grid[i][j]) {
            temp_remaining_num_list[state.grid[i][j]]++;
          }
        }
      }
      const updated_remaining_nums = temp_remaining_num_list.map((val) => 9 - val);

      return {
        ...state,
        remainingNums: updated_remaining_nums,
      };
    }

    case SELECTED_BUTTON_UPDATE: {
      const buttonAction = typedAction as any;
      return {
        ...state,
        selected_Button: buttonAction.button_id,
      };
    }

    case CHANGE_BUTTON_LOCK_STATUS: {
      const lockAction = typedAction as any;
      return {
        ...state,
        is_Num_Button_Locked: lockAction.val,
      };
    }

    case UPDATE_SELECTED_SMALL_SQUARE_INDEX: {
      const indexAction = typedAction as any;
      const row = indexAction.val ? (Math.floor(indexAction.val / 10) % 10) - 1 : 0;
      const col = indexAction.val ? (indexAction.val % 10) - 1 : 0;
      const value = indexAction.val ? state.current_playing_grid[row][col] : 0;

      return {
        ...state,
        selected_small_square_index: indexAction.val,
        selected_small_square_value: value,
      };
    }

    case CURRENT_GRID_UPDATE: {
      const updateAction = typedAction as any;
      const temp_grid = state.current_playing_grid.map((row) => [...row]);
      const row = updateAction.index.row;
      const col = updateAction.index.col;
      temp_grid[row][col] = updateAction.val * 1;
      const matched = JSON.stringify(temp_grid) === JSON.stringify(state.grid);

      if (matched) {
        AsyncStorage.removeItem('gameData');
      } else {
        const gameData = {
          grid: state.grid,
          current_playing_grid: temp_grid,
          is_editable: state.is_editable,
          mistakes: state.mistakes,
          matched_all_squares: matched,
        };
        AsyncStorage.setItem('gameData', JSON.stringify(gameData));
      }

      const temp_remaining_num_list = Array(10).fill(0);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (state.grid[i][j] === temp_grid[i][j]) {
            temp_remaining_num_list[temp_grid[i][j]]++;
          }
        }
      }
      const updated_remaining_nums = temp_remaining_num_list.map((val) => 9 - val);

      return {
        ...state,
        current_playing_grid: temp_grid,
        matched_all_squares: matched,
        remainingNums: updated_remaining_nums,
      };
    }

    case INSERT_ACTION_HISTORY: {
      const historyAction = typedAction as any;
      const temp_action_history = [...state.action_history];
      temp_action_history.push({ index: historyAction.index, val: historyAction.val });

      return {
        ...state,
        action_history: temp_action_history,
      };
    }

    case DELETE_ACTION_HISTORY: {
      const temp_action_history = [...state.action_history];
      const size = temp_action_history.length;
      if (size > 0) {
        const id = temp_action_history[size - 1].index;
        const val = temp_action_history[size - 1].val;
        const row = (Math.floor(id / 10) % 10) - 1;
        const col = (id % 10) - 1;
        const temp_grid = state.current_playing_grid.map((r) => [...r]);
        temp_grid[row][col] = val;
        temp_action_history.pop();

        return {
          ...state,
          action_history: temp_action_history,
          current_playing_grid: temp_grid,
        };
      }
      return state;
    }

    case INCREASE_MISTAKE_COUNT: {
      const gameData = {
        grid: state.grid,
        current_playing_grid: state.current_playing_grid,
        is_editable: state.is_editable,
        mistakes: state.mistakes + 1,
        matched_all_squares: state.matched_all_squares,
      };
      const gameDataString = JSON.stringify(gameData);
      AsyncStorage.setItem('gameData', gameDataString);

      if (state.mistakes === 4) {
        AsyncStorage.removeItem('gameData');
      }

      return {
        ...state,
        mistakes: state.mistakes + 1,
      };
    }

    case CHANGE_PAUSE_STATUS: {
      return {
        ...state,
        is_paused: !state.is_paused,
      };
    }

    case UPDATE_USER_INFO: {
      const userAction = typedAction as any;
      return {
        ...state,
        currentPlayer_info: userAction.userInfo,
      };
    }

    case UPDATE_FROM_LAST_PLAYED_GAME: {
      const gameAction = typedAction as any;
      const { grid, current_playing_grid, is_editable, mistakes, matched_all_squares } =
        gameAction.gameData;

      return {
        ...state,
        grid: grid,
        current_playing_grid: current_playing_grid,
        is_editable: is_editable,
        mistakes: mistakes,
        matched_all_squares: matched_all_squares,
      };
    }

    case UPDATE_ASYNCSTORAGE_FOR_NEW_GAME: {
      const gameData = {
        grid: state.grid,
        current_playing_grid: state.current_playing_grid,
        is_editable: state.is_editable,
        mistakes: 0,
        matched_all_squares: false,
      };
      const gameDataString = JSON.stringify(gameData);
      AsyncStorage.removeItem('gameData');
      AsyncStorage.setItem('gameData', gameDataString);

      return state;
    }

    default:
      return state;
  }
};
