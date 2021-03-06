import { OrderPosition } from './OrderPosition';
import DateTimeFormat = Intl.DateTimeFormat;

export class Order {
    public id: number;
    public container_Id: string;
    public atb: string;
    public pickup_PIN: string;
    public terminal: string;
    public returnTerminal: string;
    public name: string;
    public address: string;
    public vaT_Id: string;
    public prefixVat_Id: string;
    public email: string;
    public eta: Date;
    public creation_Date: Date;
    public order_Number: string;
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
            this.pickup_PIN &&
            this.terminal &&
            this.eta &&
            this.returnTerminal &&
            this.isValidOrderer() &&
            this.isValidPositions() &&
            this.isValidATB();
    }

    public isValidEditingData(): boolean {
        return Boolean(
            this.isValidData() &&
            this.id &&
            this.order_Number &&
            this.creation_Date
        );
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
            this.name && this.address && this.prefixVat_Id && this.vaT_Id && this.email
        );
    }

    public isValidATB(): boolean {
        if (!this.atb) {
            return true;
        }

        return /ATB[0-9]{18}/.test(this.atb);
    }

    public setDataFromOrder(order: any): void {
        const date = order.creation_Date.split('-');
        const eta = order.eta.split('-');

        this.id = order.id;
        this.container_Id = order.container_Id;
        this.atb = order.atb;
        this.pickup_PIN = order.pickup_PIN;
        this.name = order.orderer.name;
        this.address = order.orderer.address;
        this.email = order.orderer.email;
        this.prefixVat_Id = order.orderer.prefixVat_Id;
        this.vaT_Id = order.orderer.vaT_Id;
        this.terminal = order.terminal;
        this.creation_Date = new Date(date[2] + '-' + date[1] + '-' + date[0]);
        this.eta = new Date(eta[2] + '-' + eta[1] + '-' + eta[0]);
        this.order_Number = order.order_Number;

        this.orderPositions = [];

        order.listOfOrderPositions.forEach( position => {
            const orderPosition = new OrderPosition();

            orderPosition.id = position.id;
            orderPosition.name = position.name;
            orderPosition.amount = position.amount;
            orderPosition.weight_Gross = position.weight_Gross;

           this.orderPositions.push(orderPosition);
        });
    }

    public getJSONData(): any {
        const data = JSON.parse(JSON.stringify(this));

        if (!data.atb) {
            data.atb = undefined;
        }

        return data;
    }
}
