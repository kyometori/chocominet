const { MessageEmbed } = require('discord.js');

module.exports = {
  type: 'CHAT_INPUT',
  name: 'help',
  description: '感覺徬徨無助嗎......？',
  options: [{
    type: 'STRING',
    name: '指令名稱',
    description: '特別想知道誰的用法嗎',
    autocomplete: true,
  }],
  async execute(interaction) {
    await interaction.deferReply();
    const name = interaction.options.getString('指令名稱');
    const res = new MessageEmbed()
      .setAuthor({ name: `${interaction.client.settings.name} 幫助中心`, iconURL: interaction.client.user.displayAvatarURL() })
      .setColor(0xE4FFF6);

    if (!name) {
      const list = interaction.client.commands
        .filter(command => {
          return command.type === 'CHAT_INPUT';
        })
        .map(command => {
          return `\`/${format(command.name, 10)}\`：${command.description}`;
        });

      res.setDescription(list.join('\n'))
        .setFooter({ text: `${interaction.user.tag}・cHoCoMiNt iCE!`, iconURL: interaction.user.displayAvatarURL() });

      return interaction.editReply({ embeds: [res] });
    }
    const command = interaction.client.commands.get(name);
    if (!command) {
      res.setDescription('沒有這個指令');
      return interaction.editReply({ embeds: [res] });
    }

    res.addFields({
      name: '指令名稱',
      value: command.name
    }, {
      name: '說明',
      value: command.description
    });

    interaction.editReply({ embeds: [res] });
  }
}

function format(string, size) {
  if (string.length < size) {
    for (let i=string.length; i<size; i++) string += ' ';
  }
  return string
}
