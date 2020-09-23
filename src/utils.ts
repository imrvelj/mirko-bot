import ytdl from 'ytdl-core'

async function getYTStream(url: string) {
  try {
    const stream = ytdl(url, {
      filter: 'audioonly',
    })
    return stream
  } catch (error) {
    throw new Error(error)
  }
}

export {
  getYTStream
}
