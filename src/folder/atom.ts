import { z } from 'nestjs-zod/z';

export const folderAtom = {
  prefix: '/folders',
  id: z.string().regex(/^[0-9a-f]{24}$/),
  name: z.string().trim().min(1).describe('폴더 이름'),
  sharedUrlPermission: z
    .enum(['denied', 'canView', 'canEdit'])
    .describe('폴더 공유 링크 권한'),
  status: z.enum(['READY', 'IN_PROGRESS', 'ERROR', 'DONE']),
  type: z.enum(['default']).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  permission: z.object({
    isCanView: z.boolean(),
    isCanEdit: z.boolean(),
    isOwner: z.boolean(),
  }),
};
