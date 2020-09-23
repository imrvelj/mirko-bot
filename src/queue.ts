import { Readable } from 'stream'

interface Item {
  name: string
  stream: Readable
}

export type Queue = Item[]
