import { Model, PrimaryKey, Column, DataType, Table } from 'sequelize-typescript';

@Table({tableName: "UserTypes"})
export class UserType extends Model<UserType> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;
}
