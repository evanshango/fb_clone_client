import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit"
import agent from "../../api/agent"
import cookies from 'js-cookie'
import {history} from "../../index"

export const STORAGE_KEY = "fb_clone_user"

const initialState = {
    status: 'idle',
    message: '',
    user: null
}

export const signinUser = createAsyncThunk(
    'account/signin',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Account.signin(data)
            const {user} = response
            thunkAPI.dispatch(setUser({user, timeout: 0}))
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.data)
        }
    }
)

export const signupUser = createAsyncThunk(
    'account/signup',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Account.signup(data)
            const {user} = response
            thunkAPI.dispatch(setUser({user, timeout: 2000}))
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.data)
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state, action) => {
            cookies.set(STORAGE_KEY, JSON.stringify(action.payload.user))
            state.user = {...state.user, ...action.payload.user}
            state.status = 'idle'
            setTimeout(() => history.push('/'), action.payload.timeout)
        },
        resetState: (state) => {
            state.message = ''
            state.status = 'idle'
            state.user = null
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signinUser.pending, signupUser.pending), (state) => {
            state.status = 'pending'
        })
        builder.addMatcher(isAnyOf(signinUser.fulfilled, signupUser.fulfilled), ((state, action) => {
            state.user = {...action.payload.user}
            state.message = action.payload.message
            state.status = 'idle'
        }))
        builder.addMatcher(isAnyOf(signinUser.rejected, signupUser.rejected), (state, action) => {
            state.message = action.payload['message']
            state.user = null
            state.status = 'idle'
        })
    })
})

export const {resetState, setUser} = accountSlice.actions
