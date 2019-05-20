import shelljs from "shelljs";
import events from "events";

function _chatEmitter(eventEmitter, consoleOutLine) {
  const match = consoleOutLine.match(
    /^\[[\d:]{8}][ ]\[Server thread\/INFO]:[ ]<([\w ]*)>[ ](.*)$/
  );

  if (!match) {
    return;
  }

  eventEmitter.emit("chat", {
    user: match[1],
    msg: match[2]
  });
}

function _serverUpEmitter(eventEmitter, consoleOutLine) {
  const match = consoleOutLine.match(
    /^\[[\d:]{8}][ ]\[Server thread\/INFO]: Done \([\w.]*\)!.+$/
  );

  if (!match) {
    return;
  }

  eventEmitter.emit("server_up");
}

function _loginEmitter(eventEmitter, consoleOutLine) {
  const match = consoleOutLine.match(
    /^\[[\d:]{8}][ ]\[Server thread\/INFO]: ([\w ]+)\[\/([\d.]+):([\d]+)] logged in with entity id ([\d]+) at \(([\d-.]+), ([\d-.]+), ([\d-.]+)\)$/
  );

  if (!match) {
    return;
  }

  eventEmitter.emit("user_login", {
    user: match[1],
    ip: match[2],
    port: match[3],
    entityId: match[4],
    coord: {
      x: Math.round(match[5]),
      y: Math.round(match[6]),
      z: Math.round(match[7])
    }
  });
}

function _logoutEmitter(eventEmitter, consoleOutLine) {
  const match = consoleOutLine.match(
    /^\[[\d:]{8}][ ]\[Server thread\/INFO]: ([\w ]+) left the game$/
  );

  if (!match) {
    return;
  }

  eventEmitter.emit("user_logout", {
    user: match[1]
  });
}

function start(pathServer) {
  const eventEmitter = new events.EventEmitter();

  shelljs.cd(pathServer);

  const proccess = shelljs.exec(
    `java -Xmx1024M -Xms1024M -jar server.jar nogui`,
    { silent: true, async: true }
  );

  proccess.stdout.on("data", consoleOutLine => {
    consoleOutLine = consoleOutLine.trim();

    _serverUpEmitter(eventEmitter, consoleOutLine);
    _chatEmitter(eventEmitter, consoleOutLine);
    _loginEmitter(eventEmitter, consoleOutLine);
    _logoutEmitter(eventEmitter, consoleOutLine);
  });

  proccess.stderr.on("data", consoleErrLine => {
    eventEmitter.emit("error", consoleErrLine);
  });

  return eventEmitter;
}

export { start };
