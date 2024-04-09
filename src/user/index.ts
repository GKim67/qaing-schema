import { z } from 'nestjs-zod/z';

import { userAtom } from './atom';

const { prefix } = userAtom;

export default {
  ...userAtom,
  getByMe: {
    prefix,
    operation: {
      summary: '로그인 한 유저 정보 조회',
      description: '로그인 하지 않은 유저는 빈 오브젝트를 반환합니다',
    },
    method: 'get' as const,
    path: () => `/byMe`,
    data: z
      .object({
        accessToken: z.string(),
        _id: z.string(),
        userEmail: z.string(),
        isSignuped: z.boolean(),
        userCompany: z.string().optional(),
        userJob: z.string().optional(),
        userName: z.string().optional(),
        userPhoneNumber: z.string().optional(),
        userProductType: z.string().optional(),
        userTeamsize: z.string().optional(),
        userProfileImg: z.string(),
      })
      .or(z.object({})),
  },
};
