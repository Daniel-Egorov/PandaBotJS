
module.exports = {
    name: "interactionCreate",
    execute(client, interaction) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction);
        }
        catch (error) {
            console.log(error);

        }
    }
}