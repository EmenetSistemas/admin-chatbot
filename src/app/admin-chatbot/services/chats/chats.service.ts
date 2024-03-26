import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environments';

@Injectable({
	providedIn: 'root'
})
export class ChatsService {
	private apiBot : string = 'https://chatbot-cmqi.onrender.com/api';

	constructor(
		private http: HttpClient
	) { }

	public enviarMensajeTexto(mensaje: any) : Observable<any> {
		return this.http.post<any>(`${this.apiBot}/enviarMensajeTexto`, mensaje);
	}

	public agregarChatBlackList(telefono: string): Observable<any> {
		return this.http.get<any>(`${api}/chats/agregarChatBlackList/${telefono}`);
	}

	public obtenerBlackList(): Observable<any> {
		return this.http.get<any>(`${api}/chats/obtenerChatBlackList`);
	}

	public eliminarChatBlackList(telefono: string): Observable<any> {
		return this.http.get<any>(`${api}/chats/eliminarChatBlackList/${telefono}`);
	}

	public obtenerSolicitudesInstalacion(): Observable<any> {
		return this.http.get<any>(`${api}/chats/obtenerSolicitudesInstalacion`);
	}
}