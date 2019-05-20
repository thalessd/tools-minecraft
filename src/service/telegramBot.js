import Telegraf from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.help(ctx => ctx.reply("Servidor em teste"));

function launch() {
  bot.launch();
}

export { bot, launch };
