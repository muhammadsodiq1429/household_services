import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => {
      console.log(`Service started at: http://localhost:${PORT}`);
    });
  } catch (error) {}
}
start();
