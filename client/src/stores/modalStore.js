import { createStore } from 'redux'
import modalReducer from '../reducers/modalReducer'

const modalStore = createStore(modalReducer)


export default modalStore