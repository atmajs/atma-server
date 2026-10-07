import { Uri } from './dependency';

const dirname = typeof __dirname === 'undefined' ? process.cwd() : __dirname;
export const LIB_DIR: any = new Uri(`file://${dirname}/`);
