import { createStore } from 'redux'
import rotateReducer from './reducers/rotateReducer'

const store = createStore(rotateReducer);

export default store;