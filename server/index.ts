import path from 'path';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import { Server, Origins } from 'boardgame.io/server';
import { DEFAULT_PORT } from '../src/config';
import { AirLandSea } from '../src/game';
import { SERVER_URL } from 'config/client';

const server = Server({
  games: [AirLandSea],
  origins: [SERVER_URL, Origins.LOCALHOST_IN_DEVELOPMENT],
});

server.app.use(
  historyApiFallback({
    index: 'index.html',
    whiteList: ['/games', '/.well-known'],
  }),
);
server.app.use(serve(path.join(__dirname, '../out')));

server.run(Number(process.env.PORT || DEFAULT_PORT));
