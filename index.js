const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = '¡';
const OWNER_ID = '1246274394515443726';

client.on('ready', () => {
  console.log(`Bot listo! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'announce') {
    if (message.author.id !== OWNER_ID) return;

    const announcement = args.join(' ');
    if (!announcement && message.attachments.size === 0) {
      return message.reply('Por favor escribe un mensaje o adjunta una imagen/gif.');
    }

    const embed = new EmbedBuilder()
      .setColor('#3aff00')
      .setDescription(announcement || '\u200B');

    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      embed.setImage(attachment.url);
    }

    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
