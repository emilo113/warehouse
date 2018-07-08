import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class PdfCreatorService {

    private basicReportNames: any = {
        differenceReport: 'raport-roznica',
        orderReport: 'raport-zlecenie',
        deliveryReport: 'raport-przyjecie',
        dispatchReport: 'raport-wydanie',
        cmrReport: 'raport-cmr'
    };

    public downloadPdf(data: any, name: string): void {
        fetch('data:application/pdf;base64,' + data)
            .then(resp => resp.blob())
            .then(blob =>  {
                saveAs(blob, name);
            });
    }

    public generateNameForDispatchReport(dispatch: any): string {
        return `${this.basicReportNames.dispatchReport}_nr-${ dispatch.dispatch_Number }_car-${ dispatch.car_Id }`;
    }

    public generateNameForCmrReport(dispatch: any): string {
        return `${this.basicReportNames.cmrReport}_nr-${ dispatch.dispatch_Number }_car-${ dispatch.car_Id }`;
    }

    public generateNameForDifferenceReport(order: any): string {
        return this.generateName(this.basicReportNames.differenceReport, order);
    }

    public generateNameForOrderReport(order: any): string {
        return this.generateName(this.basicReportNames.orderReport, order);
    }

    public generateNameForDeliveryReport(order: any): string {
        return this.generateName(this.basicReportNames.deliveryReport, order);
    }

    private generateName(basic: string, order: any): string {
        return `${basic}_container-${order.container_Id}`;
    }
}
