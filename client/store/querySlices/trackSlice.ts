import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITrack } from '@/types/track';
import { HYDRATE } from 'next-redux-wrapper';

// Define a service using a base URL and expected endpoints
export const trackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Tracks'],
  endpoints: (builder) => ({
    getTracks: builder.query<ITrack[], null>({
      query: () => `/tracks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tracks', _id }) as const),
              { type: 'Tracks', id: 'LIST' },
            ]
          : [{ type: 'Tracks', id: 'LIST' }],
    }),
    getTrackBiId: builder.query<ITrack, string>({
      query: (id: string) => `/tracks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tracks', id }],
    }),
    createTrack: builder.mutation({
      query: (body: FormData) => ({
        url: '/tracks',
        method: 'POST',
        body,
        formData: true,
      }),
      invalidatesTags: [{ type: 'Tracks', id: 'LIST' }],
    }),
    deleteTrack: builder.mutation({
      query: (id: string) => ({
        url: `/tracks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, trackId) => [
        { type: 'Tracks', id: 'LIST' },
        { type: 'Tracks', id: trackId },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTracksQuery,
  useGetTrackBiIdQuery,
  useCreateTrackMutation,
  useDeleteTrackMutation,
  util: { getRunningQueriesThunk },
} = trackApi;

// export endpoints for use in SSR
export const { getTrackBiId, getTracks } = trackApi.endpoints;
