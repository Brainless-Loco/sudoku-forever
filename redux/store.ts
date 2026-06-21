import { createStore } from 'redux';
import { PlayzoneReducer } from './reducers/PlayzoneReducer';

const store = createStore(PlayzoneReducer);

export type RootState = ReturnType<typeof PlayzoneReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
