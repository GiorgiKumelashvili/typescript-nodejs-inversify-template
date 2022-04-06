import { controller, httpGet } from "inversify-express-utils";
import { TestingService } from "../services/testing.service";

@controller("/test")
export class Test {
    constructor(private readonly testingService: TestingService) {}

    @httpGet("/")
    index() {
        const response = this.testingService.responseMessage();

        return response;
    }
}
