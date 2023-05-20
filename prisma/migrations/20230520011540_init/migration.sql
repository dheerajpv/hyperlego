-- CreateEnum
CREATE TYPE "Division" AS ENUM ('JA', 'JQA');

-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('PRACTICE', 'QUALIFICATION');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PLAYED', 'PLAYING', 'UNPLAYED');

-- CreateEnum
CREATE TYPE "Table" AS ENUM ('A1', 'A2', 'B1', 'B2');

-- CreateEnum
CREATE TYPE "ElevatorState" AS ENUM ('NEITHER', 'BLUE_CAR_DOWN', 'BALANCED');

-- CreateEnum
CREATE TYPE "CirclePosition" AS ENUM ('OUTSIDE', 'PARTIAL', 'COMPLETE');

-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "type" "MatchType" NOT NULL DEFAULT 'QUALIFICATION',
    "round" INTEGER NOT NULL,
    "status" "MatchStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "table" "Table" NOT NULL,
    "total" INTEGER NOT NULL,
    "supportedByBrige" BOOLEAN NOT NULL,
    "numFlags" INTEGER NOT NULL,
    "blueLowered" BOOLEAN NOT NULL,
    "blueIndependent" BOOLEAN NOT NULL,
    "blueInCircle" BOOLEAN NOT NULL,
    "droneSupported" BOOLEAN NOT NULL,
    "batSupported" BOOLEAN NOT NULL,
    "supportedByLargeBranches" INTEGER NOT NULL,
    "supportedBySmallBranches" INTEGER NOT NULL,
    "jamLifted" BOOLEAN NOT NULL,
    "swingReleased" BOOLEAN NOT NULL,
    "elevatorState" "ElevatorState" NOT NULL,
    "testBuildingIndependent" BOOLEAN NOT NULL,
    "steelIndependent" BOOLEAN NOT NULL,
    "beamsKnockedOut" INTEGER NOT NULL,
    "unitValidSize" BOOLEAN NOT NULL,
    "inCircle" "CirclePosition" NOT NULL,
    "matchingCircles" INTEGER NOT NULL,
    "heightSum" INTEGER NOT NULL,
    "sustainabilityUpgrades" INTEGER NOT NULL,
    "precisionTokens" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "division" "Division" NOT NULL,
    "school" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
