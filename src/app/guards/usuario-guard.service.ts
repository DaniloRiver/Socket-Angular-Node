import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate{

  constructor(
    public wsService:WebsocketService,
    private router:Router
  ) { }

  canActivate() {
    if(this.wsService.getUsuario()){
      return true;
    }else{
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
