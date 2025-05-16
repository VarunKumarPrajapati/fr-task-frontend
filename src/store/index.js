import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./apis/userApis";
import { locationApi } from "./apis/locationApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(locationApi.middleware),
});

export {
  useCheckUsernameMutation,
  useUpdateUserMutation,
} from "./apis/userApis";

export {
  useGetCountriesQuery,
  useGetStatesByCountryMutation,
  useGetCitiesByStateMutation,
} from "./apis/locationApi";

export default store;
