import { Model, DataTypes } from 'sequelize';
import {
  Table,
  Default,
  DefaultScope,
  ForeignKey,
  Column,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './User';

@Table({tableName: "WorkIntervalTimes"})
@DefaultScope(() => ({
  attributes: {
    exclude: ['barberId'],
  },
}))
export class WorkIntervalTime extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  barberId!: number;
  
  @Column(DataType.INTEGER)
  initialTime!: number;
  
  @Column(DataType.INTEGER)
  finishTime!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsTo(() => User, 'barberId')
  barber!: User;
}
