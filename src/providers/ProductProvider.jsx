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

  //Agregar Producto
  const addProduct = async (
    nombreProducto,
    precio,
    imagen,
    descripcion,
    categoria
  ) => {
    const { data } = await dashAxios.post(`productos`, {
      nombreProducto,
      precio,
      imagen,
      descripcion,
      categoria,
    });
    const producto = data.producto;
    if (producto) {
      let newProducts = [...state.products, producto];
      dispatch({
        type: types.product.addProduct,
        payload: {
          products: newProducts,
        },
      });
    }
  };

  const editProduct = async (
    id,
    nombreProducto,
    precio,
    imagen,
    descripcion,
    categoria
  ) => {
    const { data } = await dashAxios.put(`productos/${id}`, {
      id,
      nombreProducto,
      precio,
      imagen,
      descripcion,
      categoria,
    });

    if (data) {
      const newProducts = state.products.map((item) => {
        if (item._id == id) {
          return {
            _id: id,
            nombreProducto,
            precio,
            imagen,
            descripcion,
            categoria,
            __v: 0,
          };
        }
        return item;
      });

      dispatch({
        type: types.product.editProduct,
        payload: {
          products: newProducts,
        },
      });
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await dashAxios.delete(`productos/${id}`);

    if (data) {
      const newProducts = state.products.filter((item) => item._id !== id);

      console.log(newProducts);
      dispatch({
        type: types.product.deleteProduct,
        payload: {
          products: newProducts,
        },
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        state,
        getProducts,
        getProduct,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
