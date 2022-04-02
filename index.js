const cron = require("node-cron");
const Parser = require("rss-parser");
const { Webhook } = require("simple-discord-webhooks");
const { writeFileSync, readFileSync } = require("fs");
const config = require("./config.json");

const parser = new Parser();
const postman = new Webhook(config.discordWebhookURL);

cron.schedule(config.cronDelay, async () => {
    const feed = await parser.parseURL("https://rpilocator.com/feed.rss");

    const toPost = [];
    const olds = readFileSync(`${__dirname}/old.txt`, "utf-8").replaceAll("\r\n", "\n").split("\n");
    const newOlds = [];

    for (let i = 0; i < feed.items.length; i++) {
        const item = feed.items[i];

        if (olds.indexOf(`${item.title}_${item.isoDate}`) === -1) {
            let count = 0;
            let title = item.title.replace("Stock Alert ", "");
            const country = title.slice(1, 3);

            for (let k = 0; k < config.keywords.length; k++) {
                if (item.title.includes(config.keywords[k])) count += 1;
            }

            if (count > 0) {
                toPost.push({
                    name: title.replace(/\(\w{2}\):/g, `:flag_${country.toLowerCase()}:`),
                    value: `[Click here](${item.link})`,
                });
            }

            newOlds.push(`${item.title}_${item.isoDate}`);
        }
    }

    if (newOlds.length > 0) {
        const embed = {
            title: "RPi Locator",
            color: 0xe91e63,
            thumbnail: {
                url: "https://rpilocator.com/favicon.png",
            },
            fields: toPost,
            footer: {
                text: "RPi Locator Webhook © LockBlock-dev",
            },
        };

        if (fields.length) {
            postman.send(`${config.ownerId ? `<@${config.ownerId}>` : ""}`, [embed]);

            writeFileSync(`${__dirname}/old.txt`, `\n${newOlds.join("\n")}`, {
                encoding: "utf-8",
                flag: "as",
            });
        }
    }
});
