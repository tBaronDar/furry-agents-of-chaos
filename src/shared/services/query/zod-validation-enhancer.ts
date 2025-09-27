import { z } from 'zod';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import type { Error, Meta } from './config';

// Enhanced base query with Zod validation
export default function baseQueryWithZodValidation<TArgs, TResult, TError = Error>(
  baseQuery: BaseQueryFn<TArgs, TResult, TError>
): BaseQueryFn<TArgs & { extraOptions?: { dataSchema?: z.ZodSchema } }, TResult, TError> {
  return async (args, api, extraOptions) => {
    const { extraOptions: zodOptions, ...baseArgs } = args;
    
    const result = await baseQuery(baseArgs, api, extraOptions);
    
    // If there's an error, return it as-is
    if ('error' in result) {
      return result;
    }
    
    // If we have a schema and data, validate it
    if (zodOptions?.dataSchema && 'data' in result) {
      try {
        const validatedData = zodOptions.dataSchema.parse(result.data);
        return { data: validatedData };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            error: {
              status: 'PARSING_ERROR' as const,
              error: `Validation failed: ${error.errors.map(e => e.message).join(', ')}`,
              key: 'unknown' as const,
            },
          };
        }
        throw error;
      }
    }
    
    return result;
  };
}

