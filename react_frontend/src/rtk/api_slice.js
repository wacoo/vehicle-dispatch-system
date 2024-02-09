import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/users'}),
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
        }),
    }),
});

export default apiSlice;
export const {useGetPostsQuery} = apiSlice;