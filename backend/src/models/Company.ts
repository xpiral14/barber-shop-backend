import { CompanyAddress } from './CompanyAddress';
import { CompanyPhone } from './CompanyPhone';
import { Table, Column, PrimaryKey, HasMany, Model, DataType } from 'sequelize-typescript';
import { User } from './User';

const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone');

@Table({tableName: "Companies"})
export class Company extends Model<Company> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  fantasyName!: string;

  @Column(DataType.STRING)
  logo!: string;

  @Column(DataType.STRING)
  cnpj!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  passwordHash!: string;

  @Column(DataType.VIRTUAL)
  password!: string;

  @HasMany(() => CompanyAddress, "companyId")
  addresses!: CompanyAddress[];

  @HasMany(() => User, "companyId")
  users!: User[];

  @HasMany(() => CompanyPhone, "companyId")
  phones!: CompanyPhone[];
}
