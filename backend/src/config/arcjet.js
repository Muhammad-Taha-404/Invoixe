import arcjet, { shield, detectBot } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: process.env.NODE_ENV === 'development' ? 'DRY_RUN' : 'LIVE',
      allow: [
        'POSTMAN',
        'CATEGORY:SEARCH_ENGINE',
        'CATEGORY:TOOL',
        'CATEGORY:MONITOR', // Uptime monitoring services
        'CATEGORY:PREVIEW', // Link previews e.g. Slack, Discord
      ],
    }),
  ],
});

export default aj;
