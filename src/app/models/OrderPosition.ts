export class OrderPosition {
    public id: number;
    public name: string;
    public amount: number;
    public weight_Gross: number;
    public maxAmount: number;

    public isValid(): boolean {
        return this.name && Boolean(this.amount) && Boolean(this.weight_Gross);
    }

    public isValidForDelivery(): boolean {
        return this.name && Boolean(this.amount);
    }

    public isValidForDispatch(): boolean {
        return this.isValidForDelivery() && this.amount > 0 && this.amount <= this.maxAmount;
    }

    public checkMax(amount: number): void {
        if (amount > this.maxAmount) {
            this.amount = this.maxAmount;
            return;
        }

        if (amount <= 0) {
            this.amount = 1;
            return;
        }
    }

    public setData(positionData): void {
        this.id = positionData.id;
        this.name = positionData.name;
        this.amount = positionData.amount;
        this.maxAmount = positionData.amount;

        if (positionData.weight_Gross) {
            this.weight_Gross = positionData.weight_Gross;
        }
    }
}
