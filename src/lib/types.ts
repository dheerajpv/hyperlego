import type { CirclePosition, ElevatorState, Table } from "@prisma/client";

export interface Scoresheet {
    team: number;
    referee: string;
    table: Table;
    round: number;
    scores: Scores;
}

export interface Scores {
    advantage: boolean;

    supportedByBridge: boolean;
    flagsRaised: 0 | 1 | 2;

    blueUnitLowered: boolean;
    blueUnitSupported: boolean;
    blueUnitInCircle: boolean;

    droneOnAxle: boolean;

    batOnBranch: boolean;

    unitsOnLargeBranch: number;
    unitsOnSmallBranch: number;

    trafficJamLifted: boolean;

    swingReleased: boolean;

    elevator: ElevatorState;

    testBuildingIndependent: boolean;
    beamsKnockedOut: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    steelStanding: boolean;

    structureValid: boolean;
    structureInCircle: CirclePosition;

    colorMatchingCircles: 0 | 1 | 2 | 3;
    heightSum: number;

    upgrades: 0 | 1 | 2 | 3;

    precision: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
