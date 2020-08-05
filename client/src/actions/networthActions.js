export const NETWORTH_GET = ({ year, month }) => ({
  type: 'NETWORTH_GET',
  payload: {
    networthCollection,
  },
})

export const NETWORTH_ADD = ({ impactedDates }) => ({
  type: 'NETWORTH_ADD',
  payload: {
    impactedDates,
  }
})