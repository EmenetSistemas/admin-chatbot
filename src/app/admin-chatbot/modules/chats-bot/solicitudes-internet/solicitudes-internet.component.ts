import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/admin-chatbot/services/chats/chats.service';
import { MensajesService } from 'src/app/admin-chatbot/services/mensajes/mensajes.service';

@Component({
	selector: 'app-solicitudes-internet',
	templateUrl: './solicitudes-internet.component.html',
	styleUrls: ['./solicitudes-internet.component.css']
})
export class SolicitudesInternetComponent implements OnInit, OnDestroy {
	protected columnasSolicitudes: any = {
		'nombre': 'Nombre',
		'telefono': 'Teléfono',
		'localidad': 'Localidad',
		'ubicacion': 'Ubicación'
	};

	protected tableConfig: any = {
		"nombre": {
			"detailColumn": true
		},
		"telefono": {
			"telefono": true
		},
		"localidad": {
			"selectColumn": true,
			"center": true
		},
		"ubicacion": {
			"location": true,
			"center": true,
			"noFilter": true
		}
	};

	protected listaSolicitudesInstalacion: any = [];

	private intervalo: any;

	constructor(
		private mensajes: MensajesService,
		private apiChats: ChatsService
	) { }

	async ngOnInit(): Promise<void> {
		this.mensajes.mensajeEsperar();
		await this.obtenerSolicitudesInstalacion();
		this.mensajes.cerrarMensajes();
		this.intervalo = setInterval(async () => {
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

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}