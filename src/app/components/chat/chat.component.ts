import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{

  texto="";
  mensajesSubscription: Subscription = new Subscription;
  elemento: HTMLElement | null  = null;
  mensajes: any[] = [];

  constructor(
    public chatService:ChatService
  ){}

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

ngOnInit() {
  this.elemento = document.getElementById('chat-mensajes') as HTMLElement | null;

  if (this.elemento) { // Verifica si elemento no es null
    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento!.scrollTop = this.elemento!.scrollHeight;
      }, 50);
    });
  }
}


  enviar(){
    if( this.texto.trim().length === 0){
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = "";
  }
}
