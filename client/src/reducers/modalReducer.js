const defaultState = {
  modalOpen: false,
  modalComponent: null,
  modalProps: {},
}

export default function modalReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case 'MODAL_OPEN':
      const { modalComponent, modalProps, } = payload
    
      return {
        modalOpen: true,
        modalComponent,
        modalProps,
      }
    case 'MODAL_CLOSE':
      return defaultState
    default:
      return state
  }
}