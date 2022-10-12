import {configureStore} from '@reduxjs/toolkit';

import jobsReducer from './jobsSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        auth: authReducer
    }
})