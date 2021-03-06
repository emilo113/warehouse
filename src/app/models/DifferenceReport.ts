export class DifferenceReport {
    public FirstPersonName: string;
    public SecondPersonName: string;
    public ThirdPersonName: string;

    constructor() { }

    public isValidData(): boolean {
        return true;
    }

    public getJSONData(): any {
        return JSON.parse(JSON.stringify(this));
    }

    public setData(reportData: any): void {
        this.FirstPersonName = reportData.FirstPersonName;
        this.SecondPersonName = reportData.SecondPersonName;
        this.ThirdPersonName = reportData.ThirdPersonName;
    }
}
