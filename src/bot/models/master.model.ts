import { TimeLike } from "fs";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMasterCreationAttr {
  user_id: number;
  last_state: string;
}

@Table({ tableName: "master" })
export class Master extends Model<Master, IMasterCreationAttr> {
  @Column({ type: DataType.BIGINT, primaryKey: true })
  declare user_id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare location: string;

  @Column({ type: DataType.TIME })
  declare start_time: TimeLike;

  @Column({ type: DataType.STRING })
  declare finish_time: TimeLike;

  @Column({ type: DataType.INTEGER })
  declare service_id: number;

  @Column({ type: DataType.BOOLEAN })
  declare is_active: true;

  @Column({ type: DataType.BOOLEAN })
  declare is_verified: true;

  @Column({ type: DataType.STRING })
  declare last_state: string;
}
