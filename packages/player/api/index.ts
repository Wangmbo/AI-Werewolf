// api/player/start-game.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PlayerServer } from '../src/PlayerServer';
import { ConfigLoader } from '../src/config/PlayerConfig';

const configLoader = new ConfigLoader();
const config = configLoader.getConfig();
const playerServer = new PlayerServer(config);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const params = req.body;
    await playerServer.startGame(params);
    res.json({ message: 'Game started successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to start game' });
  }
}
