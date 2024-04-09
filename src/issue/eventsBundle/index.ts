import { z } from 'nestjs-zod/z';

import { issueAtom } from '../atom';
import { eventsBundleAtom } from './atom';

const { prefix } = eventsBundleAtom;

export default {
  ...eventsBundleAtom,
  postById: {
    prefix,
    operation: {
      summary: '이슈에 이벤트번들 추가',
      description: 'presigend url 발급',
    },
    method: 'post' as const,
    path: (eventType: string, issueId: string) =>
      `/${eventType}/byId/${issueId}`,
    data: z.object({
      url: z.string(),
      fields: z.record(z.string(), z.string()),
    }),
  },
  deleteById: {
    prefix,
    operation: {
      summary: '이슈에 이벤트번들 삭제',
      description: '이슈에 이벤트번들 삭제',
    },
    method: 'delete' as const,
    path: (eventType: string, issueId: string) =>
      `/${eventType}/byId/${issueId}`,
    data: issueAtom.id,
  },
  putIsValidById: {
    prefix,
    operation: { summary: '이벤트번들 유효성 변경' },
    method: 'put' as const,
    path: (eventType: string, id: string) => `/${eventType}/isValid/byId/${id}`,
    data: issueAtom.id,
  },
};
