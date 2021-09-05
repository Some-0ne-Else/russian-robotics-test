import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUsersReq, getRolesReq, createUserReq, updateUserReq, deleteUserReq,
} from '../../utils/api';

const preloadedState = {
  users: {},
  roles: {},
  selectedUser: {},
  sortedAsc: false,
  usersRequest: false,
  usersFailed: false,
  rolesRequest: false,
  rolesFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    const response = await updateUserReq(data);
    return response;
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id) => {
    const response = await deleteUserReq(id);
    return response;
  },
);

export const createUser = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    const response = await createUserReq(data);
    return response;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: preloadedState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = state.users.collection.find((user) => user.id === action.payload);
    },
    sortUsers: (state) => {
      state.users.collection = state.users.collection.sort((a, b) => {
        const nameA = `${a.surname} ${a.name.slice(0, 1)}. ${a.middleName.slice(0, 1)}.`.toLowerCase();
        const nameB = `${b.surname} ${b.name.slice(0, 1)}. ${b.middleName.slice(0, 1)}.`.toLowerCase();
        if (!state.sortedAsc) {
          if (nameA < nameB) return -1; // ASC
          if (nameA > nameB) return 1;
        } else {
          if (nameA < nameB) return 1; // DESC
          if (nameA > nameB) return -1;
        }
        return 0;
      });
      state.sortedAsc = !state.sortedAsc;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersFailed = false;
      state.usersRequest = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.usersFailed = false;
      state.usersRequest = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersRequest = false;
      state.usersFailed = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.rolesFailed = false;
      state.rolesRequest = false;
      state.roles = action.payload;
    });
    builder.addCase(getRoles.pending, (state) => {
      state.rolesFailed = false;
      state.rolesRequest = true;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.rolesRequest = false;
      state.rolesFailed = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.updateUserFailed = false;
      state.updateUserRequest = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserFailed = false;
      state.updateUserRequest = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.updateUserRequest = false;
      state.updateUserFailed = true;
    });
  },
});

export const { selectUser, sortUsers } = userSlice.actions;
export default userSlice.reducer;
