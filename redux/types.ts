// Action Types
export const GRID_UPDATE = 'GRID_UPDATE';
export const SELECTED_BUTTON_UPDATE = 'SELECTED_BUTTON_UPDATE';
export const CURRENT_GRID_UPDATE = 'CURRENT_GRID_UPDATE';
export const CHANGE_BUTTON_LOCK_STATUS = 'CHANGE_BUTTON_LOCK_STATUS';
export const UPDATE_SELECTED_SMALL_SQUARE_INDEX = 'UPDATE_SELECTED_SMALL_SQUARE_INDEX';
export const INSERT_ACTION_HISTORY = 'INSERT_ACTION_HISTORY';
export const DELETE_ACTION_HISTORY = 'DELETE_ACTION_HISTORY';
export const FORM_THE_GAME_PATTERN = 'FORM_THE_GAME_PATTERN';
export const UPDATE_EDITABLE_STATUS_OF_AN_INDEX = 'UPDATE_EDITABLE_STATUS_OF_AN_INDEX';
export const INCREASE_MISTAKE_COUNT = 'INCREASE_MISTAKE_COUNT';
export const CHANGE_PAUSE_STATUS = 'CHANGE_PAUSE_STATUS';
export const UPDATE_TIME_STATUS = 'UPDATE_TIME_STATUS';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_FROM_LAST_PLAYED_GAME = 'UPDATE_FROM_LAST_PLAYED_GAME';
export const UPDATE_ASYNCSTORAGE_FOR_NEW_GAME = 'UPDATE_ASYNCSTORAGE_FOR_NEW_GAME';
export const UPDATE_REMAINING_NUMS_LIST = 'UPDATE_REMAINING_NUMS_LIST';

// Redux State Types
export interface ActionHistoryItem {
  index: number;
  val: number;
}

export interface UserInfo {
  userRef: string;
  userProfilePic: string;
  userName: string;
  userEmail: string;
}

export interface PlayzoneState {
  grid: number[][];
  current_playing_grid: number[][];
  is_editable: boolean[][];
  remainingNums: number[];
  mistakes: number;
  is_paused: boolean;
  action_history: ActionHistoryItem[];
  is_Num_Button_Locked: boolean;
  selected_Button: number;
  selected_small_square_index: number;
  selected_small_square_value: number;
  matched_all_squares: boolean;
  currentPlayer_info: UserInfo;
}

// Redux Action Types
export interface GridUpdateAction {
  type: typeof GRID_UPDATE;
  new_game: number[][];
}

export interface FormGamePatternAction {
  type: typeof FORM_THE_GAME_PATTERN;
  game: number[][];
  is_editable: boolean[][];
}

export interface CurrentGridUpdateAction {
  type: typeof CURRENT_GRID_UPDATE;
  index: { row: number; col: number };
  val: number;
}

export interface SelectedButtonUpdateAction {
  type: typeof SELECTED_BUTTON_UPDATE;
  button_id: number;
}

export interface ChangeButtonLockStatusAction {
  type: typeof CHANGE_BUTTON_LOCK_STATUS;
  val: boolean;
}

export interface UpdateSelectedSmallSquareIndexAction {
  type: typeof UPDATE_SELECTED_SMALL_SQUARE_INDEX;
  val: number;
}

export interface InsertActionHistoryAction {
  type: typeof INSERT_ACTION_HISTORY;
  index: number;
  val: number;
}

export interface DeleteActionHistoryAction {
  type: typeof DELETE_ACTION_HISTORY;
}

export interface UpdateRemainingNumsListAction {
  type: typeof UPDATE_REMAINING_NUMS_LIST;
}

export interface IncreaseMistakeCountAction {
  type: typeof INCREASE_MISTAKE_COUNT;
}

export interface ChangePauseStatusAction {
  type: typeof CHANGE_PAUSE_STATUS;
}

export interface UpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO;
  userInfo: UserInfo;
}

export interface UpdateFromLastPlayedGameAction {
  type: typeof UPDATE_FROM_LAST_PLAYED_GAME;
  gameData: {
    grid: number[][];
    current_playing_grid: number[][];
    is_editable: boolean[][];
    mistakes: number;
    matched_all_squares: boolean;
  };
}

export interface UpdateAsyncStorageForNewGameAction {
  type: typeof UPDATE_ASYNCSTORAGE_FOR_NEW_GAME;
}

export type PlayzoneAction =
  | GridUpdateAction
  | FormGamePatternAction
  | CurrentGridUpdateAction
  | SelectedButtonUpdateAction
  | ChangeButtonLockStatusAction
  | UpdateSelectedSmallSquareIndexAction
  | InsertActionHistoryAction
  | DeleteActionHistoryAction
  | UpdateRemainingNumsListAction
  | IncreaseMistakeCountAction
  | ChangePauseStatusAction
  | UpdateUserInfoAction
  | UpdateFromLastPlayedGameAction
  | UpdateAsyncStorageForNewGameAction;
