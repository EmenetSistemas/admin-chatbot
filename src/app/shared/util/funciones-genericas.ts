import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({ template: '' })

export default class FGenerico {
    public soloLetras(event: KeyboardEvent) {
        const pattern = /[a-zA-Zá-úÁ-Ú ]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public soloTexto(event: KeyboardEvent) {
        const pattern = /[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+*[{}()?¿!¡]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public soloNumeros(event: KeyboardEvent) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public is_empty(cadena: string) {
        return cadena == null || cadena == undefined || cadena.trim() == '';
    }

    protected getNowString(): any {
        const hoy = Date.now();

        return moment(hoy).format("YYYY-MM-DD hh:mm A");
    }

    protected obtenerFormatoNumero(telefono: string): string {
        return telefono.slice(3).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }

    public obtenerSaludo () : string {
        const horaActual = new Date().getHours();
    
        if (horaActual >= 5 && horaActual < 12) {
            return 'buenos días';
        } else if (horaActual >= 12 && horaActual < 18) {
            return 'buenas tardes';
        } else {
            return 'buenas noches';
        }
    }
}