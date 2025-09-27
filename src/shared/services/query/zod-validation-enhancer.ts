import { z } from 'zod';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import type { Error } from './config';

// only validates API responses
export default function baseQueryWithZodValidation<TArgs, TResult, TError = Error>(
  baseQuery: BaseQueryFn<TArgs, TResult, TError>
): BaseQueryFn<TArgs & { dataSchema?: z.ZodSchema }, TResult, TError> {
  return async (args, api, extraOptions) => {
    const { dataSchema, ...baseArgs } = args as TArgs & { dataSchema?: z.ZodSchema };
    
    const result = await baseQuery(baseArgs as TArgs, api, extraOptions);
    
    // If there's an error, return it as-is
    if ('error' in result) {
      return result;
    }
    
    // Validate response data if schema provided
    if (dataSchema && 'data' in result) {
      try {
        const validatedData = dataSchema.parse(result.data);
        return { data: validatedData as TResult };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            error: {
              status: 'PARSING_ERROR' as const,
              error: `Validation failed: ${error.issues.map(e => e.message).join(', ')}`,
              key: 'unknown' as const,
            } as TError,
          };
        }
        throw error;
      }
    }
    
    return result;
  };
}

