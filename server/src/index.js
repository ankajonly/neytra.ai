import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`Server listening on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();