import { OrderPosition } from './OrderPosition';

export class DispatchSet {
    public delivery: any;
    public positions: OrderPosition[];


    constructor(delivery: any= null, positions: OrderPosition[] = null) {
        this.delivery = delivery;
        this.positions = positions;
    }
}
