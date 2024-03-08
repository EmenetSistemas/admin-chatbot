import { Component, Input, OnInit} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-prev-pdf',
	templateUrl: './prev-pdf.component.html',
	styleUrls: ['./prev-pdf.component.css']
})
export class PrevPdfComponent implements OnInit {
	@Input() detalleComprobante: any = {};

	constructor(
		private modalService: ModalService,
		protected sanitizer: DomSanitizer
	) { }

	ngOnInit(): void {
		console.log(this.detalleComprobante);
	}

	getBase64PDFUrl(base64data: string): SafeResourceUrl {
		const pdfData = 'data:application/pdf;base64,' + base64data;
		return this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
	}

	protected cerrarModal(): void {
		this.modalService.cerrarModal();
	}
}