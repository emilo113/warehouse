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

    public isValidEditingData(): boolean {
        return this.dispatch_Number && this.isValidData();
    }

    public isValidPositions(): boolean {
        if (this.dispatchPositions.length === 0) {
            return false;
        }

        let isValid = true;

        this.dispatchPositions.forEach( (orderPosition: OrderPosition) => {
            if (!orderPosition.isValid()) {
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

        data.dispatchPositions.forEach(position => {
           // noinspection JSAnnotator
            delete position.name;
        });

        return data;
    }

    public setFromDetails(details: any): void {

        this.id = details.id;
        this.duty_Doc_Id = details.duty_Doc_Id;
        this.car_Id = details.car_Id;
        this.dispatch_Number = details.dispatch_Number;

        this.carrier.setData(details.carrier);
        this.receiver.setData(details.receiver);

        if (details.isCMR) {
            this.cmrDispatch.setData(details.cmrDispatch);
        }
    }
}