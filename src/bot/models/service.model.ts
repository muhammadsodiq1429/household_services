import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IServiceCreationAttr {
  name: string;
}

@Table({ tableName: "service" })
export class Service extends Model<Service, IServiceCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;
}
