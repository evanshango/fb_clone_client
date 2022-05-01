import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit"
import agent from "../../api/agent"

const initialState = {
    status: 'idle',
    message: '',
    user: null
}

export const findUser = createAsyncThunk('user/search', async (data, thunkAPI) => {
        try {
            return await agent.User.findUser(data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.data)
        }
    }
)

export const requestCode = createAsyncThunk('user/resetCode', async (data, thunkAPI) => {
    try {
        return await agent.Verification.resetCode(data)
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.data)
    }
})

export const validateCode = createAsyncThunk('user/validateCode', async (data, thunkAPI) => {
    try {
        return await agent.Verification.validateCode(data)
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.data)
    }
})

export const resetPass = createAsyncThunk('user/changePassword', async (data, thunkAPI) => {
    try {
        return await agent.Account.changePassword(data)
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.data)
    }
})

export const userSlice = createSlice({
    name: 'user', initialState, reducers: {
        clearSearch: state => {
            state.message = ''
            state.status = 'idle'
            state.user = null
        },
        clearMessage: state => {
            state.message = ''
        }
    },
    extraReducers: (builder => {
        builder.addCase(findUser.pending, state => {
            state.status = 'findUserPending'
        })
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.status = 'idle'
            state.user = action.payload
            state.message = 'User found'
        })
        builder.addCase(findUser.rejected, (state, action) => {
            state.status = 'idle'
            state.user = null
            state.message = action.payload['message']
        })
        builder.addCase(requestCode.pending, state => {
            state.status = 'requestCodePending'
        })
        builder.addCase(resetPass.pending, state => {
            state.status = 'resetPassPending'
        })
        builder.addCase(validateCode.pending, state => {
            state.status = 'validateCodePending'
        })
        builder.addMatcher(isAnyOf(requestCode.fulfilled, validateCode.fulfilled, resetPass.fulfilled),
            (state, action) => {
                state.status = 'idle'
                state.message = action.payload?.message
            })
        builder.addMatcher(isAnyOf(requestCode.rejected, validateCode.rejected, resetPass.rejected),
            (state, action) => {
                state.status = 'idle'
                state.message = action.payload['message']
            })
    })
})

export const {clearMessage, clearSearch} = userSlice.actions
