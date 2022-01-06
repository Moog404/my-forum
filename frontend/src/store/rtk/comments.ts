import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axiosBaseQuery'

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getComments: builder.query<any, any>({
      query: () => ({
        url: '/comments',
        method: 'GET',
      }),
      providesTags: (result) =>
        // is result available?
        result
          ?
          [
            ...result.map((id: any) => ({ type: 'Comments', id } as const)),
            { type: 'Comments' },
          ] :
          [{ type: 'Comments'}]
    }),
    addComment: builder.mutation<any, any>({
      query: ({text, post}) => ({
        url: '/comments',
        method: 'POST',
        data: {
          text: text,
          post: post
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      }),
      invalidatesTags: [{ type: ('Comments' as never)}],
    })
  })
})

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi