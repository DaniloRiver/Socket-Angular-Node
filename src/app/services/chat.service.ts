import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService:WebsocketService
  ) { }

  sendMessage(mensaje:string){

    const payload = {
      de:this.wsService.getUsuario().nombre,
      cuerpo:mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessages(): Observable<any>{
    return this.wsService.listen('mensaje-nuevo');
  }

  getMessagesPrivate(){
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos(){
    return this.wsService.listen('usuarios-activos');
  }

  emitirUsuarosActivos(){
    this.wsService.emit('obtener-usuarios');
  }


}
