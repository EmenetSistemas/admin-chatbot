import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environments';

@Injectable({
	providedIn: 'root'
})
export class ComprobantesService {
	constructor(
		private http: HttpClient
	) { }

	public obtenerStatusComprobantes(): Observable<any> {
		return this.http.get<any>(`${api}/comprobantesPago/obtenerStatusComprobantes`);
	}
	
	public obtenerComprobantesPagoPorStatus(status: any): Observable<any> {
		return this.http.post<any>(`${api}/comprobantesPago/obtenerComprobantesPagoPorStatus`, status);
	}
}