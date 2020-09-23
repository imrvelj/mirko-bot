/* eslint: no-console: 0 */
import {config} from 'dotenv'
config()
import Koa from 'koa'
import {Bot} from './src/bot'

const app = new Koa()
const bot = Bot()

bot.login(process.env.BOT_TOKEN)
app.listen(process.env.PORT || 3030, () => console.log(`Mirko alive'n'kickin'!`))
