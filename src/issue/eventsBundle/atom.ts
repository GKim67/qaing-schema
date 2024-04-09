import { z } from 'nestjs-zod/z';

export const eventsBundleAtom = {
  prefix: '/issue/eventsBundle',
  type: z.enum(['replay', 'network']),
  eventsUrl: z.string().url().describe('events JSON 파일 URL'),
};
