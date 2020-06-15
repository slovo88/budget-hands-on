import { createStore } from 'redux'
import breakdownReducer from '../reducers/breakdownReducer'

const breakdownStore = createStore(breakdownReducer)


export default breakdownStore