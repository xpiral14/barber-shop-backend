import {
  PrimaryKey,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  DataType,
  Table,
} from 'sequelize-typescript';
import { User } from './User';

@Table({tableName: "ServiceDurationTimes"})
export class ServiceDurationTime extends Model<ServiceDurationTime> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;
  
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  barberId!: number;
  
  @Column(DataType.NUMBER)
  duration!: number;
  
  @Column(DataType.NUMBER)
  extendTime!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;
  
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsTo(() => User, 'barberId')
  barber!: User;
}
