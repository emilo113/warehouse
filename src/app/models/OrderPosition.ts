export class OrderPosition {
    public name: string;
    public amount: number;
    public weight: number;

    public isValid(): boolean {
        return this.name && Boolean(this.amount) && Boolean(this.weight);
    }
}
