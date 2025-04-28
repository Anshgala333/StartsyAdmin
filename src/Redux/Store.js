import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './Slice'

export default configureStore({
  reducer: {
    admin : AdminSlice
  },
})