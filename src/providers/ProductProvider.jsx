import { useReducer, useState } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';
import { dashAxios } from '../config/DashRcAxios';
import { types } from '../types/types';
import { ProductContext } from '../contexts/ProductContext';

const initialState = {
  isLoading: true,
  isActive: false,
  products: [],
  product: {},
  totalRows: 0,
  errorMessage: '',
  succesMessage: '',
  isProductLoading: true,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getProducts = async (page = 0) => {
    // const limit = 25;
    const { data } = await dashAxios.get(`productos`);
    console.log(data);
    if (!data) {
      return dispatch({
        type: types.product.messages,
        payload: {
          messageStatus: 'ERROR',
          msg: 'No Existen productos en el sistema',
        },
      });
    }

    dispatch({
      type: types.product.getProducts,
      payload: {
        products: data,
        //totalRows: data.res.totalRows
      },
    });
  };

  const getProduct = async (id) => {
    try {
      //const product = state.products.find((item) => item._id === id);
      const product = await dashAxios.get(`productos/${id}`);
      console.log('product', product.data);
      if (!product) {
        console.log('entro por aqui');
        return dispatch({
          type: types.product.messages,
          payload: {
            messageStatus: 'ERROR',
            msg: 'No Existe el producto en el sistema',
          },
        });
      }

      dispatch({
        type: types.product.getOneProduct,
        payload: {
          product: product.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   const editUser = async (dataUser) => {
  //     const { id } = dataUser;

  //     const { data } = await dashAxios.put(`users/${id}`, {
  //       dataUser,
  //     });

  //     console.log(data);
  //   };

  //   const deleteUser = async (id) => {
  //     const { data } = await dashAxios.delete(`users/${id}`);

  //     if (data) {
  //       const users = state.users.filter((item) => {
  //         if (item.id == id) {
  //           item.is_active = false;
  //         }

  //         return item;
  //       });

  //       dispatch({
  //         type: types.user.deleteUser,
  //         payload: {
  //           users,
  //         },
  //       });
  //     }
  //   };

  //   const activeUser = async (id) => {
  //     const { data } = await dashAxios.put(`users/${id}`, {
  //       is_active: true,
  //     });

  //     if (data) {
  //       const users = state.users.filter((item) => {
  //         if (item.id == id) {
  //           item.is_active = true;
  //         }

  //         return item;
  //       });

  //       dispatch({
  //         type: types.user.activeUser,
  //         payload: {
  //           users,
  //         },
  //       });
  //     }
  //   };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        state,
        getProducts,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
