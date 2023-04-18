export class Employee {
    public constructor(init?: Partial<Employee>) {
        Object.assign(this, init);
    }
    id?: number;
    firstName= "";
    lastName= "";
    email= "";
    dob= "";
    gender= "";
    education= "";
    company= "";
    experience= "";
}