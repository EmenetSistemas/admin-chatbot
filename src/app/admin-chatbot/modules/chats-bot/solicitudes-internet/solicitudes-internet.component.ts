import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/admin-chatbot/services/chats/chats.service';
import { MensajesService } from 'src/app/admin-chatbot/services/mensajes/mensajes.service';

@Component({
	selector: 'app-solicitudes-internet',
	templateUrl: './solicitudes-internet.component.html',
	styleUrls: ['./solicitudes-internet.component.css']
})
export class SolicitudesInternetComponent implements OnInit {
	protected columnasSolicitudes: any = {
		'nombre'				   : 'Nombre',
		'telefono'				   : 'Teléfono',
		'localidad'				   : 'Localidad',
		'ubicacion'				   : 'Ubicación'
	};

	protected tableConfig: any = {
		"telefono": {
			"telefono": true
		}
	};

	protected listaSolicitudesInstalacion: any = [];

	constructor(
		private mensajes: MensajesService,
		private apiChats: ChatsService
	) { }

	async ngOnInit(): Promise<void> {
		this.mensajes.mensajeEsperar();
		await this.obtenerSolicitudesInstalacion();
		this.mensajes.cerrarMensajes();
		setInterval(async () => {
			await this.obtenerSolicitudesInstalacion();
		}, 5000);
	}

	private obtenerSolicitudesInstalacion(): Promise<any> {
		return this.apiChats.obtenerSolicitudesInstalacion().toPromise().then(
			respuesta => {
				this.listaSolicitudesInstalacion = respuesta.data;
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}
}