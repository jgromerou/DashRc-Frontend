import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { ProductContext } from '../../contexts/ProductContext';
import { Loading } from '../../components/ui/Loading';
import { useForm } from '../../hooks/useForm';

export const AddProductPage = () => {
  const { product, addProduct } = useContext(ProductContext);
  const {
    formState,
    onInputChange,
    nombreProducto,
    precio,
    descripcion,
    imagen,
    categoria,
  } = useForm(product);

  const onSubmit = () => {
    console.log('enviando formulario');
    console.log({ nombreProducto, precio, imagen, descripcion, categoria });

    addProduct(nombreProducto, precio, imagen, descripcion, categoria);
    // setUserEdited(true);
    // console.log({ ...values, id });
    // editUser({ ...values, id });
    // resetForm();
    // setValues({
    //   email: '',
    //   firstname: '',
    //   lastname: '',
    //   status: '',
    //   role: '',
    // });

    // if (state.errorMessage === '') {
    //   navigate('/dashboard/user');
    // }
  };

  return (
    <Paper>
      <Box padding={3}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              borderBottom: 2,
              marginLeft: 3,
              paddingBottom: 2,
              borderColor: '#ebe3e3',
              marginBottom: 5,
            }}
          >
            <Typography variant="h6" fontFamily={'fantasy'}>
              Modificar Producto
            </Typography>
            {/* <Typography variant="caption">
              Creado:{' '}
              {moment(state.user.created_at).format('DD/MM/YYYY hh:mm:ss')}
            </Typography> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              id="nombreProducto"
              label="Nombre Producto"
              name="nombreProducto"
              //autoComplete="Nombre"
              value={nombreProducto || ''}
              onChange={(event) => onInputChange(event)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              id="precio"
              label="Precio"
              name="precio"
              autoComplete="Apellido"
              value={precio || ''}
              onChange={(event) => onInputChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              id="descripcion"
              label="Descripción"
              name="descripcion"
              //autoComplete="Email"
              value={descripcion || ''}
              onChange={(event) => onInputChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              id="imagen"
              label="Link Imagen"
              name="imagen"
              //autoComplete="Email"
              value={imagen || ''}
              onChange={(event) => onInputChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <InputLabel id="categoria">Categoria</InputLabel>
              <Select
                fullWidth
                name="categoria"
                labelId="categoria"
                id="categoria"
                value={categoria || ''}
                label="Categoria"
                //   onChange={(e) => {
                //     setFieldValue("status", e.target.value);
                //   }}
                onChange={(event) => onInputChange(event)}
                required
              >
                <MenuItem key={'bebida caliente'} value={'bebida caliente'}>
                  Bebida Caliente
                </MenuItem>
                <MenuItem key={'bebida fria'} value={'bebida fria'}>
                  Bebida Fría
                </MenuItem>
                <MenuItem key={'dulce'} value={'dulce'}>
                  Dulce
                </MenuItem>
                <MenuItem key={'salado'} value={'salado'}>
                  Salado
                </MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              size="large"
              color="info"
              onClick={onSubmit}
            >
              GUARDAR
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
