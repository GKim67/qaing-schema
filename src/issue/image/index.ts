import { z } from 'nestjs-zod/z';

import { imageAtom } from './atom';

const { prefix } = imageAtom;

export default {
  ...imageAtom,
  postById: {
    prefix,
    operation: {
      summary: '이슈에 이미지 추가',
      description: 'presigend url 발급',
    },
    method: 'post' as const,
    path: (issueId: string) => `/byId/${issueId}`,
    data: z.object({
      url: z.string(),
      fields: z.record(z.string(), z.string()),
    }),
  },
  deleteById: {
    prefix,
    operation: { summary: '이슈에 이미지 삭제' },
    method: 'delete' as const,
    path: (id: string) => `/byId/${id}`,
    data: z.string(),
  },
  putIsValidById: {
    prefix,
    operation: { summary: '이미지 유효성 변경' },
    method: 'put' as const,
    path: (id: string) => `/isValid/byId/${id}`,
    data: imageAtom.id,
  },
};
