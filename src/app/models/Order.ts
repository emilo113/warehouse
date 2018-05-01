import { OrderPosition } from './OrderPosition';

export class Order {
    public container_Id: string;
    public atb: string;
    public pickup_PIN: string;
    public name: string;
    public address: string;
    public vaT_Id: string;
    public email: string;
    public orderPositions: OrderPosition[] = [];


    constructor() {
        this.addOrderPosition();
    }

    public addOrderPosition(): void {
        this.orderPositions.push(new OrderPosition());
    }

    public removeOrderPosition(index: number): void {
        this.orderPositions.splice(index, 1);
    }

    public isValidData(): boolean {
        return this.container_Id &&
            this.atb &&
            this.pickup_PIN &&
            this.isValidOrderer() &&
            this.isValidPositions();
    }

    public isValidPositions(): boolean {
        let isValid = true;

        this.orderPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValid()) {
                isValid = false;
                return;
            }
        });

        return isValid;
    }

    public isValidOrderer(): boolean {
        return Boolean(
            this.name && this.address && this.vaT_Id && this.email
        );
    }
}
