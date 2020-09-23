import { Message, RichEmbed } from 'discord.js'
import { Queue } from './queue'

export async function joinChannel({ member, channel }: Message) {
  if (member.voiceChannel) {
    const connection = await member.voiceChannel.join()
    return connection
  } else {
    channel.send('You need to join a voice channel first!')
    throw new Error('You need to join a voice channel first!')
  }
}

export function printQueue({ channel }: Message, queue: Queue = []) {
  if (queue.length) {
    const message = queue.reduce(
      (acc, item, index) => `${acc}${index + 1}. ${item.name}\n`,
      ''
    )
    channel.send('```' + message + '```')
  } else {
    channel.send('Nothing is playing :(')
  }
}
