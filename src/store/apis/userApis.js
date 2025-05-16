import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL + "/api/users";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendBaseUrl }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    checkUsername: builder.mutation({
      query: (username) => ({
        url: `/check-username?username=${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useCheckUsernameMutation } = userApi;
