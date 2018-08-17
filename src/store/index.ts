// globalState 狀態庫
/**
 * reduct - single store
 * - store - 集中的狀態庫
 * - action - 傳令兵
 * - reducer - 被拆解的狀態庫
 *
 * 皇宮(國王) => 傳令兵 => 僕人 => ... user view
 */

import { createStore, combineReducers } from 'redux';
import user, { UserInitState } from './reducers/user';
import animal, { AnimalInitState } from './reducers/animal';

export type StoreState = {
  user: UserInitState;
  animal: AnimalInitState;
};

const store = createStore(
  combineReducers({
    user,
    animal
  })
);

export default store;
