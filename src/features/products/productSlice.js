import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  api.getProducts
)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  api.addProducts
)
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  api.updateProducts
)
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  api.deleteProducts
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addProduct.pending, state => {
        state.status = 'loading'
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateProduct.pending, (state, action) => {
        const updateProduct = action.payload
        const existingProduct = state.list.find(
          product => product._id === updateProduct._id
        )
        if (!existingProduct) {
          Object.assign(existingProduct, updateProduct)
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          product => product._id !== action.payload
        )
      })
  },
})


export const selectAllProducts = state => state.products.list
export const selectProductById = (state, id) => state.products.list.find(product => product._id === id)
export default productsSlice.reducer
