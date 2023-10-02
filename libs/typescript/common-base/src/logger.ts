import { pino } from 'pino';

const pinoInstance = pino();
const suppress = {
  info: false,
  error: false,
  warn: false
}

export const logger = {
  info(obj: object, msg: string) {
    if (!suppress.info) pinoInstance.info(obj, msg);
  },
  error(obj: object, msg: string) {
    if (!suppress.error) pinoInstance.error(obj, msg);
  },
  warn(obj: object, msg: string) {
    if (!suppress.warn) pinoInstance.warn(obj, msg);
  },
  suppress(level: keyof typeof suppress) {
    suppress[level] = true;
    pinoInstance.info({level}, 'suppressed');
  }
}
