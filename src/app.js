import "@babel/polyfill";
import * as minecraftServer from "./service/minecraftServer";
import path from "path";

const pathServerFolder = path.join(__dirname, "minecraft_server");
const event = minecraftServer.start(pathServerFolder);

event.on("error", () => {
  console.err("Err");
});

event.on("server_up", () => {
  console.log("O Servidor Iniciou");
});

event.on("chat", data => {
  console.log(data);
});

event.on("user_login", data => {
  console.log(data);
});

event.on("user_logout", data => {
  console.log(data);
});
