import {
  PrimaryKey,
  Column,
  BelongsTo,
  Model,
  DataType,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from './Company';

@Table({tableName: "CompanyPhones"})
export class CompanyPhone extends Model<CompanyPhone> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  companyId!: number;

  @Column(DataType.STRING)
  phone!: string;

  @BelongsTo(() => Company, "companyId")
  company!: Company;
}
