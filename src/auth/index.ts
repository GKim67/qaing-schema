import { z } from 'nestjs-zod/z';

import { authAtom } from './atom';

const { prefix } = authAtom;

export default {
  ...authAtom,
  get: {
    prefix,
    operation: {
      summary: '로그인 한 유저 간단한 정보 조회',
      description: 'Access Token의 유저 정보 조회',
    },
    method: 'get' as const,
    path: () => `/`,
    data: z.object({
      _id: z.string(),
      email: z.string(),
      name: z.string(),
      profileImageUrl: z.string(),
      isSignuped: z.boolean(),
      iat: z.number().optional(),
      exp: z.number().optional(),
    }),
  },
  delete: {
    prefix,
    operation: {
      summary: '로그아웃',
      description: 'Access Token을 삭제',
    },
    method: 'delete' as const,
    path: () => `/`,
  },
};
