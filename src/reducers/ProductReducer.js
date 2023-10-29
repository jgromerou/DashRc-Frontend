import { types } from '../types/types';

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.product.getProducts:
      return {
        ...state,
        products: action.payload.products,
        errorMessage: '',
        isLoading: false,
      };
    case types.product.getOneProduct:
      return {
        ...state,
        product: action.payload.product,
        isProductLoading: false,
      };
    // case types.auth.onLogout:
    //     return {
    //         ...state,
    //         user: null,
    //         isLogged: false,
    //         errorMessage: action.payload.errorMessage,
    //         isLoading: false
    //     };

    default:
      return state;
  }
};
