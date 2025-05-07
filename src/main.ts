import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { config } from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const swaggerConfig = new DocumentBuilder()
        .setTitle("AuthNest API")
        .setDescription("API documentation for AuthNest")
        .setVersion("1.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                in: "header",
                name: "Authorization",
                bearerFormat: "JWT",
            },
            "access-token",
        )
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
