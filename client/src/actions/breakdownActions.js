export const BREAKDOWN_CALCULATE = ({ year, month }) => ({
  type: 'BREAKDOWN_CALCULATE',
  payload: {
    year,
    month,
    transactions,
    pools,
  },
})