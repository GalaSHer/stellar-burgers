import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '@utils-cookies';

// Начальное состояние
type TUserState = {
  user: TUser;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  loading: false,
  error: null
};

// AsyncThunk
export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (user: TRegisterData) => {
    const data = await registerUserApi(user);
    if (!data?.success) {
      return Promise.reject(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async ({ email, password }: Omit<TLoginData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return Promise.reject(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk<TUser, TUser>(
  'user/update',
  async (user: TUser) => {
    const data = await updateUserApi(user);
    if (!data?.success) {
      return Promise.reject(data);
    }
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
});

export const getUserData = createAsyncThunk(
  'user/getAll',
  async () => await getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      const userData = await dispatch(getUserData());
      if (userData.payload) {
        dispatch(setAuthStatus(true));
      } else {
        dispatch(setAuthStatus(false));
      }
    } else {
      dispatch(setAuthStatus(false));
    }
  }
);

// вспомогательные функции-обработчики
const handlePending = (state: TUserState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: TUserState, action: any) => {
  state.loading = false;
  state.error = action.payload || 'Ошибка';
};

const handleFulfilled = (state: TUserState, action: any) => {
  state.loading = false;
  state.isAuthChecked = true;
  state.user = action.payload.user;
};

// Слайс
const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.loading = false;
          state.isAuthChecked = true;
          state.user = action.payload;
        }
      )

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthChecked = false;
        state.user = {
          name: '',
          email: ''
        };
      })

      .addCase(getUserData.pending, handlePending)
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = false;
      })
      .addCase(getUserData.fulfilled, handleFulfilled)

      .addCase(checkUserAuth.pending, handlePending)
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false;
        state.error = 'Необходима авторизация';
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.loading = false;
      });
  }
});

export const getUserDataSelector = (state: { user: TUserState }) => state.user;
export const isAuthUserSelector = (state: { user: TUserState }) =>
  state.user.isAuthChecked;
export const { reducer } = userProfileSlice;
export const { setAuthStatus } = userProfileSlice.actions;
