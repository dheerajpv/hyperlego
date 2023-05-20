import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const sort = new URLSearchParams(req.url).get("sort") ?? "id";

    const scores = await prisma.score.findMany({
        orderBy: {
            [sort]: "asc",
        },
    });

    return NextResponse.json(scores);
}
