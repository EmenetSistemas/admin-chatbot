import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { api } from 'src/environments/environments';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-datatable',
	templateUrl: './datatable.component.html',
	styleUrls: ['./datatable.component.css']
})
export class DatatableComponent extends FGenerico implements OnInit, OnChanges {
	@Input() columnasTabla: any = [];
	@Input() datosTabla: any = [];
	@Input() tableConfig: any = [];
	@Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() actionSelected: EventEmitter<any> = new EventEmitter<any>();

	protected selectedCheckboxes: any[] = [];

	public currentPage: number = 1;
	public itemsPerPageOptions = [5, 10, 25, 50];
	public itemsPerPage = this.itemsPerPageOptions[0];

	public sortBy: string = '';
	public sortDesc: boolean = false;

	public filterValues: { [key: string]: string } = {};

	private url = api;

	public registrosBusqueda = this.datosTabla.length;

	constructor(
		private mensajes: MensajesService,
		private cdRef: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit(): void {
		this.selectedCheckboxes = [];
		this.emitirDatos();
		Object.keys(this.columnasTabla).forEach((key) => {
			this.filterValues[key] = '';
		});
		this.limpiarFiltros();
	}

	ngOnChanges(): void {
		this.selectedCheckboxes = [];
		this.emitirDatos();
		this.onItemsPerPageChange();
		this.limpiarFiltros();
	}

	protected abrirModalModificacion(idDetalle: number, idModal: string) {
		const dataModal = {
			idDetalle: idDetalle
		};
		switch (idModal) {
		}
	}

	protected abrirModalDetalle(idDetalle: number, idModal: string) {
		const dataModal = {
			idDetalle: idDetalle
		};
		switch (idModal) {
		}
	}

	protected descargarPdf(idDetalle: number, rutaPdf: string) {
		this.mensajes.mensajeEsperar();
		window.open(this.url + '/' + rutaPdf + '/' + idDetalle);
		this.mensajes.mensajeGenerico('Se generó el PDF con éxito', 'success');
	}

	protected abrirOpcionesTelefono(telefono: string): void {
		Swal.fire({
			allowOutsideClick: false,
			title: "¿Que quieres hacer?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Llamar",
			denyButtonText: 'Enviar WhatsApp',
			cancelButtonText: 'Cerrar',
			buttonsStyling: false,
			customClass: {
				confirmButton: 'order-1 btn btn-primary me-2',
				denyButton: 'order-2 btn btn-success me-2',
				cancelButton: 'order-3 btn btn-danger'
			},
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = `tel:${telefono}`;
			} else if (result.isDenied) {
				window.location.href = `whatsapp://send?phone=+${telefono}`;
			}
		});
	}

	private getDateDb(dateString: string): Date | null {
		const parts = dateString.split('-');
		if (parts.length === 3) {
			const day = +parts[0];
			const month = +parts[1] - 1;
			const year = +parts[2];
			return new Date(year, month, day);
		}
		return null;
	}

	private getDateInput(dateString: string): Date | null {
		const parts = dateString.split('-');
		if (parts.length === 3) {
			const day = +parts[2];
			const month = +parts[1] - 1;
			const year = +parts[0];
			return new Date(year, month, day);
		}
		return null;
	}

	get paginatedItems() {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;

		const datosMostrar = this.datosTabla.filter((registro: any) => {
			return Object.keys(this.filterValues).every((column: any) => {
				const filter = this.filterValues[column].toLowerCase();
				const value = registro[column.replace('_inicio', '').replace('_fin', '')];

				if (column.endsWith('_inicio') || column.endsWith('_fin')) {
					column = column.replace('_inicio', '').replace('_fin', '');
					const startDate = this.getDateInput(this.filterValues[column + '_inicio'] ?? '');
					const endDate = this.getDateInput(this.filterValues[column + '_fin'] ?? '');
					const dateValue = this.getDateDb(value ?? '');

					if (startDate && endDate && dateValue) {
						return dateValue >= startDate && dateValue <= endDate;
					}

					return true;
				}

				if (filter === '') {
					return true;
				} else if (filter === 'null' && this.tableConfig[column]?.showEmptyOption) {
					return value === undefined || value === null || value === '';
				} else {
					return value?.toString().toLowerCase().includes(filter);
				}
			});
		});

		this.registrosBusqueda = datosMostrar.length;
		return datosMostrar.slice(startIndex, endIndex);
	}

	get totalPages() {
		return Math.ceil(this.registrosBusqueda / this.itemsPerPage);
	}

	get pagesArray() {
		const visiblePages = 3;
		const halfVisible = Math.floor(visiblePages / 2);

		let startPage = Math.max(this.currentPage - halfVisible, 1);
		let endPage = startPage + visiblePages - 1;

		if (endPage > this.totalPages) {
			endPage = this.totalPages;
			startPage = Math.max(endPage - visiblePages + 1, 1);
		}

		return Array(endPage - startPage + 1).fill(0).map((_, i) => startPage + i);
	}

	goToPage(page: number) {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
		}
	}

	onItemsPerPageChange() {
		this.currentPage = 1;
		this.itemsPerPage = Number(this.itemsPerPage);
	}

	sortColumn(indice: string) {
		if (this.sortBy === indice) {
			this.sortDesc = !this.sortDesc;
		} else {
			this.sortBy = indice;
			this.sortDesc = false;
		}

		this.datosTabla.sort((a: any, b: any) => {
			const valueA = a[indice];
			const valueB = b[indice];

			if (valueA < valueB) {
				return this.sortDesc ? 1 : -1;
			} else if (valueA > valueB) {
				return this.sortDesc ? -1 : 1;
			} else {
				return 0;
			}
		});
	}

	getColumnKeys(): string[] {
		return Object.keys(this.columnasTabla);
	}

	getStartIndex(): number {
		return (this.currentPage - 1) * this.itemsPerPage + 1;
	}

	getEndIndex(): number {
		const endIndex = this.currentPage * this.itemsPerPage;
		return Math.min(endIndex, this.datosTabla.length);
	}

	isCheckboxSelected(id: number): boolean {
		return this.selectedCheckboxes.includes(id);
	}

	toggleCheckboxSelection(event: any, id: number): void {
		if (event.target.checked) {
			this.selectedCheckboxes.push(id);
		} else {
			const index = this.selectedCheckboxes.indexOf(id);
			if (index !== -1) {
				this.selectedCheckboxes.splice(index, 1);
			}
		}

		this.emitirDatos();
	}

	limpiarFiltros(): void {
		Object.keys(this.filterValues).forEach((key) => {
			this.filterValues[key] = '';
		});
		this.currentPage = 1;
		this.cdRef.detectChanges();
	}

	getTableColumnStyle(columna: string, rowData: any): any {
		const columnConfig = this.tableConfig[columna];

		if (columnConfig && columnConfig.style) {
			const cantidad = rowData[columna];

			if (cantidad != null && cantidad > 0) {
				return columnConfig.style;
			}
		}

		return null;
	}

	protected obtenerColorDadges(columna: string, valor: string): string {
		const color = this.tableConfig[columna]?.dadgesCases.find((caseItem: any) => caseItem.text == valor);
		if (color) {
			return color.color;
		}
		return 'default';
	}

	protected emitirDatos(): void {
		const data = {
			selectedOptions: this.selectedCheckboxes
		};
		this.selectionChange.emit(data);
	}

	protected emitirIdAccion(action: string, idAccion: any = null): void {
		const data = {
			action: action,
			idAccion: idAccion
		};
		this.actionSelected.emit(data);
	}
}