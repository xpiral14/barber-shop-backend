import { Model, Column, PrimaryKey, DataType, Table } from 'sequelize-typescript';

@Table({tableName: "Genders"})
export class Gender extends Model<Gender> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;
}
