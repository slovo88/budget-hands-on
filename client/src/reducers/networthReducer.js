// const exampleObj = {
//   mostRecentNetworth: {},
//   networthCollection: []
// }

export default function networthReducer(state = {}, action) {
  switch (action.type) {
    case 'NETWORTH_GET':
      const { networthCollection, mostRecentNetworth } = action.payload

      return {
        networthCollection,
        mostRecentNetworth,
      }
    case 'NETWORTH_ADD':
      return state
    default:
      return state
  }
}

