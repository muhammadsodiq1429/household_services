import { Module } from "@nestjs/common";
import { BotModule } from "./bot/bot.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { Master } from "./bot/models/master.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        middlewares: [],
        include: [BotModule],
        token: process.env.BOT_TOKEN!,
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: String(process.env.PG_USER),
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      models: [Master],
      sync: { alter: true },
      logging: false,
      autoLoadModels: true,
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
