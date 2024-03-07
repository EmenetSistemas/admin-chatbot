import { Component, OnInit } from '@angular/core';
import { ComprobantesService } from 'src/app/admin-chatbot/services/comprobantes/comprobantes.service';
import { MensajesService } from 'src/app/admin-chatbot/services/mensajes/mensajes.service';

@Component({
	selector: 'app-consulta-comprobantes',
	templateUrl: './consulta-comprobantes.component.html',
	styleUrls: ['./consulta-comprobantes.component.css']
})
export class ConsultaComprobantesComponent implements OnInit{
	protected statusComprobantes: any[] = [];
	protected statusSeleccionados: any[] = [];

	protected columnasComprobantes : any = {
		'id' 					: '#',
		'nombreServicio' 		: 'Servicio',
		'numeroContacto' 		: 'Contacto',
		'observaciones' 		: 'Observaciones',
		'fechaRegistro' 		: 'Registro',
		'fechaEnvioComprobante' : 'Envio',
		'status' 				: 'Status'
	};

	protected tableConfig : any = {
		"fechaRegistro" : {
			"dateRange" : true,
			"center" : true
		},
		"fechaEnvioComprobante" : {
			"dateRange" : true,
			"center" : true
		},
		"status" : {
			"selectColumn" : true,
			"selectOptions" : [
				'Pendiente',
				'Enviado',
				'Rechazado'
			],
			"dadges" : true,
			"center" : true,
			"dadgesCases" : [
				{
					"text" : "Pendiente",
					"color" : "warning"
				}, {
					"text" : "Enviado",
					"color" : "primary"
				}, {
					"text" : "Rechazado",
					"color" : "danger"
				}
			]
		}
	}

	protected listaComprobantesStatus : any = [];

	constructor (
		private mensajes : MensajesService,
		private apiComprobantes : ComprobantesService
	) {}

	async ngOnInit(): Promise<void> {
		this.mensajes.mensajeEsperar();
		await this.obtenerStatusComprobantes();
		this.mensajes.cerrarMensajes();
	}

	private obtenerStatusComprobantes () : Promise<void> {
		return this.apiComprobantes.obtenerStatusComprobantes().toPromise().then(
			respuesta => {
				this.statusComprobantes = respuesta.data;
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	protected cambioDeSeleccion(data: any): void {
		if (data.from == 'statusPedidos') {
			this.statusSeleccionados = data.selectedOptions;
		}
	}

	protected obtenerComprobantesPagoPorStatus () : void {
		this.mensajes.mensajeEsperar();
		const arrStatus = this.statusSeleccionados.map(({value}) => value);

		this.apiComprobantes.obtenerComprobantesPagoPorStatus(arrStatus).subscribe(
			respuesta => {
				this.listaComprobantesStatus = respuesta.data?.comprobantes ?? [];
				this.mensajes.mensajeGenericoToast(respuesta.mensaje, respuesta.status ? 'warning' : 'success');
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	protected canGet() : boolean {
		return !(this.statusSeleccionados.length > 0);
	}

	protected canExport() : boolean {
		return !(this.listaComprobantesStatus.length > 0);
	}

	protected canClean() : boolean {
		return !(this.listaComprobantesStatus.length > 0);
	}
}