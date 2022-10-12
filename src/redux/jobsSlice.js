import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import { JOBS_API } from '../Api';

const initialState = {
    jobs: [],
    status: 'idle',
    error: null
}

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (thunkAPI) => {
    try {
        const response = await axios.get(JOBS_API);

        return response.data.data.jobs;
    } catch(err) {
        if(!err.response) {
            throw err.message
        }

        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const addJob = createAsyncThunk('jobs/addJob', async (job, thunkAPI) => {
    try {
        const response = await axios.post(`${JOBS_API}`, job, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })

        return response.data.data.job;
    } catch(err) {
        console.log(err);

        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const editJob = createAsyncThunk('jobs/editJob', async (job, thunkAPI) => {
    const {_id} = job;
    try {
        const response = await axios.patch(`${JOBS_API}/${_id}`, job, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.data.job;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (job, thunkAPI) => {
    const {_id} = job;
    try {
        const response = await axios.delete(`${JOBS_API}/${_id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });


        console.log(response.data.data.job);
        return response.data.data.job._id;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addJob.fulfilled, (state, action) => {
                console.log(action.payload);
                state.jobs.unshift(action.payload);
            })
            .addCase(editJob.fulfilled, (state, action) => {
                let i = 0;
                while(state.jobs[i]._id !== action.payload._id) {
                    i++;
                }

                state.jobs[i] = action.payload;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                console.log(action.payload);
                const filteredJobs = state.jobs.filter(job => job._id !== action.payload);
                state.jobs = filteredJobs;
            })
    }
})

export default jobsSlice.reducer;
export const selectAllJobs = state => state.jobs.jobs;
export const getStatusJobs = state => state.jobs.status;
export const getErrorJobs = state => state.jobs.error;
export const selectJobById = (state, jobId) => state.jobs.jobs.find(job => job._id === jobId);
export const selectJobsByUserId = (state, userId) => state.jobs.jobs.filter(job => job.userId === userId);