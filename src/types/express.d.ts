import { UserIdProps } from "./types";

declare global {
    namespace Express{
        interface Request {
            user?: UserIdProps;
        }
    }
}
