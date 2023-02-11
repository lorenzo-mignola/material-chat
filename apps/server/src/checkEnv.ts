import dotenv from 'dotenv';
import logger from './logger';

const exit = (log: string) => {
  logger.error(log);
  process.exit(1);
};

const checkEnv = () => {
  dotenv.config();
  const { PORT } = process.env;

  if (!PORT) {
    exit('Missing env PORT');
  }
};
export default checkEnv;
