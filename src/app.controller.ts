import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: "Health check",
        description: "Endpoint to check the health of the application.",
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
