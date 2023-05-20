import { Server } from "socket.io";

declare module "next/server" {
    interface NextResponse {
        socket: Server;
    }
}
