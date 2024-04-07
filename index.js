const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, welcomeChannelId, generalChatId, musicPlaylistsChannelId, eighteenChannelId, introChannelId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`);
    
    readyClient.user.setPresence({
        activities: [{ 
            name: 'Grand Theft Auto VI',
            type: ActivityType.Playing
        }],
        status: 'idle',
    });
});

client.on(Events.GuildMemberAdd, member => {
    const generalChat = member.guild.channels.cache.get(generalChatId);
    if (generalChat) {
        const welcomeMessage2 = `**Welcome to Mystic Lounge** ${member}❕`;
        generalChat.send(welcomeMessage2)
            .then(() => console.log(`Welcome message sent in main chat for ${member.user.username}`))
            .catch(error => console.error('Error sending welcome message:', error));
    }

    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (welcomeChannel) {
        const rolesChannelId = '1225592180228358155';
        const verifyChannelId = '1215005916039094333';
        const welcomeMessage = `**Welcome to Mystic Lounge,** ${member}❕\n\n**Head over to** <#${rolesChannelId}> **and then** <#${verifyChannelId}>❕`;
        
        welcomeChannel.send({
            content: welcomeMessage,
            files: ['WelcomeBanner.png']
        })
        .then(() => console.log(`Welcome message sent in welcome channel for ${member.user.username}`))
        .catch(error => console.error('Error sending welcome message:', error));
    }
});

client.on(Events.MessageCreate, async message => {
    const phrasesToReact = ['harder', 'coming', 'big', 'huge', 'deep', 'rough', 'come', 'hard', 'squeeze'];

    if (message.channel.id === eighteenChannelId && phrasesToReact.some(phrase => message.content.includes(phrase))) {
        try {
            await message.react('🍑');
            console.log("Message sent 18 plus");
            await message.reply({
                content: "that's what she said"
            });
        } catch (error) {
            console.error('Failed to react or reply:', error);
        }
    }

    if (message.channel.id === musicPlaylistsChannelId && message.content.includes('http')) {
        try {
            await message.react('🎼');
            await message.react('🔥');
            await message.react('🎹');
            console.log("Message sent playlists");
            await message.reply({
                content: "**Thanks for sharing your playlist❕** 🎶 🎹",
                files: ["Banner.png"]
            });
        } catch (error) {
            console.error('Failed to react or reply:', error);
        }
    }

    if (message.channel.id === introChannelId) {
        try {
            await message.react('❤️');
        } catch (error) {
            console.error('Failed to react:', error);
        }
    }

    
    if (message.channel.id === selfiesChannelId) {
        try {
            await message.react('❤️');
            await message.react('🔥');
        } catch (error) {
            console.error('Failed to react:', error);
        }
    }

});


client.login(token);