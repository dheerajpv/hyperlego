"use client";

import BooleanField from "@/components/BooleanField";
import RadioRange from "@/components/RadioRange";
import { score } from "@/lib/calc-score";
import { Scores } from "@/lib/types";
import type { ElevatorState, CirclePosition, Table } from "@prisma/client";
import { useMemo, useState } from "react";

export default function ScorePage() {
    const [matchNum, setMatchNum] = useState(0);
    const [table, setTable] = useState<Table>("A1");
    const [referee, setReferee] = useState("");
    const [team, setTeam] = useState(0);

    const [advantage, setAdvantage] = useState(false);

    // M01
    const [supportedByBridge, setSupportedByBridge] = useState(false);
    const [flagsRaised, setFlagsRaised] = useState<Scores["flagsRaised"]>(0);

    // M02
    const [craneLowered, setCraneLowered] = useState(false);
    const [blueSupported, setBlueSupported] = useState(false);
    const [blueInCircle, setBlueInCircle] = useState(false);

    // M03
    const [droneOnAxle, setDroneOnAxle] = useState(false);

    // M04
    const [batOnBranch, setBatOnBranch] = useState(false);

    // M05
    const [unitsOnLarge, setUnitsOnLarge] = useState(0);
    const [unitsOnSmall, setUnitsOnSmall] = useState(0);

    // M06
    const [jamLifted, setJamLifted] = useState(false);

    // M07
    const [swingReleased, setSwingReleased] = useState(false);

    // M08
    const [elevatorPos, setElevatorPos] = useState<ElevatorState>("NEITHER");

    // M09
    const [testIndependent, setTestIndependent] = useState(false);
    const [beamsKnockedOut, setBeamsKnockedOut] =
        useState<Scores["beamsKnockedOut"]>(0);

    // M10
    const [steelStanding, setSteelStanding] = useState(false);

    // M11
    const [structureValid, setStructureValid] = useState(false);
    const [structureInCircle, setStructureInCircle] =
        useState<CirclePosition>("OUTSIDE");

    // M12
    const [colorMatchingCircles, setColorMatchingCircles] =
        useState<Scores["colorMatchingCircles"]>(0);
    const [heightSum, setHeightSum] = useState(0);

    // M13
    const [upgrades, setUpgrades] = useState<Scores["upgrades"]>(0);

    // M14
    const [tokensLeft, setTokensLeft] = useState<Scores["precision"]>(6);

    const totalScore = useMemo(
        () =>
            score({
                advantage,
                batOnBranch,
                beamsKnockedOut,
                blueUnitInCircle: blueInCircle,
                colorMatchingCircles,
                blueUnitLowered: craneLowered,
                blueUnitSupported: blueSupported,
                droneOnAxle,
                elevator: elevatorPos,
                flagsRaised,
                heightSum,
                trafficJamLifted: jamLifted,
                swingReleased,
                steelStanding,
                structureInCircle,
                structureValid,
                supportedByBridge,
                testBuildingIndependent: testIndependent,
                precision: tokensLeft,
                unitsOnLargeBranch: unitsOnLarge,
                unitsOnSmallBranch: unitsOnSmall,
                upgrades,
            }),
        [
            advantage,
            batOnBranch,
            beamsKnockedOut,
            blueInCircle,
            blueSupported,
            colorMatchingCircles,
            craneLowered,
            droneOnAxle,
            elevatorPos,
            flagsRaised,
            heightSum,
            jamLifted,
            steelStanding,
            structureInCircle,
            structureValid,
            supportedByBridge,
            swingReleased,
            testIndependent,
            tokensLeft,
            unitsOnLarge,
            unitsOnSmall,
            upgrades,
        ]
    );

    return (
        <main>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await fetch("/api/score/register", {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            advantage,
                            batOnBranch,
                            beamsKnockedOut,
                            blueUnitInCircle: blueInCircle,
                            colorMatchingCircles,
                            blueUnitLowered: craneLowered,
                            blueUnitSupported: blueSupported,
                            droneOnAxle,
                            elevator: elevatorPos,
                            flagsRaised,
                            heightSum,
                            trafficJamLifted: jamLifted,
                            swingReleased,
                            steelStanding,
                            structureInCircle,
                            structureValid,
                            supportedByBridge,
                            testBuildingIndependent: testIndependent,
                            precision: tokensLeft,
                            unitsOnLargeBranch: unitsOnLarge,
                            unitsOnSmallBranch: unitsOnSmall,
                            upgrades,
                        }),
                    });
                    if (res.ok) e.currentTarget.reset();
                }}
            >
                <section className="flex flex-row justify-between">
                    <div className="max-w-[50%]">
                        <div className="grid grid-cols-2 p-2 m-2 border-black border">
                            <div className="flex flex-row max-w-fit m-2">
                                <label htmlFor="team">Team #:</label>
                                <input
                                    className="rounded-md border-black border max-w-[100px] ml-2 p-1"
                                    type="number"
                                    name="team"
                                    id="team"
                                    min={1}
                                    max={24}
                                    value={team}
                                    onChange={(e) =>
                                        setTeam(e.target.valueAsNumber)
                                    }
                                />
                            </div>
                            <div className="flex flex-row max-w-fit m-2">
                                <label htmlFor="referee">Referee:</label>
                                <input
                                    className="rounded-md border-black border max-w-[150px] ml-2 p-1"
                                    type="string"
                                    name="referee"
                                    id="referee"
                                    value={referee}
                                    onChange={(e) => setReferee(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-row max-w-fit m-2">
                                <label htmlFor="round">Round:</label>
                                <input
                                    type="number"
                                    name="round"
                                    id="round"
                                    min={1}
                                    max={24}
                                    className="rounded-md border-black border max-w-[100px] ml-2 p-1"
                                    value={matchNum}
                                    onChange={(e) =>
                                        setMatchNum(e.target.valueAsNumber)
                                    }
                                />
                            </div>
                            <div className="flex flex-row max-w-fit m-2">
                                <label htmlFor="table">Table:</label>
                                <select
                                    name="table"
                                    id="table"
                                    className="ml-2 p-1 rounded-md border-black border"
                                >
                                    <option value="A1">1A</option>
                                    <option value="B1">1B</option>
                                    <option value="A2">2A</option>
                                    <option value="B2">2B</option>
                                </select>
                            </div>
                        </div>
                        <section>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>Advantage</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        Your Robot and Equipment fit in the
                                        Small inspection Area:
                                    </p>
                                    <BooleanField
                                        onChange={setAdvantage}
                                        name="advantage"
                                        value={advantage}
                                    ></BooleanField>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M01 - Elevated Places</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        The Robot is supported by the Bridge:
                                    </p>
                                    <BooleanField
                                        onChange={setSupportedByBridge}
                                        name="supported-by-bridge"
                                        value={supportedByBridge}
                                    />
                                    <p className="col-span-3">
                                        Number of flags that are clearly raised
                                        any distance, only by the Robot:
                                    </p>
                                    <RadioRange
                                        name="flags-raised"
                                        max={2}
                                        // @ts-ignore
                                        onChange={setFlagsRaised}
                                        value={flagsRaised}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M02 - Crane</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        The Hooked Blue Unit is clearly lowered
                                        any distance from the Guide Hole:
                                    </p>
                                    <BooleanField
                                        onChange={setCraneLowered}
                                        name="crane-lowered"
                                        value={craneLowered}
                                    ></BooleanField>
                                    <p className="col-span-3">
                                        The Hooked Blue Unit is Independent and
                                        Supported by another Blue Unit:
                                    </p>
                                    <BooleanField
                                        onChange={setBlueSupported}
                                        name="blue-supported"
                                        value={blueSupported}
                                    />
                                    <p className="col-span-3">
                                        AND Level 1 is Completely in the Blue
                                        Circle:
                                    </p>
                                    <BooleanField
                                        onChange={setBlueInCircle}
                                        name="blue-in-circle"
                                        value={blueInCircle}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M03 - Inspection Drone</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        The Inspection Drone is Supported by the
                                        axle on the Bridge:
                                    </p>
                                    <BooleanField
                                        onChange={setDroneOnAxle}
                                        name="drone-on-axle"
                                        value={droneOnAxle}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M04 - Design for Wildlife</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        The Bat is Supported by the branch on
                                        the Tree:
                                    </p>
                                    <BooleanField
                                        onChange={setBatOnBranch}
                                        name="bat-on-branch"
                                        value={batOnBranch}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M05 - Treehouse</h3>
                                <div className="grid grid-cols-4">
                                    <label
                                        htmlFor="units-on-large"
                                        className="col-span-3"
                                    >
                                        Number of Units Independent and
                                        Supported by the Tree&apos;s Large
                                        Branches:
                                    </label>
                                    <input
                                        type="number"
                                        name="units-on-large"
                                        id="units-on-large"
                                        value={unitsOnLarge}
                                        onChange={(e) =>
                                            setUnitsOnLarge(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        className="max-w-[100px] max-h-[75%] rounded-md border-black border p-1"
                                    />
                                    <label
                                        htmlFor="units-on-small"
                                        className="col-span-3"
                                    >
                                        Number of Units Independent and
                                        Supported by the Tree&apos;s Small
                                        Branches:
                                    </label>
                                    <input
                                        type="number"
                                        name="units-on-small"
                                        id="units-on-small"
                                        value={unitsOnSmall}
                                        onChange={(e) =>
                                            setUnitsOnSmall(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        className="max-w-[100px] max-h-[75%] rounded-md border-black border p-1"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 m-2 border-black border">
                                <h3>M06 - Traffic Jam</h3>
                                <div className="grid grid-cols-4">
                                    <p className="col-span-3">
                                        The Traffic Jam is lifted, its moving
                                        part is Independent, and it is Supported
                                        only by its hinges:
                                    </p>
                                    <BooleanField
                                        onChange={setJamLifted}
                                        name="jam-lifted"
                                        value={jamLifted}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="max-w-[50%]">
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M07 - Swing</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    The Swing is released:
                                </p>
                                <BooleanField
                                    onChange={setSwingReleased}
                                    name="swing-released"
                                    value={swingReleased}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M08 - Elevator</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    The Elevator&apos;s moving parts are
                                    Independent and Supported only by its
                                    hinges, in the following position:
                                </p>
                                <select
                                    name="elevator"
                                    id="elevator"
                                    title="Elevator Position"
                                    onChange={(e) =>
                                        setElevatorPos(
                                            e.target.value as ElevatorState
                                        )
                                    }
                                    value={elevatorPos}
                                    className="rounded-md border-black border p-2 m-2"
                                >
                                    <option value="NEITHER">Neither</option>
                                    <option value="BLUE_CAR_DOWN">
                                        Blue Car Down
                                    </option>
                                    <option value="BALANCED">Balanced</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M09 - Safety Factor</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    The Test Building is Independent and
                                    Supported only by the blue beams:
                                </p>
                                <BooleanField
                                    onChange={setTestIndependent}
                                    name="test-independent"
                                    value={testIndependent}
                                />
                                <p className="col-span-2">
                                    Number of blue beams knocked out at least
                                    half way:
                                </p>
                                <RadioRange
                                    max={6}
                                    value={beamsKnockedOut}
                                    // @ts-ignore
                                    onChange={setBeamsKnockedOut}
                                    name="beams-knocked-out"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M10 - Steel Construction</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    The Steel Structure is standing, and is
                                    Independent and Supported only by its
                                    hinges:
                                </p>
                                <BooleanField
                                    onChange={setSteelStanding}
                                    name="steel-standing"
                                    value={steelStanding}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M11 - Innovative Architecture</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    The Structure is bigger than a Blue Building
                                    Unit and built from the team&apos;s white
                                    LEGO bricks:
                                </p>
                                <BooleanField
                                    onChange={setStructureValid}
                                    name="structure-valid"
                                    value={structureValid}
                                />
                                <p className="col-span-3">
                                    The Structure is in any Circle:
                                </p>
                                <select
                                    name="structure-in-circle"
                                    id="structure-in-circle"
                                    title="Structure in Circle"
                                    onChange={(e) =>
                                        setStructureInCircle(
                                            e.target.value as CirclePosition
                                        )
                                    }
                                    value={structureInCircle}
                                    className="rounded-md border-black border p-2 m-2"
                                >
                                    <option value="OUTSIDE">No</option>
                                    <option value="PARTIAL">Partly</option>
                                    <option value="COMPLETE">Completely</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M12 - Design & Build</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    Number of Circles with a color-matching
                                    Unit, flat down on the Mat, and Completely
                                    in Circle:
                                </p>
                                <RadioRange
                                    max={3}
                                    value={colorMatchingCircles}
                                    // @ts-ignore
                                    onChange={setColorMatchingCircles}
                                    name="color-matching-circles"
                                />
                                <label
                                    htmlFor="height-sum"
                                    className="col-span-3"
                                >
                                    Sum of height Levels of Independent Stacks
                                    at least partly in any Circle:
                                </label>
                                <input
                                    type="number"
                                    name="height-sum"
                                    id="height-sum"
                                    value={heightSum}
                                    onChange={(e) =>
                                        setHeightSum(e.target.valueAsNumber)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M13 - Sustainability Upgrades</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-3">
                                    Number of Upgrades that are Independent and
                                    Supported only by a Stack which is at least
                                    partly in a Circle:
                                </p>
                                <RadioRange
                                    name="upgrades"
                                    value={upgrades}
                                    // @ts-ignore
                                    onChange={setUpgrades}
                                    max={3}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-2 border-black border">
                            <h3>M14 - Precision</h3>
                            <div className="grid grid-cols-4">
                                <p className="col-span-2">
                                    Number of Precision Tokens left on the
                                    field:
                                </p>
                                <RadioRange
                                    name="precision"
                                    value={tokensLeft}
                                    // @ts-ignore
                                    onChange={setTokensLeft}
                                    max={6}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-400 hover:bg-blue-500 text-black transition-all p-2 m-2 rounded-md border-black border"
                        >
                            Submit
                        </button>
                    </div>
                </section>
            </form>
        </main>
    );
}
