import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, BelongsTo, DataType, PrimaryKey} from "sequelize-typescript";

import {Company} from './Company';
import {User} from './User';
import {Service} from './Service';

@Table({tableName: "Appointments"})
export class Appointment extends Model<Appointment> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!:number;
  
  @Column(DataType.DATEONLY)
  date!: Date;
  
  @Column(DataType.INTEGER)
  time!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;
  
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  
  @BelongsTo(() => Company, "companyId")
  company !: Company;

  @BelongsTo(() => User, "barberId")
  barber !: User;

  @BelongsTo(() => User, "costumerId")
  costumer !: User;

  @BelongsTo(() => Service, "serviceId")
  service !: Service;

}
