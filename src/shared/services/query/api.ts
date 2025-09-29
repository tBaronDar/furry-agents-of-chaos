import { z } from 'zod';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './config';
import type { BaseErrorKey, ErrorWithResponse, ErrorWithoutResponse, Error, Meta } from './config';
import baseQueryWithZodValidation from './zod-validation-enhancer';
import { catReadSchema, type CatReadDTO } from '../../dto/cat-read';
import { catBreedSchema } from '../../dto/cat-breed-read';
import { favoriteCatSchema } from '../../dto/favorite-cat-read';
import { type CatBreed } from '../../dto/cat-breed-read';
import { type FavoriteCatReadDTO } from '../../dto/favorite-cat-read';
import { addMoreCats, setCats } from '../../reducers/cats.reducer';

export type CatApiErrorKey = BaseErrorKey;

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZodValidation(axiosBaseQuery),
  tagTypes: ['Guest', 'Favorites', 'Cats'],
  endpoints: (builder) => ({
    // Guest user behavior - get random cats
    getRandomCats: builder.query<Array<CatReadDTO>, { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: '/v1/images/search',
        params: {
          limit,
          has_breeds: 1, // Include breed information
        },
        dataSchema: z.array(catReadSchema),
      }),
      providesTags: ['Cats'],
      transformResponse(response: Array<CatReadDTO>, meta) {
        // Store the fetched cats in the cats slice if it's the initial load
        const metaWithState = meta as {
          baseQueryMeta?: { state?: { cats?: { cats?: Array<CatReadDTO> } } };
          dispatch?: (action: { type: string; payload: Array<CatReadDTO> }) => void;
        };
        const state = metaWithState?.baseQueryMeta?.state;
        if (state?.cats?.cats?.length === 0) {
          // Dispatch the action to store cats in the slice
          metaWithState?.dispatch?.(addMoreCats(response));
        } else {
          metaWithState?.dispatch?.(setCats(response));
        }
        return response;
      },
      transformErrorResponse(baseQueryReturnValue, meta?: Meta): Error<CatApiErrorKey> {
        if (meta === undefined || !meta.hasResponse) {
          return baseQueryReturnValue as ErrorWithoutResponse<CatApiErrorKey>;
        }
        const error = baseQueryReturnValue as ErrorWithResponse<CatApiErrorKey>;
        if (error.status === 401) {
          return { ...error, key: 'invalidApiKey' };
        }
        if (error.status === 429) {
          return { ...error, key: 'rateLimited' };
        }
        return error;
      },
    }),

    // Get specific cat by ID
    getCatById: builder.query<CatReadDTO, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/images/${id}`,
        dataSchema: catReadSchema,
      }),
      providesTags: ['Cats'],
    }),

    // Get cat breeds
    getCatBreeds: builder.query<Array<CatBreed>, void>({
      query: () => ({
        url: '/v1/breeds',
        dataSchema: z.array(catBreedSchema),
      }),
      providesTags: ['Cats'],
    }),

    // Search cats by breed
    getCatsByBreed: builder.query<Array<CatReadDTO>, { breedId: string; limit?: number }>({
      query: ({ breedId, limit = 10 }) => ({
        url: '/v1/images/search',
        params: {
          breed_ids: breedId,
          limit,
        },
        dataSchema: z.array(catReadSchema),
      }),
      providesTags: ['Cats'],
    }),

    // Favorites management
    getFavorites: builder.query<Array<FavoriteCatReadDTO>, { subId: string }>({
      query: ({ subId }) => ({
        url: '/v1/favourites',
        params: {
          sub_id: subId,
        },
        dataSchema: z.array(favoriteCatSchema),
      }),
      providesTags: ['Favorites'],
    }),

    addToFavorites: builder.mutation<{ message: string; id: number }, { imageId: string; subId: string }>({
      query: ({ imageId, subId }) => ({
        url: '/v1/favourites',
        method: 'POST',
        data: {
          image_id: imageId,
          sub_id: subId,
        },
      }),
      invalidatesTags: ['Favorites'],
    }),

    removeFromFavorites: builder.mutation<{ message: string }, { favoriteId: string }>({
      query: ({ favoriteId }) => ({
        url: `/v1/favourites/${favoriteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export default api;
