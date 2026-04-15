require('dotenv').config();

const app = require('./src/app');
const connectDatabase = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Try to connect to database (will warn if fails)
    await connectDatabase();
  } catch (error) {
    console.warn('⚠️  Database connection failed:', error.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`📝 API available at http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  });

  const shutDown = (signal) => {
    console.log(`${signal} received: closing server`);
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutDown('SIGINT'));
  process.on('SIGTERM', () => shutDown('SIGTERM'));
};

startServer();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
