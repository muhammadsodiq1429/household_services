import { Context } from "telegraf";
import { MasterService } from "./master.service";
import { Action, Ctx, Update } from "nestjs-telegraf";

@Update()
export class MasterUpdate {
  constructor(private readonly masterService: MasterService) {}

  @Action("Usta")
  async onClickMaster(@Ctx() ctx: Context) {
    return this.masterService.onClickMaster(ctx);
  }

  @Action(/^service_+\d/)
  async onClickService(@Ctx() ctx: Context) {
    return this.masterService.onClickService(ctx);
  }
}
