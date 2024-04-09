import { z } from 'nestjs-zod/z';

export const imageAtom = {
  prefix: '/issue/image',
  id: z.string().regex(/^[0-9a-f]{24}$/),
  originImageUrl: z.string().url().describe('원본 이미지 URL'),
  editedImageUrl: z.string().url().describe('편집된 이미지 URL'),
  isValid: z.boolean().describe('유효 이미지 여부'),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
};
