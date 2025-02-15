-- CreateTable
CREATE TABLE "MensRanking" (
    "id" SERIAL NOT NULL,
    "boxer" TEXT,
    "record" TEXT,
    "weightClass" TEXT,
    "currentWorldTitles" TEXT,
    "theRing" TEXT,
    "bwAA" TEXT,
    "tbrB" TEXT,
    "espn" TEXT,
    "boxRec" TEXT,

    CONSTRAINT "MensRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WomensRanking" (
    "id" SERIAL NOT NULL,
    "boxer" TEXT,
    "record" TEXT,
    "weightClass" TEXT,
    "currentWorldTitles" TEXT,
    "theRing" TEXT,
    "espn" TEXT,
    "boxRec" TEXT,

    CONSTRAINT "WomensRanking_pkey" PRIMARY KEY ("id")
);
