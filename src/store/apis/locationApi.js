import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL + "/api/locations";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendBaseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "/countries",
    }),
    getStatesByCountry: builder.mutation({
      query: (countryId) => ({
        url: `/states/${countryId}`,
        method: "GET",
      }),
    }),
    getCitiesByState: builder.mutation({
      query: (stateId) => ({
        url: `/cities/${stateId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetStatesByCountryMutation,
  useGetCitiesByStateMutation,
} = locationApi;
