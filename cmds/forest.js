
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('forest')
        .setDescription('Server Information!'),
    async execute(client, interaction) {
        console.log('forest command run');
    }
}


