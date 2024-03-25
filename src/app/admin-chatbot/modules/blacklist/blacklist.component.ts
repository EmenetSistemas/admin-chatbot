import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../services/chats/chats.service';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-blacklist',
	templateUrl: './blacklist.component.html',
	styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent extends FGenerico implements OnInit {
	protected formBlackList!: FormGroup;

	protected columnasBlackList: any = {
		'contacto': 'Contacto',
		'actions': 'Acciones'
	};

	protected tableConfig: any = {
		"contacto": {
			"telefono": true
		},
		"actions": {
			"noFilter": true,
			"actionFilter": true,
			"actions": [
				{
					"nombre": 'reactivateBot',
					"titulo": 'Reactivar bot',
					"icon": 'bi bi-whatsapp',
					"bg": 'warning'
				}
			],
			"value": "contacto"
		}
	};

	protected listaBlackList: any[] = [];

	constructor(
		private apiChats: ChatsService,
		private mensajes: MensajesService,
		private fb: FormBuilder
	) {
		super();
	}

	async ngOnInit(): Promise<void> {
		this.mensajes.mensajeEsperar();
		this.crearFormBlackList();
		await this.obtenerBlackList();
		this.mensajes.cerrarMensajes();
		setInterval(async () => {
			await this.obtenerBlackList();
		}, 5000);
	}

	private crearFormBlackList(): void {
		this.formBlackList = this.fb.group({
			contacto: [null, [Validators.required]]
		});
	}

	private obtenerBlackList(): Promise<void> {
		return this.apiChats.obtenerBlackList().toPromise().then(
			respuesta => {
				this.listaBlackList = respuesta.data;
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	protected agregarChatBlackList(): void {
		const telefono = this.formBlackList.value.contacto;

		if (!telefono) {
			this.mensajes.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		const busqueda = this.listaBlackList.find(item => item.contacto.includes(telefono));

		if (busqueda) {
			this.mensajes.mensajeGenerico('Upss...! Al parecer este número ya se encuetra en la BlackList, intenta con uno diferente', 'warning');
			return;
		}

		this.apiChats.agregarChatBlackList(telefono).toPromise().then(
			respuesta => {
				this.obtenerBlackList().then(() => {
					this.limpiarForm();
					this.mensajes.mensajeGenericoToast(respuesta.mensaje, 'success');
				});
			}, error => {
				this.mensajes.mensajeGenerico('error', 'error');
			}
		);
	}

	protected realizarAccion(data: any): void {
		this.mensajes.mensajeEsperar();
		switch (data.action) {
			case 'reactivateBot':
				this.apiChats.eliminarChatBlackList(data.idAccion).subscribe(
					respuesta => {
						this.obtenerBlackList().then(() => {
							this.mensajes.mensajeGenericoToast(respuesta.mensaje, 'warning');
						});
					}, error => {
						this.mensajes.mensajeGenerico('error', 'error');
					}
				);
				break;
		}
	}

	protected limpiarForm(): void {
		this.formBlackList.reset();
	}
}