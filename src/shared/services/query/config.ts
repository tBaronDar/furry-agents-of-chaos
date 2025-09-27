import { type AxiosRequestConfig, type AxiosError } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';

// Base error types
export type BaseErrorKey = 'networkError' | 'timeout' | 'unknown' | 'invalidApiKey' | 'rateLimited';

export type ErrorWithResponse<ErrorKey = BaseErrorKey, Data = unknown> = {
  status: number;
  data: Data;
  key: ErrorKey;
};

export interface ErrorWithoutResponse<TKey extends BaseErrorKey = BaseErrorKey> {
  status: 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
  error: string;
  key: TKey;
}

export type Error<TKey extends BaseErrorKey = BaseErrorKey> = ErrorWithResponse<TKey> | ErrorWithoutResponse<TKey>;

export interface Meta {
  hasResponse: boolean;
}

// Axios base query function
export const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: Record<string, unknown>;
    params?: Record<string, unknown>;
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  Error
> = async ({ url, method = 'GET', data, params, headers }, { signal }) => {
  try {
    // Import axios dynamically to avoid circular dependencies
    const axios = (await import('axios')).default;

    //later make some url is always provided
    const baseURL = (import.meta.env.VITE_API_URL as string) || 'https://api.thecatapi.com';

    const result = await axios({
      url: `${baseURL}${url}`,
      method,
      data,
      params,
      headers: {
        'x-api-key': (import.meta.env.VITE_API_KEY as string) || '',
        ...headers,
      },
      signal,
    });

    return { data: result.data };
  } catch (axiosError: unknown) {
    const error = axiosError as AxiosError;

    if (error.response) {
      // Server responded with error status
      return {
        error: {
          status: error.response.status,
          data: error.response.data,
          key: 'unknown' as BaseErrorKey,
        },
      };
    } else if (error.request) {
      // Network error
      return {
        error: {
          status: 'FETCH_ERROR' as const,
          error: 'Network Error',
          key: 'networkError' as BaseErrorKey,
        },
      };
    } else {
      // Other error
      return {
        error: {
          status: 'CUSTOM_ERROR' as const,
          error: error.message || 'Unknown error occurred',
          key: 'unknown' as BaseErrorKey,
        },
      };
    }
  }
};
