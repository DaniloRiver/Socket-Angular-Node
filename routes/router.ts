import {Router,Request, Response} from 'express'
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';


const router = Router();

router.get('/mensajes', ( req:Request, res:Response)=>{
  
  res.json({
    ok:true,
    mensaje: 'Todo esta bien!!'
  });
  
});

router.post('/mensajes', ( req:Request, res:Response)=>{

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  server.io.emit('mensaje-nuevo',payload);

    res.json({
      ok:true,
      cuerpo,
      de
    });
    
  });

  router.post('/mensajes/:id', ( req:Request, res:Response)=>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
      de,
      cuerpo
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);

      res.json({
        ok:true,
        cuerpo,
        de,
        id
      });
      
    });

    //servicio para obtener ids de todos los usuarios

  router.get('/usuarios', ( req:Request, res:Response)=>{

      const server = Server.instance

      const clientes = Array.from(server.io.sockets.sockets.keys());
  
        res.json({
          ok:true,
          clientes
        });
        
      });

  // obtener usuarios y sus nombres
  
  router.get('/usuarios/detalle',(req: Request, res: Response)=>{
     
    res.json({
      ok:true,
      clientes: usuariosConectados.getLista()
    });
  });



export default router;