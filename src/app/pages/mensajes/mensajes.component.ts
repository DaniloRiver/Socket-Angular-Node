import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {

  constructor(
    public wsService:WebsocketService
  ){}

  salir(){
    this.wsService.logoutws();
  }

}
