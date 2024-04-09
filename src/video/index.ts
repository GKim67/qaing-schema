import { z } from 'nestjs-zod/z';

import { videoAtom } from './atom';

const { prefix } = videoAtom;

export default {
  ...videoAtom,
};
