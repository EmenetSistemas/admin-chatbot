import { Component } from '@angular/core';

@Component({
	selector: 'app-consulta-comprobantes',
	templateUrl: './consulta-comprobantes.component.html',
	styleUrls: ['./consulta-comprobantes.component.css']
})
export class ConsultaComprobantesComponent {
	protected statusComprobantes: any[] = [];
	protected statusSeleccionados: any[] = [];

	protected columnasComprobantes : any = {
		'pkTblComprobantesPagoClientes' : '#',
		'nombreServicio' 				: 'Servicio',
		'numeroContacto' 				: 'Contacto',
		'observaciones' 				: 'Observaciones',
		'fechaRegistro' 				: 'Registro',
		'fechaEnvioComprobante' 		: 'Envio',
		'fkCatStatusComprobantes' 		: 'Status'
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
		"fkCatStatusComprobantes" : {
			"selectColumn" : true,
			"selectOptions" : [
				'Pendiente',
				'Enviado',
				'Entregado'
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
					"text" : "Entregado",
					"color" : "success"
				}
			]
		}
	}

	protected listaComprobantesStatus : any = [];

	constructor (
		
	) {}

	protected cambioDeSeleccion(data: any): void {
		if (data.from == 'statusPedidos') {
			this.statusSeleccionados = data.selectedOptions;
		}
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