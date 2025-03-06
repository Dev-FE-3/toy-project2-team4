import { createStore } from 'redux';
import counterReducer from './counterReducer';

// createStore로 스토어를 생성합니다
const store = createStore(counterReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 