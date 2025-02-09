-- CreateTable
CREATE TABLE "Broadcaster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Broadcaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FightBroadcasters" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FightBroadcasters_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FightBroadcasters_B_index" ON "_FightBroadcasters"("B");

-- AddForeignKey
ALTER TABLE "_FightBroadcasters" ADD CONSTRAINT "_FightBroadcasters_A_fkey" FOREIGN KEY ("A") REFERENCES "Broadcaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FightBroadcasters" ADD CONSTRAINT "_FightBroadcasters_B_fkey" FOREIGN KEY ("B") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
