import { Component } from '@angular/core';

@Component({
	selector: 'app-chats-bot',
	templateUrl: './chats-bot.component.html',
	styleUrls: ['./chats-bot.component.css']
})
export class ChatsBotComponent {
	protected columnasChatsEspera: any = {
		'nombreServicio'		: 'Servicio',
		'numeroContacto'		: 'Contacto',
		'asunto'				: 'Asunto',
		'actions'				: 'Acciones'
	};

	protected tableConfig: any = {
		"actions" : {
			"noFilter" : true,
			"actionFilter" : true,
			"actions" : [
				{
					"nombre" : 'sendTicket',
					"titulo" : 'Contactar',
					"icon" : 'bi bi-whatsapp',
					"bg" : 'primary'
				}, {
					"nombre" : 'declineTicket',
					"titulo" : 'Finalizar conversación',
					"icon" : 'bi-exclamation-triangle',
					"bg" : 'warning'
				}
			],
			"value" : "numeroContacto"
		}
	};
}