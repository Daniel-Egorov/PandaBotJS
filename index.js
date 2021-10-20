const discord = require('discord.js');

// We need access to all of these flags
const { Intents } = require('discord.js');
let intents = new Intents();
intents.add(
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
);

// This is to allow the bot to receive DMs
// the other partials may be used to allow
// those partials to be sent to the client
let partials = [
    "CHANNEL",
    // "USER",
    // "GUILD_MEMBER",
    // "MESSAGE",
    // "REACTION"
];

// initialize the client
const client = new discord.Client({ intents: intents, partials: partials });
client.commands = new discord.Collection();

const config = require('./config.json');

const fs = require('fs');

// load all the event files as well as command files into the bot
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const cmdFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

if (eventFiles === null) {
    console.log('no event files found');
}
else {
    for (let i = 0; i < eventFiles.length; i++) {
        const event = require(`./events/${eventFiles[i]}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
        console.log(`Loaded ${i + 1}: /events/${eventFiles[i]}`);
    } 
}
if (cmdFiles === null) {
    console.log('no command files found');
}
else {
    for (let i = 0; i < cmdFiles.length; i++) {
        const cmd = require(`./cmds/${cmdFiles[i]}`);
        client.commands.set(cmd.data.name, cmd);
        console.log(`Loaded ${i + 1}: /cmds/${cmdFiles[i]}`);
    }
}

// start the bot
client.login(config.token);

