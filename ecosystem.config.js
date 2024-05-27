module.exports = {
  apps: [
    {
      name: 'telegram-bot-skyhigh',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

