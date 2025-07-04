import {Specialty} from '../../public/model/specialty';

export class Person {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
    public email: string = '',
    public phone: string = '',
    public professionalId?: string,
    public specialty?: Specialty,
    public id?: number
  ) {
  }
}
