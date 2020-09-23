import {
  Client,
  Message,
  StreamDispatcher,
  RichEmbed,
  VoiceConnection,
} from 'discord.js'

import { joinChannel, printQueue } from './commands'
import { Queue } from './queue'
import { getYTStream } from './utils'

export function Bot() {
  let queue: Queue = []
  const instance = new Client()
  let connection: VoiceConnection = null
  let activeStream: StreamDispatcher | null = null

  const clear = () => {
    queue = []
    if (activeStream) {
      activeStream.stream.destroy()
      activeStream = null
    }
  }

  const handleMessage = async (message: Message) => {
    if (message.content.substring(0, 1) !== '!') {
      return
    }
    const [userCommand, ...args] = message.content.substring(1).split(' ')

    switch (userCommand) {
      case 'queue': {
        printQueue(message, queue)
        break
      }
      case 'clear': {
        clear()
        break
      }
      case 'join':
        connection = await joinChannel(message)
        break
      case 'leave':
        if (message.member.voiceChannel) {
          clear()
          message.member.voiceChannel.leave()
        } else {
          message.channel.send('You need to join a voice channel first!')
        }
        break
      case 'play': {
        connection = await joinChannel(message)
        const stream = await getYTStream(args[0])

        stream.on('info', ({ title }) => {
          if (queue.length === 0) {
            activeStream = connection.playStream(stream)
          }
          queue.push({
            name: title,
            stream,
          })
          const embed = new RichEmbed().setTitle(`${title} added to queue!`)
          message.channel.send(embed)
        })

        stream.on('end', () => {
          queue.shift()
          if (queue.length > 0) {
            connection.playStream(queue[0].stream)
          }
        })

        break
      }
      case 'pause':
        if (activeStream) {
          activeStream.pause()
        }
        break
      case 'resume':
        if (activeStream) {
          activeStream.resume()
        }
        break
      case 'next': {
        activeStream.stream.destroy()

        if (queue[1]) {
          connection.playStream(queue[1].stream)
          queue.shift()
        }
        break
      }
    }
  }

  instance.on('message', handleMessage)

  return instance
}
