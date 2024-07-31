import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { SERVER_PORT } from '../global/environment';

import * as socket from '../sockets/socket';

export default class Server {
  public app: express.Application;
  public port: number;
  private httpServer: http.Server;
  public io: SocketIOServer;

  private static _instance: Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: "http://localhost:4200",  // Asegúrate de que esto coincida con el origen de tu cliente
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    this.io.on('connection', (cliente) => { // detectar que el cliente se conecta
      console.log('Cliente conectado');


      //Mensajes
      socket.mensaje( cliente, this.io );

      //Desconectar cliente
      socket.desconectar( cliente );


      // Aquí puedes agregar más eventos de socket según sea necesario
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
