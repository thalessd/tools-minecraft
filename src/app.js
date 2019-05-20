import "@babel/polyfill";
import "dotenv/config";
import * as minecraftServer from "./service/minecraftServer";
import * as telegramBot from "./service/telegramBot";
import path from "path";
import controller from "./controller";

const pathServerFolder = path.join(__dirname, "minecraft_server");

const mcServer = minecraftServer.start(pathServerFolder);

controller({ mcServer, bot: telegramBot.bot });

telegramBot.launch();
