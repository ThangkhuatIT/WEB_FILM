import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  index(): Promise<T[]>;
  findById(id: string): Promise<T>;
  store(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
}
