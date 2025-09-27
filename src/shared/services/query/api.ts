import { z } from 'zod';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './config';
import type { BaseErrorKey, ErrorWithResponse, ErrorWithoutResponse, Error, Meta } from './config';
import baseQueryWithZodValidation from './zod-validation-enhancer';

// move these to a DTO folder?
 const catImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const catBreedSchema = z.object({
  id: z.string(),
  name: z.string(),
  temperament: z.string().optional(),
  origin: z.string().optional(),
  description: z.string().optional(),
});

const catSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  breeds: z.array(catBreedSchema).optional(),
});

const favoriteCatSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  image_id: z.string(),
  sub_id: z.string().optional(),
  created_at: z.string(),
  image: catImageSchema,
});

// TypeScript types
export type CatImage = z.infer<typeof catImageSchema>;
export type CatBreed = z.infer<typeof catBreedSchema>;
export type Cat = z.infer<typeof catSchema>;
export type FavoriteCat = z.infer<typeof favoriteCatSchema>;

export type CatApiErrorKey = BaseErrorKey;

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZodValidation(axiosBaseQuery),
  tagTypes: ['Guest', 'Favorites', 'Cats'],
  endpoints: (builder) => ({
    // Guest user behavior - get random cats
    getRandomCats: builder.query<Cat[], { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: '/v1/images/search',
        params: {
          limit,
          has_breeds: 1, // Include breed information
        },
        dataSchema: z.array(catSchema),
      }),
      providesTags: ['Cats'],
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
    getCatById: builder.query<Cat, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/images/${id}`,
      }),
      providesTags: ['Cats'],
      extraOptions: {
        dataSchema: catSchema,
      },
    }),

    // Get cat breeds
    getCatBreeds: builder.query<CatBreed[], void>({
      query: () => ({
        url: '/v1/breeds',
      }),
      providesTags: ['Cats'],
      extraOptions: {
        dataSchema: z.array(catBreedSchema),
      },
    }),

    // Search cats by breed
    getCatsByBreed: builder.query<Cat[], { breedId: string; limit?: number }>({
      query: ({ breedId, limit = 10 }) => ({
        url: '/v1/images/search',
        params: {
          breed_ids: breedId,
          limit,
        },
      }),
      providesTags: ['Cats'],
      extraOptions: {
        dataSchema: z.array(catSchema),
      },
    }),

    // Favorites management
    getFavorites: builder.query<FavoriteCat[], void>({
      query: () => ({
        url: '/v1/favourites',
      }),
      providesTags: ['Favorites'],
      extraOptions: {
        dataSchema: z.array(favoriteCatSchema),
      },
    }),

    addToFavorites: builder.mutation<{ message: string; id: number }, { imageId: string }>({
      query: ({ imageId }) => ({
        url: '/v1/favourites',
        method: 'POST',
        body: {
          image_id: imageId,
          sub_id: 'cat-app-user', // to make it dynamic?
        },
      }),
      invalidatesTags: ['Favorites'],
    }),

    removeFromFavorites: builder.mutation<{ message: string }, { favoriteId: number }>({
      query: ({ favoriteId }) => ({
        url: `/v1/favourites/${favoriteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),

    // Guest user preferences (stored locally)
    getGuestPreferences: builder.query<{ favoriteBreeds: string[]; lastViewedCats: string[] }, void>({
      query: () => ({
        url: '/guest/preferences', // to make it a local storage endpoint?
        method: 'GET',
      }),
      providesTags: ['Guest'],
    }),

    updateGuestPreferences: builder.mutation<void, { favoriteBreeds?: string[]; lastViewedCats?: string[] }>({
      query: (preferences) => ({
        url: '/guest/preferences',
        method: 'POST',
        body: preferences,
      }),
      invalidatesTags: ['Guest'],
    }),
  }),
});

export default api;