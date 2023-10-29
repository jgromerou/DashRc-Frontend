import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useNavigate } from 'react-router-dom';

export const ProductsPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const { state, getProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getButtonsActions = (row) => {
    return (
      <>
        {/* Editar un producto */}
        <IconButton
          color="info"
          title="Editar"
          onClick={() => navigate(`/productos/editar/${row._id}`)}
        >
          <DriveFileRenameOutlineIcon
            fontSize="medium"
            color={row.is_active ? 'info' : 'disabled'}
          />
        </IconButton>
        {/* Borrar un producto */}
        <IconButton
          color={row.is_active ? 'info' : 'disabled'}
          onClick={() => deleteUser(row._id)}
          title="Deshabilitar Usuario"
        >
          <DeleteOutlineIcon
            fontSize="medium"
            color={row.is_active ? 'info' : 'disabled'}
          />
        </IconButton>
      </>
    );
  };

  const columns = [
    {
      flex: 0.2,
      field: '_id',
      headerName: 'N°',
      minWidth: 150,
    },
    {
      flex: 0.2,
      field: 'nombreProducto',
      headerName: 'Producto',
      minWidth: 150,
    },
    {
      flex: 0.2,
      field: 'precio',
      headerName: 'Precio',
      minWidth: 150,
    },
    {
      flex: 0.2,
      field: 'imagen',
      headerName: 'Link Imagen',
      minWidth: 150,
    },
    {
      flex: 0.2,
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 150,
    },
    {
      flex: 0.2,
      field: 'categoria',
      headerName: 'Categoria',
      minWidth: 150,
    },
    // {
    //   flex: 0.1,
    //   field: 'is_active',
    //   headerName: 'Activo',
    //   minWidth: 100,
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <IconButton
    //           aria-label="Usuario Activo"
    //           color="info"
    //           disabled={true}
    //         >
    //           <DoneAllIcon
    //             fontSize="medium"
    //             sx={{ mr: 2 }}
    //             color={row.is_active ? 'success' : 'disabled'}
    //           />
    //         </IconButton>
    //       </Box>
    //     );
    //   },
    // },
    // {
    //   flex: 0.12,
    //   field: 'created_at',
    //   headerName: 'Creado',
    //   width: 120,
    //   // valueFormatter: params =>
    //   //   moment(params?.value).format("DD/MM/YYYY hh:mm:ss"),
    // },
    {
      flex: 0,
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 150,
      renderCell: ({ row }) => {
        return <Box>{getButtonsActions(row)}</Box>;
      },
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          marginLeft: 3,
        }}
      >
        <Typography variant="h5" fontFamily={'fantasy'}>
          Lista Productos
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper>
          <div style={{ width: '100%' }}>
            <DataGrid
              getRowId={(row) => row._id}
              // className='animate__animated animate__fadeIn'
              loading={state.isLoading}
              autoHeight
              // checkboxSelection
              rows={state.products}
              columns={columns}
              paginationMode="client"
              pageSize={pageSize}
              page={page}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{
                boxShadow: 1,
                border: 1,
                borderColor: '#ccc',
                '& .MuiDataGrid-columnHeaders': {
                  borderRadius: 0,
                  backgroundColor: 'rgba(0,141,255,0.2)',
                },
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onPageChange={(newPage) => setPage(newPage)}
              //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
