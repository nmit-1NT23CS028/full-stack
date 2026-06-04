const Redis = require('ioredis');
const env = require('./env');
const logger = require('../utils/logger');

const redis = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: false
});

redis.on('error', (error) => {
  logger.error('Redis connection error', error.message);
});

module.exports = redis;
