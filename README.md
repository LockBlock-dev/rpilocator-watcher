# rpilocator watcher

[![rss-parser](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/rpilocator-watcher/rss-parser)](https://www.npmjs.com/package/rss-parser) [![simple-discord-webhooks](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/rpilocator-watcher/simple-discord-webhooks)](https://www.npmjs.com/package/simple-discord-webhooks)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/rpilocator-watcher.svg)](https://github.com/LockBlock-dev/rpilocator-watcher/stargazers)

A bot that monitors rpilocator and send available offers to a Discord webhook

There is a known bug of the bot sending empty embed!

## Installation

-   Install [NodeJS](https://nodejs.org).
-   Download or clone the project.
-   Run `npm install`.
-   In the [config.json](./index.json), you need to edit the WEBHOOK URL and the COOKIE:

```json
{
    "discordWebhookURL": "https://discord.com/api/webhooks/XXX/XXX", //Discord WebHook URL
    "cronDelay": "*/60 * * * * *", //cron job delay, this is each 60 seconds
    "keywords": ["RPi 4 Model B - 4GB RAM", "RPi 3 Model A+ - 512MB RAM"], //the type or raspberry you want, see https://rpilocator.com for examples
    "ownerId": "123456789012345678" //you're Discord ID for the ping
}
```

-   Run `node index.js` OR `npm start`.

## Credits

[rpilocator](https://rpilocator.com/)

## Copyright

See the [license](/LICENSE)
