-- CreateTable
CREATE TABLE "Fight" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "date" TIMESTAMP(3),
    "location" TEXT,
    "results" JSONB,
    "scheduledRounds" INTEGER,
    "scores" JSONB,
    "status" TEXT,
    "eventTitle" TEXT,
    "eventSlug" TEXT,
    "eventDate" TIMESTAMP(3),
    "eventLocation" TEXT,
    "divisionName" TEXT,
    "divisionWeightLb" DOUBLE PRECISION,
    "divisionWeightKg" DOUBLE PRECISION,
    "titleNames" JSONB,
    "fighter1Id" TEXT,
    "fighter1Name" TEXT,
    "fighter1Winner" BOOLEAN,
    "fighter2Id" TEXT,
    "fighter2Name" TEXT,
    "fighter2Winner" BOOLEAN,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);
