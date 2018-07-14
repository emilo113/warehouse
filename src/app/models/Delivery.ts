import { OrderPosition } from './OrderPosition';

export class Delivery {
    public id: number;
    public atb: string;
    public order_Id: number;
    public car_Id: string;
    public delivery_Number: string;
    public date_Of_Delivery: Date;
    public deliveryPositions: OrderPosition[];

    constructor() {
        this.deliveryPositions = [];
    }

    public setDeliveryPositions(orderPositions: any, editing: boolean = false): void {
        orderPositions.forEach(position => {
            const deliveryPosition = new OrderPosition();
            deliveryPosition.id = position.id;
            deliveryPosition.name = position.name;

            if (!editing) {
                deliveryPosition.amount = position.amount;
                // deliveryPosition.weight_Gross = position.weight_Gross;
            } else {
                deliveryPosition.amount = position.amount_Received;
                // deliveryPosition.weight_Gross = position.weight_Gross_Received;
            }


            this.deliveryPositions.push(deliveryPosition);
        });
    }

    public isValidData(isATBRequired: boolean = false): boolean {
        const isValidATB = isATBRequired && this.isValidATB() || !isATBRequired;

        return this.order_Id && this.car_Id && isValidATB && this.isValidPositions();
    }

    public isValidEditionData(): boolean {
        return this.id && this.delivery_Number && this.date_Of_Delivery && this.car_Id && this.isValidPositions();
    }

    public isValidPositions(): boolean {
        let isValid = true;

        this.deliveryPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValidForDelivery()) {
                isValid = false;
                return;
            }
        });

        return isValid;
    }

    public isValidATB(): boolean {
        return /ATB[0-9]{18}/.test(this.atb);
    }

    public getJSONData(): string {
        const data = JSON.parse(JSON.stringify(this));

        if (!data.atb) {
            data.atb = undefined;
        }

        return JSON.parse(JSON.stringify(this));
    }

    public setDataFromDelivery(data: any) {
        const date = data.date_Of_Delivery.split('-');

        this.id = data.id;
        this.date_Of_Delivery = new Date(date[2] + '-' + date[1] + '-' + date[0]);
        this.delivery_Number = data.delivery_Number;
        this.car_Id = data.car_Id;

        this.setDeliveryPositions(data.listOfOrderPositions, true);
    }
}
