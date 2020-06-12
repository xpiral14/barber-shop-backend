import { PrimaryKey, Column, ForeignKey, BelongsTo, Model, DataType, Table, TableOptions } from 'sequelize-typescript';
import { Company } from './Company';

@Table({tableName: "CompanyAddress"})
export class CompanyAddress extends Model<CompanyAddress> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  public companyId!: number;

  @Column(DataType.STRING)
  public cep!: string;

  @Column(DataType.STRING)
  public state!: string;

  @Column(DataType.STRING)
  public city!: string;

  @Column(DataType.STRING)
  public neighborhood!: string;

  @Column(DataType.STRING)
  public street!: string;

  @BelongsTo(() => Company, "companyId")
  public company!: Company;
}
