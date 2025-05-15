import { BotService } from "./bot.service";
import { Action, Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    return this.botService.start(ctx);
  }

  @Action("Ro‘xatdan o‘tish")
  async onClickSignUp(@Ctx() ctx: Context) {
    return this.botService.onClickSignUp(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    return this.botService.onText(ctx);
  }
}
