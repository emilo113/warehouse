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


    constructor() {
        this.receiver = new Receiver();
        this.carrier = new Carrier();
        this.cmrDispatch = new CmrDispatch();
        this.dispatchPositions = [];
    }

    public addDispatchPosition(position: OrderPosition): void {
        this.dispatchPositions.push(position);
    }

    public removeDispatchPosition(index: number): void {
        this.dispatchPositions.splice(index, 1);
    }

    public isValidData(): boolean {
        return this.car_Id &&
            this.duty_Doc_Id &&
            this.receiver.isValidData() &&
            this.carrier.isValidData() &&
            this.cmrDispatch.isValidData() &&
            this.isValidPositions();
    }

    public isValidPositions(): boolean {
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
        console.log(JSON.parse(JSON.stringify(this)));
    }
}