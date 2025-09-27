import { type AxiosRequestConfig } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';

// Base error types
export type BaseErrorKey = 'networkError' | 'timeout' | 'unknown' | 'invalidApiKey' | 'rateLimited';

export interface ErrorWithResponse<TKey extends BaseErrorKey = BaseErrorKey> {
  status: number;
  data: any;
  key: TKey;
}

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
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  Error
> = async ({ url, method = 'GET', data, params, headers }, { signal }) => {
  try {
    // Import axios dynamically to avoid circular dependencies
    const axios = (await import('axios')).default;

    //later make some url is always provided
    const baseURL = import.meta.env.VITE_API_URL || 'https://api.thecatapi.com';

    const result = await axios({
      url: `${baseURL}${url}`,
      method,
      data,
      params,
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY || '',
        ...headers,
      },
      signal,
    });

    return { data: result.data };
  } catch (axiosError: any) {
    if (axiosError.response) {
      // Server responded with error status
      return {
        error: {
          status: axiosError.response.status,
          data: axiosError.response.data,
          key: 'unknown' as BaseErrorKey,
        },
      };
    } else if (axiosError.request) {
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
          error: axiosError.message,
          key: 'unknown' as BaseErrorKey,
        },
      };
    }
  }
};
