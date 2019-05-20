export default ({ mcServer, bot }) => {
  bot.start(ctx => {
    ctx.reply("Escutando Servidor");

    mcServer.on("chat", data => {
      ctx.reply(JSON.stringify(data));
    });

    mcServer.on("user_login", data => {
      ctx.reply(JSON.stringify(data));
    });

    mcServer.on("user_logout", data => {
      ctx.reply(JSON.stringify(data));
    });
  });

  mcServer.on("error", () => {
    console.err("Err");
  });

  mcServer.on("server_up", () => {
    console.log("O Servidor Iniciou");
  });

  mcServer.on("chat", data => {
    console.log(data);
  });

  mcServer.on("user_login", data => {
    console.log(data);
  });

  mcServer.on("user_logout", data => {
    console.log(data);
  });
};
