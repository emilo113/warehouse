import { OrderPosition } from './OrderPosition';

export class DispatchSet {
    public delivery: any;
    public positions: OrderPosition[];


    constructor(delivery: any, positions: OrderPosition[]) {
        this.delivery = delivery;
        this.positions = positions;
    }
}
