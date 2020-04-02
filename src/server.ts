import { settings } from 'nexus-future';
import logger from './util/logger';

async function main() {
  const port = Number(process.env.PORT || 3500);

  settings.change({
    server: {
      port,
      playground: true,
    },
  });

  logger.info('Graphql server started!', {
    port,
  });
}

main();
