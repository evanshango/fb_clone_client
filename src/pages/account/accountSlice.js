import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import agent from "../../api/agent"

const initialState = {
    user: null
}

export const signinUser = createAsyncThunk(
    'account/signin',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.signin(data)
            const {user} = userDto
            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {...action.payload}
        }
    },
    extraReducers: (builder => {
        builder.addCase(signinUser.fulfilled, (state, action) => {
            state.user = {...action.payload}
        })
        builder.addCase(signinUser.rejected, ((state, action) => {
            state.user = null
            throw action.payload
        }))
    })
})

export const {signin, signup} = accountSlice.actions
