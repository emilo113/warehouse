import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class PdfCreatorService {

    private basicReportNames: any = {
        differenceReport: 'raport-roznica'
    };

    public downloadPdf(data: any, name: string): void {
        fetch('data:application/pdf;base64,' + data)
            .then(resp => resp.blob())
            .then(blob =>  {
                saveAs(blob, name);
            });
    }

    public generateNameForDifferenceReport(order: any): string {
        return `${this.basicReportNames.differenceReport}_atb-${order.atb}_container-${order.container_Id}`;
    }
}
