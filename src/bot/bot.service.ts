import { Injectable } from "@nestjs/common";
import { Context, Markup } from "telegraf";
import { Master } from "./models/master.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Master) private readonly masterModel: typeof Master
  ) {}
  // private async userFound(user_id: number | undefined, ctx: Context) {
  //   if (!(await this.masterModel.findByPk(user_id))) {
  //     await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
  //       ...Markup.keyboard([["/start"]])
  //         .oneTime()
  //         .resize(),
  //     });
  //   }
  // }
  async start(ctx: Context) {
    try {
      // const user_id = ctx.message?.from.id;
      // this.userFound(user_id, ctx);
      await ctx.replyWithHTML(
        `<b>Ro‘yxatdan o‘tish uchun quyidagi tugmani bosing:</b>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Ro‘xatdan o‘tish", callback_data: "Ro‘xatdan o‘tish" }],
            ],
          },
        }
      );
    } catch (error) {
      console.log("Error on start:", error);
    }
  }

  async onClickSignUp(ctx: Context) {
    try {
      await ctx.replyWithHTML(`<b>Kim bo‘lib ro‘xatdan o‘tmoqchisiz?</b>`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Usta", callback_data: "Usta" },
              { text: "Mijoz", callback_data: "Mijoz" },
            ],
          ],
        },
      });
    } catch (error) {
      console.log("Error on 'ClickSignUp' function", error);
    }
  }

  async onText(ctx: Context) {
    if (ctx.message && "text" in ctx.message) {
      try {
        const master = await this.masterModel.findByPk(ctx.from!.id);
        if (!master) {
          await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(),
          });
        } else if (master && master.last_state != "finish") {
          const masterInput = ctx.message.text;
          switch (master.last_state) {
            case "name":
              master.name = masterInput;
              await master.save();
              await ctx.reply(
                "Telefon raqamni yuborish uchun pastdagi tugmasi bosing:",
                {
                  ...Markup.keyboard([
                    Markup.button.contactRequest("Telefon raqamni ulashish"),
                  ])
                    .oneTime()
                    .resize(),
                }
              );
              break;

            default:
              break;
          }
        }
      } catch (error) {
        console.log("Error on 'Text' function");
      }
    }
  }

  async onContact(ctx: Context) {
    if (ctx.message && "contact" in ctx.message) {
      try {
        const master = await this.masterModel.findByPk(ctx.from!.id);
        if (!master) {
          await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(),
          });
        } else {
          master.phone = ctx.message.contact.phone_number;
          await master.save();

          await ctx.reply(
            "Manzilingiz joylashivini yuborish uchun pastdagi tugmani bosing:",
            {
              ...Markup.keyboard([
                [Markup.button.locationRequest("Joylashuvni ulashish")],
              ]),
            }
          );
        }
      } catch (error) {
        console.log("Error on 'Contact' function");
      }
    }
  }
}
