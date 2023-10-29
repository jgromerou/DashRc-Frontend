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

    case types.product.addProduct:
      return {
        ...state,
        products: action.payload.products,
      };

    case types.product.editProduct:
      return {
        ...state,
        products: action.payload.products,
      };

    case types.product.deleteProduct:
      return {
        ...state,
        products: action.payload.products,
      };

    default:
      return state;
  }
};
