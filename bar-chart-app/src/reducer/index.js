export function reducer(state, action) {
    switch (action.type) {
      case 'TOGGLE_COLUMN_SELECTION':
        return {
          data: state.data.map(d => ({
            ...d,
            selected: d.x === action.payload.x ?
            !d.selected :
            false,
          }))
        };
      case 'UPDATE_COLUMN_VALUE':
        return {
          data: state.data.map(d => ({
            ...d,
            y: d.x === action.payload.x ?
            action.payload.newY :
            d.y,
          }))
        };
      default:
        throw new Error(`Invalid Action type : ${action.type}`);
    }
}
