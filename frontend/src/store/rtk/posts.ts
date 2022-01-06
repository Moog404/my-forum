import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axiosBaseQuery'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPosts: builder.query<any, any>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: (result) =>
        // is result available?
        result
          ?
          [
            ...result.map((id: string) => ({ type: 'Posts', id } as const)),
            { type: 'Posts' },
          ] :
          [{ type: 'Posts'}]
    }),
    addPost: builder.mutation<any, any>({
      query: ({title}) => ({
        url: '/posts',
        method: 'POST',
        data: {
          title: title,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      }),
      invalidatesTags: [{ type: ('Posts' as never)}],
    }),
    deletePost: builder.mutation<any, any>({
      query: ({id}) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      }),
      invalidatesTags: [{ type: ('Posts' as never)}],
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } = postsApi