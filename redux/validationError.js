const initStateError = {
  statusCode: 0,
  name: "",
  description: "",
  ingredients: "",
  price: "",
  rating: "",
};

export const validationError = (state = initStateError, action) => {
  if (action.type === "set_error_validation") {
    return {
      ...state,
      statusCode: action.value.statusCode,
      name: action.value.name,
      ingredients: action.value.ingredients,
      price: action.value.price,
      rating: action.value.rating,
    };
  }
  if (action.type === "clear_validation") {
    return initStateError;
  }
  return state;
};