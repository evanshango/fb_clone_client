import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit"
import agent from "../../api/agent"
import {history} from "../../index"

export const STORAGE_KEY = "fb_clone_token"

const initialState = {
    status: 'idle',
    message: '',
    token: '',
    user: null
}

export const signinUser = createAsyncThunk('account/signin', async (data, thunkAPI) => {
        try {
            const response = await agent.Account.signin(data)
            localStorage.setItem(STORAGE_KEY, response?.token)
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.data)
        }
    }
)

export const signupUser = createAsyncThunk('account/signup', async (data, thunkAPI) => {
        try {
            const response = await agent.Account.signup(data)
            localStorage.setItem(STORAGE_KEY, response?.token)
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.data)
        }
    }
)

export const fetchUser = createAsyncThunk('account/user', async (_, thunkAPI) => {
        try {
            const response = await agent.User.current()
            return {user: {...response}, token: localStorage.getItem(STORAGE_KEY)}
        } catch (e) {
            return thunkAPI.rejectWithValue(e.data)
        }
    }, {
        condition: () => {
            if (!localStorage.getItem(STORAGE_KEY)) return false
        }
    }
)

export const activateAccount = createAsyncThunk('account/activate', async (data, thunkAPI) => {
    try {
        const res = await agent.Account.activate(data)
        thunkAPI.dispatch(setMessage(res))
        return res
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.data)
    }
})

export const verifyLink = createAsyncThunk('account/verification', async (data, thunkAPI) => {
    try {
        const res = await agent.Verification.verify()
        thunkAPI.dispatch(setMessage(res))
        return res
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.data)
    }
})

export const accountSlice = createSlice({
    name: 'account', initialState, reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message
        },
        resetState: (state) => {
            state.message = ''
            state.status = 'idle'
            state.user = null
        },
        signout: (state) => {
            state.user = null
            state.message = ''
            state.token = ''
            localStorage.removeItem(STORAGE_KEY)
            history.push('/signin')
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'idle'
            state.message = ''
            state.user = action.payload?.user
            state.token = action.payload?.token
        })
        builder.addMatcher(isAnyOf(signinUser.pending, signupUser.pending, fetchUser.pending), (state) => {
            state.status = 'pending'
        })
        builder.addMatcher(isAnyOf(signinUser.fulfilled, signupUser.fulfilled), ((state, action) => {
            state.message = action.payload?.message
            state.user = null
            state.status = 'idle'
        }))
        builder.addMatcher(isAnyOf(signinUser.rejected, signupUser.rejected, fetchUser.rejected), (state, action) => {
            state.token = ''
            state.message = action?.payload['message']
            state.user = null
            state.status = 'idle'
        })
        builder.addMatcher(isAnyOf(activateAccount.pending, verifyLink.pending, state => {
            state.status = 'activatePending'
        }))
        builder.addMatcher(isAnyOf(activateAccount.fulfilled, verifyLink.fulfilled, (state, action) => {
            state.status = 'idle'
            state.message = action?.payload?.message
        }))
        builder.addMatcher(isAnyOf(activateAccount.rejected, verifyLink.rejected, (state, action) => {
            state.status = 'idle'
            state.message = action?.payload['message']
        }))
    })
})

export const {resetState, setMessage, signout} = accountSlice.actions
