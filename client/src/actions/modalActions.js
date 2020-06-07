export const openModal = (modalComponent) => {
  return {
    type: 'MODAL_OPEN',
    payload: {
      modalOpen: true,
      modalComponent,
    },
  }
}

export const closeModal = () => {
  return {
    type: 'MODAL_CLOSE'
  }
}