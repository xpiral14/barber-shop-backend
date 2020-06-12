import { DataTypes } from 'sequelize';
import { UserType } from './UserType';
import hashPassword from '../utils/hashPassword';
import { EMPLOYEE, CLIENT } from '../constants/userTypes';
import path from 'path';
import { Gender } from './Gender';
import { UserPhone } from './UserPhone';
import { backendURL } from '../constants/urls';
import {
  Model,
  DefaultScope,
  Column,
  PrimaryKey,
  ForeignKey,
  BeforeCreate,
  DataType,
  BeforeUpdate,
  BelongsTo,
  HasOne,
  BelongsToMany,
  HasMany,
  Table,
  AutoIncrement,
} from 'sequelize-typescript';
import { Company } from './Company';
import { ServiceDurationTime } from './ServiceDurationTime';
import { Service } from './Service';
import { Appointment } from './Appointment';

@DefaultScope(() => ({
  include: [UserType, Gender, UserPhone],
  attributes: {
    exclude: ['passwordHash', 'companyId', 'userTypeId', 'genderId'],
  },
}))
@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  companyId!: number;

  @ForeignKey(() => UserType)
  @Column(DataType.INTEGER)
  userTypeId!: number;

  @ForeignKey(() => Gender)
  @Column(DataType.INTEGER)
  genderId!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  perfilImage!: string;

  @Column(DataType.VIRTUAL)
  get perfilImageURL() {
    const perfilImage = this.getDataValue('perfilImage')
    return perfilImage ? backendURL + '/static/perfil/' + perfilImage : null;
  }

  @Column(DataType.STRING)
  birth!: Date;

  @Column(DataType.STRING)
  passwordHash!: string;

  @Column(DataType.VIRTUAL)
  password!: string;

  @BelongsTo(() => Company)
  company!: Company;

  @BelongsTo(() => Gender)
  gender!: Gender;

  @BelongsTo(() => UserType)
  userType!: UserType;

  @HasOne(() => UserPhone, 'userId')
  phone!: UserPhone;

  @HasOne(() => ServiceDurationTime, 'barberId')
  serviceDuration!: String;

  @BelongsToMany(() => Service, 'BarberServices', 'barberId', 'serviceId')
  services!: Service[];

  @HasMany(() => Appointment, 'costumerId')
  costumerAppointments!: Appointment[];

  @HasMany(() => Appointment, 'barberId')
  barberAppointments!: Appointment[];

  static findAllClients(expression: any) {
    expression.where.userTypeId = CLIENT;
    return this.findAll(expression);
  }

  static findAllEmployees(expression: any) {
    expression.where.userTypeId = EMPLOYEE;
    return this.findAll(expression);
  }

  static findOneClient(expression: any) {
    expression.where.userTypeId = CLIENT;
    return this.findOne(expression);
  }
  static findOneEmployee(expression: any) {
    expression.where.userTypeId = EMPLOYEE;
    return this.findOne(expression);
  }

  @BeforeCreate
  @BeforeUpdate
  static setPassword(user: User) {
    if (user.password) {
      user.passwordHash = hashPassword(user.password);
    }
  }
}
