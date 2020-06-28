const defaultState = {
  modalOpen: false,
  modalComponent: null,
  modalProps: {},
}

export default function modalReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case 'MODAL_OPEN':
      document.body.style = "overflow: hidden;"
      const { modalComponent, modalProps, } = payload
    
      return {
        modalOpen: true,
        modalComponent,
        modalProps,
      }
    case 'MODAL_CLOSE':
      document.body.style = ""
      return defaultState
    default:
      return state
  }
}