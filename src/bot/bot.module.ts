import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Master } from "./models/master.model";
import { MasterService } from "./master/master.service";
import { MasterUpdate } from "./master/master.update";
import { Service } from "./models/service.model";

@Module({
  imports: [SequelizeModule.forFeature([Master, Service])],
  controllers: [],
  providers: [BotService, MasterService, MasterUpdate, BotUpdate],
})
export class BotModule {}
