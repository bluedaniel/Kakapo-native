
export const createConstants = (...constants) => constants.reduce((acc, constant) =>
  ({ ...acc, [constant]: constant }), {});

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export const swatches = (type) => {
  const light = [
    '#FFEB3B', '#FFC107', '#FF9800'
  ];
  const dark = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#001'
  ];
  switch (type) {
    case 'light':
      return light;
    case 'dark':
      return dark;
    default:
      return light.concat(dark);
  }
};
