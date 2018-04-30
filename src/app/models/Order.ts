import { OrderPosition } from './OrderPosition';

export class Order {
    public container_Id: string;
    public atb: string;
    public pickup_PIN: string;
    public name: string;
    public address: string;
    public vaT_Id: string;
    public email: string;
    public orderPositions: OrderPosition[];

    public addOrderPosition() {
        this.orderPositions.push(new OrderPosition());
    }

    public removeOrderPosition(index: number) {
        this.orderPositions.splice(index, 1);
    }

    public isValidData() {
        return this.container_Id &&
            this.atb &&
            this.pickup_PIN &&
            this.name &&
            this.address &&
            this.vaT_Id &&
            this.email &&
            this.isValidPositions();
    }

    private isValidPositions() {
        this.orderPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValid()) {
                return false;
            }
        });

        return true;
    }
}
