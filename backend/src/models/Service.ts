import { Company } from './Company';
import {
  PrimaryKey,
  Column,
  ForeignKey,
  Model,
  BelongsToMany,
  DataType,
  Table,
} from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'Services' })
export class Service extends Model<Service> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  companyId!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: string;

  @BelongsToMany(() => User, 'BarberServices', 'serviceId', 'barberId')
  barbers!: User[];
}
