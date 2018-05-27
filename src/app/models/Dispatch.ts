import { Receiver } from './Receiver';
import { Carrier } from './Carrier';
import { CmrDispatch } from './CmrDispatch';
import { OrderPosition } from './OrderPosition';

export class Dispatch {
    public id: number;
    public car_Id: string;
    public duty_Doc_Id: string;
    public receiver: Receiver;
    public carrier: Carrier;
    public cmrDispatch: CmrDispatch;
    public dispatchPositions: OrderPosition[];

    public dispatch_Number: string;
    public creation_Date: string;

    constructor() {
        this.receiver = new Receiver();
        this.carrier = new Carrier();
        this.cmrDispatch = new CmrDispatch();
        this.dispatchPositions = [];
    }

    public isValidData(): boolean {
        return this.car_Id &&
            this.duty_Doc_Id &&
            this.receiver.isValidData() &&
            this.carrier.isValidData() &&
            this.isValidPositions();
    }

    public addPositions(positions: OrderPosition[]): void {
        this.dispatchPositions = this.dispatchPositions.concat(positions);
    }

    public replacePositions(positions: OrderPosition[]): void {
        const ids = positions.map(position => {
           return position.id;
        });

        this.dispatchPositions = this.dispatchPositions.filter(position => {
            return !ids.find(id => {
                return Number(id) === Number(position.id);
            });
        });

        this.addPositions(positions);
    }

    public removePosition(position: OrderPosition): void {
        const positionKey = this.dispatchPositions.findIndex(item => {
            return Number(item.id) === Number(position.id);
        });

        this.dispatchPositions.splice(positionKey, 1);
    }

    public isValidEditingData(): boolean {
        return this.dispatch_Number && this.creation_Date && this.id && this.isValidData();
    }

    public isValidPositions(): boolean {
        if (this.dispatchPositions.length === 0) {
            return false;
        }

        let isValid = true;

        this.dispatchPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValidForDispatch()) {
                isValid = false;
                return;
            }
        });

        return isValid;
    }

    public clearCmr(): void {
        this.cmrDispatch = new CmrDispatch();
    }

    public getJSONData(): any {
        const data = JSON.parse(JSON.stringify(this));

        if (data.creation_Date) {
            data.creation_Date = new Date(data.creation_Date);
        }

        return data;
    }

    public setFromDetails(details: any): void {
        const date = details.creation_Date.split('-');

        this.id = details.id;
        this.duty_Doc_Id = details.duty_Doc_Id;
        this.car_Id = details.car_Id;
        this.dispatch_Number = details.dispatch_Number;
        this.creation_Date = date[2] + '-' + date[1] + '-' + date[0];

        this.carrier.setData(details.carrier);
        this.receiver.setData(details.receiver);

        if (details.isCMR) {
            this.cmrDispatch.setData(details.cmrDispatch);
        }
    }
}