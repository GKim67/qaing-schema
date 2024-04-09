import { z } from 'nestjs-zod/z';

import { folderAtom } from '../folder/atom';
import { eventsBundleAtom, issueAtom } from './atom';
import eventsBundle from './eventsBundle';
import image from './image';

const { prefix } = issueAtom;

export default {
  ...issueAtom,
  image,
  eventsBundle,
  getById: {
    prefix,
    operation: { summary: '이슈 조회' },
    method: 'get' as const,
    path: (id: string) => `/byId/${id}`,
    data: z.object({
      _id: issueAtom.id,
      name: issueAtom.name,
      description: issueAtom.description,
      tag: issueAtom.tag,
      folder: z.object({
        _id: folderAtom.id,
        name: folderAtom.name,
        type: folderAtom.type,
        permission: folderAtom.permission,
      }),
      browserInfo: z.object({
        userAgent: issueAtom.browserInfo.userAgent.optional(),
        windowSize: issueAtom.browserInfo.windowSize.optional(),
        url: issueAtom.browserInfo.url.optional(),
        ip: issueAtom.browserInfo.ip.optional(),
        createdAt: issueAtom.browserInfo.createdAt,
      }),
      image: z
        .object({
          _id: issueAtom.id,
          originFileUrl: z.string().optional(),
          editedFileUrl: z.string().optional(),
        })
        .optional(),
      video: z
        .object({
          _id: z.string(),
          fileUrl: z.string(),
        })
        .optional(),
      replay: z
        .object({
          eventsUrl: eventsBundleAtom.eventsUrl,
        })
        .optional(),
      network: z
        .object({
          eventsUrl: eventsBundleAtom.eventsUrl,
        })
        .optional(),
    }),
  },
  deleteById: {
    prefix,
    operation: { summary: '이슈 삭제' },
    method: 'delete' as const,
    path: (id: string) => `/byId/${id}`,
    data: issueAtom.id,
  },
  post: {
    prefix,
    operation: { summary: '이슈 생성' },
    method: 'post' as const,
    path: () => '/',
    body: z.object({
      folderId: folderAtom.id,
      name: issueAtom.name.optional(),
      comment: issueAtom.comment.optional(),
      description: issueAtom.description.optional(),
    }),
    data: issueAtom.id,
  },
  postToDefaultFolder: {
    prefix,
    operation: { summary: '이슈 생성', description: '기본 폴더에 이슈 생성' },
    method: 'post' as const,
    path: () => '/toDefaultFolder',
    body: z.object({
      name: issueAtom.name.optional(),
      comment: issueAtom.comment.optional(),
      description: issueAtom.description.optional(),
      browserInfo: z
        .object({
          userAgent: issueAtom.browserInfo.userAgent.optional(),
          windowSize: issueAtom.browserInfo.windowSize.optional(),
          url: issueAtom.browserInfo.url.optional(),
        })
        .optional(),
    }),
    data: issueAtom.id,
  },
  patchById: {
    prefix,
    operation: { summary: '이슈 수정' },
    method: 'patch' as const,
    path: (id: string) => `/byId/${id}`,
    body: z.object({
      name: issueAtom.name.optional(),
      tag: issueAtom.tag.optional(),
      description: issueAtom.description.optional(),
    }),
    data: issueAtom.id,
  },
  putFolderIdById: {
    prefix,
    operation: {
      summary: '이슈 이동',
      description: '이슈를 다른 폴더로 이동합니다',
    },
    method: 'put' as const,
    path: (id: string) => `/folderId/byId/${id}`,
    body: z.object({
      folderId: folderAtom.id,
    }),
    data: issueAtom.id,
  },
  putFolderIdByFolderId: {
    prefix,
    operation: {
      summary: '이슈 이동',
      description: '폴더 안의 모든 이슈들을 다른 폴더로 이동합니다',
    },
    method: 'put' as const,
    path: (folderId: string) => `/folderId/byFolderId/${folderId}`,
    body: z.object({
      folderId: folderAtom.id,
    }),
    data: z.number(),
  },
};
