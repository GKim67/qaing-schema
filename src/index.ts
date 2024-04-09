import auth from './auth';
import folder from './folder';
import issue from './issue';
import user from './user';
import video from './video';

export { z } from 'nestjs-zod/z';
export type * from 'nestjs-zod/z';
export const schemas = {
  auth,
  folder,
  issue,
  user,
  video,
};
export default schemas;
