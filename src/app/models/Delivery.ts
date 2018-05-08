import { OrderPosition } from './OrderPosition';
import { transportTypes } from './enums/transport.types';

export class Delivery {
    public order_Id: number;
    public transport_Type: number;
    public deliveryPositions: OrderPosition[];


    constructor() {
        this.deliveryPositions = [];
        this.transport_Type = transportTypes.Car.value;
    }

    public setDeliveryPositions(orderPositions: any): void {
        orderPositions.forEach(position => {
            const deliveryPosition = new OrderPosition();
            deliveryPosition.id = position.id;
            deliveryPosition.name = position.name;
            deliveryPosition.amount = position.amount;
            deliveryPosition.weight_Gross = position.weight_Gross;

            this.deliveryPositions.push(deliveryPosition);
        });
    }

    public isValidData(): boolean {
        return this.order_Id && this.transport_Type && this.isValidPositions();
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
        return JSON.parse(JSON.stringify(this));
    }
}
