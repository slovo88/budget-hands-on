import { createStore } from 'redux'
import transactionsReducer from '../reducers/transactionsReducer'

const transactionsStore = createStore(transactionsReducer)

export default transactionsStore