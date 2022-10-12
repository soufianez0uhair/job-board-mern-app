import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import { USERS_API } from '../Api';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
    updateStatus: 'idle'
}

export const registerUser = createAsyncThunk('auth/registerUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${USERS_API}/signup`, user);

        console.log(response.data.data);
        return response.data.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${USERS_API}/login`, user);

        return response.data.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const updateEmail = createAsyncThunk('auth/updateEmail', async (user, thunkAPI) => {
    try {
        const response = await axios.patch(`${USERS_API}/update/email`, user, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut(state) {
            localStorage.removeItem('user');
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
        resetUpdateStatus(state) {
            state.updateStatus = 'idle';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateEmail.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const {logOut, resetUpdateStatus} = authSlice.actions;
export const selectUser = state => state.auth.user;
export const getStatusAuth = state => state.auth.status;
export const getErrorAuth = state => state.auth.error;
export const getStatusUpdate = state => state.auth.updateStatus;