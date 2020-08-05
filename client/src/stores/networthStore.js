import { createStore } from 'redux'
import networthReducer from '../reducers/networthReducer'

const networthStore = createStore(networthReducer)


export default networthStore