import { Scores } from "./types";

export function score(scores: Scores): number {
    const {
        advantage,
        supportedByBridge,
        flagsRaised,
        blueUnitLowered: craneLowered,
        blueUnitSupported: blueSupported,
        blueUnitInCircle: blueInCircle,
        droneOnAxle,
        batOnBranch,
        unitsOnLargeBranch: unitsOnLarge,
        unitsOnSmallBranch: unitsOnSmall,
        trafficJamLifted: jamLifted,
        swingReleased,
        elevator: elevatorPos,
        testBuildingIndependent: testIndependent,
        steelStanding,
        beamsKnockedOut,
        structureValid,
        structureInCircle,
        colorMatchingCircles,
        heightSum,
        upgrades,
        precision: tokensLeft,
    } = scores;

    let missionsScored = 0;

    if (supportedByBridge || flagsRaised > 0) missionsScored++;
    // M02 is separate
    if (droneOnAxle) missionsScored++;
    if (batOnBranch) missionsScored++;
    if (unitsOnLarge > 0 || unitsOnSmall > 0) missionsScored++;
    if (jamLifted) missionsScored++;
    if (swingReleased) missionsScored++;
    if (elevatorPos !== "NEITHER") missionsScored++;
    if (testIndependent && beamsKnockedOut > 0) missionsScored++;
    if (steelStanding) missionsScored++;
    if (structureValid && structureInCircle !== "OUTSIDE") missionsScored++;
    if (colorMatchingCircles > 0) missionsScored++;
    if (upgrades > 0) missionsScored++;
    // M14 is exempt

    const m2Bonus = craneLowered ? 10 : 0;
    const advantageBonus = missionsScored * 5 + m2Bonus;

    let baseScore = 0;

    if (supportedByBridge) {
        baseScore += 20;
        baseScore += flagsRaised * 15;
    }

    if (craneLowered) baseScore += 20;
    if (blueSupported) {
        baseScore += 15;
        if (blueInCircle) baseScore += 15;
    }

    if (droneOnAxle) baseScore += 10;

    if (batOnBranch) baseScore += 10;

    baseScore += unitsOnLarge * 10;
    baseScore += unitsOnSmall * 15;

    if (jamLifted) baseScore += 10;

    if (swingReleased) baseScore += 20;

    if (elevatorPos === "BLUE_CAR_DOWN") baseScore += 15;
    else if (elevatorPos === "BALANCED") baseScore += 20;

    if (testIndependent) baseScore += beamsKnockedOut * 10;

    if (steelStanding) baseScore += 20;

    if (structureValid) {
        if (structureInCircle === "PARTIAL") baseScore += 10;
        else if (structureInCircle === "COMPLETE") baseScore += 15;
    }

    baseScore += colorMatchingCircles * 10;
    baseScore += heightSum * 5;

    baseScore += upgrades * 10;

    const lookup = {
        6: 60,
        5: 45,
        4: 30,
        3: 20,
        2: 10,
        1: 5,
    } as const;
    baseScore += lookup[tokensLeft as keyof typeof lookup];

    return baseScore + (advantage ? advantageBonus : 0);
}
