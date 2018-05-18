import { OrderPosition } from './OrderPosition';
import { transportTypes } from './enums/transport.types';

export class Delivery {
    public id: number;
    public order_Id: number;
    public transport_Type: number;
    public delivery_Number: string;
    public date_Of_Delivery: any;
    public deliveryPositions: OrderPosition[];


    constructor() {
        this.deliveryPositions = [];
        this.transport_Type = transportTypes.Car.value;
    }

    public setDeliveryPositions(orderPositions: any, editing: boolean = false): void {
        orderPositions.forEach(position => {
            const deliveryPosition = new OrderPosition();
            deliveryPosition.id = position.id;
            deliveryPosition.name = position.name;

            if (!editing) {
                deliveryPosition.amount = position.amount;
                deliveryPosition.weight_Gross = position.weight_Gross;
            } else {
                deliveryPosition.amount = position.amount_Received;
                deliveryPosition.weight_Gross = position.weight_Gross_Received;
            }


            this.deliveryPositions.push(deliveryPosition);
        });
    }

    public isValidData(): boolean {
        return this.order_Id && this.transport_Type && this.isValidPositions();
    }

    public isValidEditionData(): boolean {
        return this.id && this.delivery_Number && this.date_Of_Delivery && this.transport_Type && this.isValidPositions();
    }

    public isValidPositions(): boolean {
        let isValid = true;

        this.deliveryPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValid()) {
                isValid = false;
                return;
            }
        });

        return isValid;
    }

    public getJSONData(): string {
        const data = JSON.parse(JSON.stringify(this));

        if (data.date_Of_Delivery) {
            data.date_Of_Delivery = new Date(data.date_Of_Delivery);
        }

        return JSON.parse(JSON.stringify(this));
    }

    public setDataFromDelivery(data: any) {
        const date = data.date_Of_Delivery.split('-');

        this.id = data.id;
        this.transport_Type = data.transport_Type;
        this.date_Of_Delivery = date[2] + '-' + date[1] + '-' + date[0];
        this.delivery_Number = data.delivery_Number;

        this.setDeliveryPositions(data.listOfOrderPositions, true);
    }
}
