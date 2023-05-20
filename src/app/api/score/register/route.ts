import prisma from "@/db";
import { score } from "@/lib/calc-score";
import { Scoresheet } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const scoresheet = (await req.json()) as Scoresheet;
    const total = score(scoresheet.scores);

    const obj = await prisma.score.create({
        data: {
            table: scoresheet.table,
            total,

            supportedByBrige: scoresheet.scores.supportedByBridge,
            numFlags: scoresheet.scores.flagsRaised,

            blueLowered: scoresheet.scores.blueUnitLowered,
            blueIndependent: scoresheet.scores.blueUnitSupported,
            blueInCircle: scoresheet.scores.blueUnitInCircle,

            droneSupported: scoresheet.scores.droneOnAxle,

            batSupported: scoresheet.scores.batOnBranch,

            supportedByLargeBranches: scoresheet.scores.unitsOnLargeBranch,
            supportedBySmallBranches: scoresheet.scores.unitsOnSmallBranch,

            jamLifted: scoresheet.scores.trafficJamLifted,

            swingReleased: scoresheet.scores.swingReleased,

            elevatorState: scoresheet.scores.elevator,

            testBuildingIndependent: scoresheet.scores.testBuildingIndependent,
            beamsKnockedOut: scoresheet.scores.beamsKnockedOut,

            steelIndependent: scoresheet.scores.steelStanding,

            unitValidSize: scoresheet.scores.structureValid,
            inCircle: scoresheet.scores.structureInCircle,

            matchingCircles: scoresheet.scores.colorMatchingCircles,
            heightSum: scoresheet.scores.heightSum,

            sustainabilityUpgrades: scoresheet.scores.upgrades,

            precisionTokens: scoresheet.scores.precision,

            matchId: scoresheet.round,
            teamId: scoresheet.team,
        },
    });

    return NextResponse.json(obj);
}
