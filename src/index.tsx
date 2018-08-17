import * as React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { StoreState } from './store';
import { UserInitState } from './store/reducers/user';
import { AnimalInitState } from './store/reducers/animal';
import { Dispatch } from '../node_modules/redux';

// React16 Context API
type MyChildProps = {
  user?: string;
  animal?: string;
};
const MyChild: React.StatelessComponent<MyChildProps> = props =>
  console.log(props) || <div>{props.user}</div>;

type MyAppProps = {};
const MyApp: React.StatelessComponent<MyAppProps> = () => (
  <MyContextStore.Consumer>
    {data => <MyChild user={data.user} animal={data.animal} />}
  </MyContextStore.Consumer>
);
type ContextStore = {
  user: string;
  animal: string;
};
const MyContextStore = React.createContext<ContextStore>({
  user: '',
  animal: ''
});
class ContextApp extends React.Component<{}, ContextStore> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: 'Whien',
      animal: 'Cat'
    };
  }
  changeName = (e: React.ChangeEvent<{ value: string }>) => {
    e.persist();
    this.setState(state => ({
      user: e.target.value
    }));
  };
  render() {
    return (
      <MyContextStore.Provider value={this.state}>
        <MyApp />
        <input type="text" onChange={this.changeName} />
      </MyContextStore.Provider>
    );
  }
}
render(<ContextApp />, document.getElementById('view'));

/**
 * 單向 data => view (React)
 * 雙向 data <=> view
 */

type FruitProps = {
  fruit: string;
};
const FruitChild: React.StatelessComponent<FruitProps> = props => (
  <div>{props.fruit}</div>
);

type ChildProps = {
  defaultFruits: string[];
};
const ReactAppChild: React.StatelessComponent<ChildProps> = props => (
  <div>
    {props.defaultFruits.map((fruit: string, index: number) => (
      <FruitChild key={`${index}-${fruit}`} fruit={fruit} />
    ))}
  </div>
);

// <react-app>App</react-app>
// stateless component
// <div> JSX -> <div> -> React.createClass()
// babel-ast (Abstract syntax tree)
// props
type InputProps = {
  name: string;
  onChange(event: React.ChangeEvent<{ value: string }>): void;
};
type InputState = {
  name: string;
};
class Input extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
  }
  render() {
    return (
      <input
        onChange={this.props.onChange}
        value={this.props.name}
        type="text"
      />
    );
  }
}

type Props = {
  defaultName: string;
  user: UserInitState;
  animal: AnimalInitState;
  dispatch: Dispatch;
};
type State = {
  name: string;
  fruits: string[];
};
class ReactApp extends React.Component<Props, State> {
  // 建構式
  inputNode: React.Ref<any> | Input | null;
  constructor(props: Props) {
    super(props);
    const { defaultName } = this.props;
    this.state = {
      name: defaultName,
      fruits: ['apple', 'pie']
    };
    this.inputNode = '';
  }
  addFruit = () => {
    this.setState(state => ({
      fruits: state.fruits.concat(`${state.fruits.length}-${this.state.name}`)
    }));
  };
  updateName: React.ChangeEventHandler<{ value: string }> = e => {
    e.persist();
    const { dispatch } = this.props;
    // 輸入一個字 => 叫(dispatch)傳令兵(CHANGE_USER_NAME, 結果)衝很快 =>
    // => store(皇宮) => (CHANGE_USER_NAME 皇宮的工人 <= 結果) => 把結果寫下來後把聖旨再傳給 store 國王 => 國王發布結果(connect)
    // => 國家就變了
    dispatch({
      type: 'CHANGE_USER_NAME',
      payload: e.target.value
    });
  };
  render() {
    const { user, animal } = this.props;
    return (
      /**
       * <div>
       * <input />
       * <react-app-child />
       * </div>
       */
      <div>
        <div>來自 Redux 的人類變數 {user.name}</div>
        <div>來自 Redux 的動物變數 {animal.name}</div>
        <input type="text" onChange={this.updateName} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
  animal: state.animal
});
// HOC => Higher Order Component
const ReactAppConnect = connect(mapStateToProps)(ReactApp);

/**
 * GLOBAL => 狀態庫
 * <ReactHTML> => <html>
 *  <ReactBody> => <body>
 *    <ReactApp></ReactApp> => <react-app>
 *  </ReactBody> => </body>
 * </ReactHTML> => </html>
 */
// document.getElementById('view').appendChild(ReactApp)
// render(
//   <Provider store={store}>
//     <ReactAppConnect defaultName="boom" />
//   </Provider>,
//   document.getElementById('view')
// );
