import { IModule } from './modules';

export interface ITraining {
  id: number;
  url: string;
  title: string;
  description: string;
  teacher: string;
  duration: number;
  active: boolean;
  category: string;
  date: Date;
  modules: IModule[];
}
