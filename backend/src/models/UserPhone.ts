import { PrimaryKey, Column, BelongsTo, Model, ForeignKey, DataType, Table, CreatedAt, AutoIncrement } from 'sequelize-typescript';
import { User } from './User';

@Table({tableName: "UserPhones"})
export class UserPhone extends Model<UserPhone> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  phone!: string;

  @BelongsTo(() => User, "userId")
  user!: User;

  
}
