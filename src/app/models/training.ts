import { IModules } from 'src/app/models/modules'

export interface ITraining{
    id:number;
    url:string;
    title:string;
    description:string;
    teacher:string;
    duration:number;
    status:string;
    category:string;
    date:Date;
    modules:IModules[]
}
