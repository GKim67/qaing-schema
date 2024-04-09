import { z } from 'nestjs-zod/z';

import { eventsBundleAtom, imageAtom, issueAtom } from '../issue/atom';
import { folderAtom } from './atom';

const { prefix } = folderAtom;

export default {
  ...folderAtom,
  getByMe: {
    prefix,
    operation: { summary: '내 폴더 리스트 반환' },
    method: 'get' as const,
    path: () => `/byMe`,
    data: z.array(
      z.object({
        _id: folderAtom.id,
        folderName: folderAtom.name,
        issuesLength: z.number(),
        status: folderAtom.status,
        type: folderAtom.type,
        createdAt: folderAtom.createdAt,
        updatedAt: folderAtom.updatedAt,
        sharedUrlPermission: folderAtom.sharedUrlPermission,
      }),
    ),
  },
  getById: {
    prefix,
    operation: { summary: '폴더 조회' },
    method: 'get' as const,
    path: (folderId: string) => `/byId/${folderId}`,
    data: z.object({
      folderName: folderAtom.name,
      sharedUrlPermission: folderAtom.sharedUrlPermission,
      status: folderAtom.status,
      permission: folderAtom.permission,
      issues: z.array(
        z.object({
          _id: issueAtom.id,
          issueName: issueAtom.name,
          desc: issueAtom.description,
          tags: issueAtom.tag,
          images: z.array(
            z.object({
              _id: imageAtom.id,
              originImageUrl: imageAtom.originImageUrl,
              editedImageUrl: imageAtom.editedImageUrl,
            }),
          ),
          video: z
            .object({
              _id: z.string(),
              originVideoUrl: z.string(),
            })
            .optional(),
          replay: z
            .object({ eventsUrl: eventsBundleAtom.eventsUrl })
            .optional(),
        }),
      ),
    }),
  },
  deleteById: {
    prefix,
    operation: { summary: '폴더 삭제' },
    method: 'delete' as const,
    path: (folderId: string) => `/byId/${folderId}`,
    data: folderAtom.id,
  },
  post: {
    prefix,
    operation: { summary: '폴더 생성' },
    method: 'post' as const,
    path: () => `/`,
    body: z.object({
      folderName: folderAtom.name,
    }),
    data: folderAtom.id,
  },
  patchById: {
    prefix,
    operation: { summary: '폴더 수정' },
    method: 'patch' as const,
    path: (folderId: string) => `/byId/${folderId}`,
    body: z.object({
      folderName: folderAtom.name.optional(),
    }),
    data: folderAtom.id,
  },
  patchUrlPermission: {
    prefix,
    operation: { summary: '폴더 공유 URL 권한 수정' },
    method: 'patch' as const,
    path: (folderId: string) => `/sharedUrlPermission/byId/${folderId}`,
    body: z.object({
      sharedUrlPermission: folderAtom.sharedUrlPermission,
    }),
    data: folderAtom.id,
  },
};
