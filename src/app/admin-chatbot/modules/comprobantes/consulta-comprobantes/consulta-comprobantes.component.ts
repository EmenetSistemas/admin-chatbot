import { Component, ElementRef, OnInit } from '@angular/core';
import { ComprobantesService } from 'src/app/admin-chatbot/services/comprobantes/comprobantes.service';
import { MensajesService } from 'src/app/admin-chatbot/services/mensajes/mensajes.service';
import { ModalService } from 'src/app/admin-chatbot/services/modal/modal.service';
import { PrevPdfComponent } from 'src/app/admin-chatbot/components/prev-pdf/prev-pdf.component';

@Component({
	selector: 'app-consulta-comprobantes',
	templateUrl: './consulta-comprobantes.component.html',
	styleUrls: ['./consulta-comprobantes.component.css']
})
export class ConsultaComprobantesComponent implements OnInit {
	protected statusComprobantes: any[] = [];
	protected statusSeleccionados: any[] = [];

	protected columnasComprobantes: any = {
		'id': '#',
		'nombreServicio': 'Servicio',
		'numeroContacto': 'Contacto',
		'fechaRegistro': 'Registro',
		'fechaEnvioComprobante': 'Envio',
		'status': 'Status'
	};

	protected tableConfig: any = {
		"id": {
			"emitId": true,
			"value": "id"
		},
		"numeroContacto": {
			"telefono": true
		},
		"fechaRegistro": {
			"dateRange": true,
			"center": true
		},
		"fechaEnvioComprobante": {
			"dateRange": true,
			"center": true
		},
		"status": {
			"selectColumn": true,
			"selectOptions": [
				'Pendiente',
				'Enviado',
				'Rechazado'
			],
			"dadges": true,
			"center": true,
			"dadgesCases": [
				{
					"text": "Pendiente",
					"color": "warning"
				}, {
					"text": "Enviado",
					"color": "primary"
				}, {
					"text": "Rechazado",
					"color": "danger"
				}
			]
		}
	}

	protected listaComprobantesStatus: any = [];

	private idComprobante = 0;
	protected detalleComprobante: any = null;

	constructor(
		private mensajes: MensajesService,
		private apiComprobantes: ComprobantesService,
		private modalService: ModalService,
		private elementRef: ElementRef
	) { }

	async ngOnInit(): Promise<void> {
		this.mensajes.mensajeEsperar();
		await this.obtenerStatusComprobantes();
		this.mensajes.cerrarMensajes();
	}

	private obtenerStatusComprobantes(): Promise<void> {
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

	protected obtenerComprobantesPagoPorStatus(): void {
		this.mensajes.mensajeEsperar();
		this.depurarVariables();
		const arrStatus = this.statusSeleccionados.map(({ value }) => value);

		this.apiComprobantes.obtenerComprobantesPagoPorStatus(arrStatus).subscribe(
			respuesta => {
				this.listaComprobantesStatus = respuesta.data?.comprobantes ?? [];
				this.mensajes.mensajeGenericoToast(respuesta.mensaje, respuesta.status ? 'warning' : 'success');
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	protected obtenerDetalleComprobante(data: any): void {
		if (this.idComprobante == data.action) return;

		this.mensajes.mensajeEsperar();

		this.apiComprobantes.obtenerDetallComprobante(data.action).subscribe(
			respuesta => {
				this.detalleComprobante = respuesta.data.comprobante[0];
				if (
					this.detalleComprobante.tipoArchivoComprobante.includes('pdf') ||
					this.detalleComprobante.tipoArchivoComprobante.includes('document')
				) {
					this.idComprobante = 0;
					const dataModal = {
						detalleComprobante: this.detalleComprobante
					};
					this.modalService.abrirModalConComponente(PrevPdfComponent, dataModal);
				} else {
					this.idComprobante = data.action;
				}
				this.mensajes.mensajeGenericoToast(respuesta.mensaje, 'success');
			}, error => {
				this.depurarVariables();
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	showImageFullScreen() {
		const src = `data:${this.detalleComprobante.tipoArchivoComprobante};base64,${this.detalleComprobante.comprobantePago}`;
		const overlay: any = document.getElementById('overlay');
		const fullscreenImage: any = document.getElementById('fullscreen-image');

		fullscreenImage.src = src;
		overlay.style.display = 'block';
	}

	hideImageFullScreen(event: MouseEvent): void {
		// Si el clic proviene del overlay o del botón de cierre, oculta la imagen
		if (event.target === document.getElementById('overlay') || event.target === document.getElementById('close-button')) {
			const overlay: any = document.getElementById('overlay');
			overlay.style.display = 'none';
		}
	}

	zoomImage() {
		this.elementRef.nativeElement.querySelector('.fullscreen-image').classList.toggle('zoomed');
	}

	private depurarVariables(): void {
		this.idComprobante = 0;
		this.detalleComprobante = null;
	}

	protected limpiarTabla(): void {
		this.depurarVariables()
		this.listaComprobantesStatus = [];
	}

	protected canGet(): boolean {
		return !(this.statusSeleccionados.length > 0);
	}

	protected canExport(): boolean {
		return !(this.listaComprobantesStatus.length > 0);
	}

	protected canClean(): boolean {
		return !(this.listaComprobantesStatus.length > 0);
	}
}