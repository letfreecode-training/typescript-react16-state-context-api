import { Reducer } from 'redux';

export type UserInitState = {
  name: string;
};
const initialState: UserInitState = {
  name: 'Whien'
};

// redux 要用 immutable -> 值要確定被改變完成
// reducer 只負責改變值(不做 side effect，會導致無法確定 store 更改完成)
// 狀態 state -> 預設狀態
// 傳令兵 action -> 叫 user 這個工人做事
// (action.type) => 要做的事情
// 怎麼讓傳令兵做事：例如（改變名字，改變性別）
const user: Reducer = (state: UserInitState = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      return Object.assign({}, state, {
        name: action.payload
      });
    default:
      return state;
  }
};

export default user;
