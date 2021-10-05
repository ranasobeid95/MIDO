import { Result } from "./result";

export interface Test{
    cardPhoto? :string;
    waterIntake?:number;
    exercise?:number;
    alcoholDrinks?:number;
    dietChange?:string;
    createdAt?:Date;
    dateModified?:Date;
    results?: Result | null;
}