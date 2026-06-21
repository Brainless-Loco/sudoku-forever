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
  PlayzoneAction,
  UserInfo,
} from '../types';

function randomNumber(min: number, max: number, integer: boolean = true): number {
  const result = Math.random() * (max - min) + min;
  return integer ? Math.floor(result) : result;
}

export const gridUpdate = (grid: number[][]): PlayzoneAction => {
  return {
    type: GRID_UPDATE,
    new_game: grid,
  };
};

export const game_pattern_formation = (props: {
  pattern: number[][];
  gameLevel: number;
}): PlayzoneAction => {
  const { pattern, gameLevel } = props;
  const minErase = gameLevel === 3 ? 55 : gameLevel === 2 ? 40 : 30;
  const maxErase = gameLevel === 3 ? 65 : gameLevel === 2 ? 50 : 40;

  let total_erase = randomNumber(minErase, maxErase, true);
  const is_editable_matrix = Array.from(Array(9), () => new Array(9).fill(false));

  while (total_erase > 0) {
    const id = randomNumber(11, 99, true);
    const row = (Math.floor(id / 10) % 10) - 1;
    const col = (id % 10) - 1;

    if (pattern[row] && pattern[row][col]) {
      total_erase--;
      pattern[row][col] = 0;
      is_editable_matrix[row][col] = true;
    }
  }

  return {
    type: FORM_THE_GAME_PATTERN,
    game: pattern,
    is_editable: is_editable_matrix,
  };
};

export const selected_Button_update = (btn_id: number): PlayzoneAction => {
  return {
    type: SELECTED_BUTTON_UPDATE,
    button_id: btn_id,
  };
};

export const current_grid_update = (id: number, value: number): PlayzoneAction => {
  const row = (Math.floor(id / 10)) % 10;
  const col = id % 10;
  return {
    type: CURRENT_GRID_UPDATE,
    index: {
      row: row - 1,
      col: col - 1,
    },
    val: value,
  };
};

export const change_button_lock_status = (new_status: boolean): PlayzoneAction => {
  return {
    type: CHANGE_BUTTON_LOCK_STATUS,
    val: new_status,
  };
};

export const update_selected_small_square_index = (id: number): PlayzoneAction => {
  return {
    type: UPDATE_SELECTED_SMALL_SQUARE_INDEX,
    val: id,
  };
};

export const insert_action_history = (id: number, value: number): PlayzoneAction => {
  return {
    type: INSERT_ACTION_HISTORY,
    index: id,
    val: value,
  };
};

export const undo_from_action_history = (): PlayzoneAction => {
  return {
    type: DELETE_ACTION_HISTORY,
  };
};

export const increase_mistake_count = (): PlayzoneAction => {
  return {
    type: INCREASE_MISTAKE_COUNT,
  };
};

export const change_pause_status = (): PlayzoneAction => {
  return {
    type: CHANGE_PAUSE_STATUS,
  };
};

export const updateUserInfo = (info: UserInfo): PlayzoneAction => {
  return {
    type: UPDATE_USER_INFO,
    userInfo: info,
  };
};

export const update_from_last_saved_game = (gameData: {
  grid: number[][];
  current_playing_grid: number[][];
  is_editable: boolean[][];
  mistakes: number;
  matched_all_squares: boolean;
}): PlayzoneAction => {
  return {
    type: UPDATE_FROM_LAST_PLAYED_GAME,
    gameData: gameData,
  };
};

export const update_asyncstorage_for_a_new_game = (): PlayzoneAction => {
  return {
    type: UPDATE_ASYNCSTORAGE_FOR_NEW_GAME,
  };
};

export const update_remaining_num_list = (): PlayzoneAction => {
  return {
    type: UPDATE_REMAINING_NUMS_LIST,
  };
};
