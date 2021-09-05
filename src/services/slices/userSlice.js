import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersReq, getRolesReq } from '../../utils/api';

const preloadedState = {
  request: false,
  failed: false,
  users: {},
  roles: {},
  selectedUser: {},
};

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async () => {
    const response = await getUsersReq();
    return response;
  },
);
export const getRoles = createAsyncThunk(
  'user/getRoles',
  async () => {
    const response = await getRolesReq();
    return response;
  },
);
// export const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async () => {
//     const response = await Promise.all([getUsersReq(), getRolesReq()]);
//     return response;
//   },
// );

const userSlice = createSlice({
  name: 'user',
  initialState: preloadedState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = state.users.collection.find((user) => user.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.failed = false;
      state.request = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.failed = false;
      state.request = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.request = false;
      state.failed = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.failed = false;
      state.request = false;
      state.roles = action.payload;
    });
    builder.addCase(getRoles.pending, (state) => {
      state.failed = false;
      state.request = true;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.request = false;
      state.failed = true;
    });
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
