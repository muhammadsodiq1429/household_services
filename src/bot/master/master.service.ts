import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Master } from "../models/master.model";
import { Context } from "telegraf";
import { Service } from "../models/service.model";
import { InlineKeyboardButton } from "@telegraf/types";
import { ReplaySubject } from "rxjs";

@Injectable()
export class MasterService {
  constructor(
    @InjectModel(Master) private readonly masterModel: typeof Master,
    @InjectModel(Service) private readonly serviceModel: typeof Service
  ) {}

  async onClickMaster(ctx: Context) {
    try {
      const services = await this.serviceModel.findAll();
      if (services.length === 0) {
        await ctx.reply("Xizmat turi topilmadi");
        return;
      }

      const buttons: InlineKeyboardButton[][] = services.map((service) => [
        {
          text: `${service.name}`,
          callback_data: `service_${service.id}`,
        },
      ]);

      await ctx.replyWithHTML(
        `<b>Quyidagi xizmat turlaridan birini tanlang:</b>`,
        {
          reply_markup: {
            inline_keyboard: buttons,
          },
        }
      );
    } catch (error) {
      console.log("Error on 'ClickMaster' function");
    }
  }

  async onClickService(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const contextMessage = ctx.callbackQuery!["message"];
      // const text = (contextMessage as any).text
      const serviceId = contextAction.split("_")[1];
      const service = await this.serviceModel.findByPk(serviceId);
      console.log(service);
      const newMaster = await this.masterModel.create({
        user_id: ctx.from!.id,
        last_state: "name",
      });
      // const master = await this.masterModel.findByPk(ctx.from?.id);
      if (service) {
        newMaster.service_id = service?.id;
        await newMaster?.save();
      }

      await ctx.reply("Ismingizni kiriting:");
    } catch (error) {
      console.log("Error on 'ClickService' function", error);
    }
  }

}
