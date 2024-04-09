import { z } from 'nestjs-zod/z';

export * from './eventsBundle/atom';
export * from './image/atom';
export const issueAtom = {
  prefix: '/issue',
  id: z.string().regex(/^[0-9a-f]{24}$/),
  name: z.string().trim().min(1).describe('이슈 이름'),
  comment: z
    .string()
    .trim()
    .default('')
    .describe('크롬 익스텐션에서 입력된 코멘트'),
  description: z.string().trim().default('').describe('이슈 설명'),
  tag: z.string(),
  browserInfo: {
    userAgent: z.string(),
    windowSize: z.string(),
    url: z.string(),
    ip: z.string(),
    createdAt: z.string().datetime(),
  },
};
