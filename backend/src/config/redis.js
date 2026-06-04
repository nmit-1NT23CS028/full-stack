const Redis = require('ioredis');
const env = require('./env');

const redis = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: false
});

redis.on('error', () => {});

module.exports = redis;
