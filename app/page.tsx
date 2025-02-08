import { BgText } from "@/components/News/BgText";
import { Event } from "@/components/News/Event";
import { Fight } from "@/components/News/FIght";
import { Location } from "@/components/News/Location";
import { EventDate } from "@/components/News/EventDate";
import { prisma } from "@/lib/prisma";
import { Video } from "@/components/News/Video";
import { rajdhani } from "@/fonts/fonts";

const Videos = [{
  id: "lUAA0b-YjQM",
  alt: "Artur Beterbiev vs Dmitry Bivol Face Off",
  type: "The Face-off"
},
{
  id: "n4LJ-wmRbc8",
  alt: "Artur Beterbiev vs Dmitry Bivol Press Conference",
  type: "Press Conference"
},
{
  id: "nDyCgocB5aM",
  alt: "Artur Beterbiev vs Dmitry Bivol First fight",
  type: "First Fight"
}]

export default async function News() {
  const id = '675269742d129078aff55563';
  const fetchedFight = await prisma.fight.findUnique({
    where: { id },
    select: {
      title: true,
      location: true,
      date: true,
      fighter1: { select: { name: true, nickname: true } },
      fighter2: { select: { name: true, nickname: true } },
    },
  });

  if (!fetchedFight) {
    console.error('No fight found');
  }
  return (
    <main className={`relative bg-gray-100 px-7 py-16 ${rajdhani.className} overflow-hidden`}>
      <BgText
        fighter1={fetchedFight?.fighter1?.name || fetchedFight?.fighter1?.nickname}
        fighter2={fetchedFight?.fighter2?.name || fetchedFight?.fighter2?.nickname}
      />
      <Event
        fighter1={fetchedFight?.fighter1}
        fighter2={fetchedFight?.fighter2}
      >
        <Fight
          fighter1={fetchedFight?.fighter1?.name || fetchedFight?.fighter1?.nickname}
          fighter2={fetchedFight?.fighter2?.name || fetchedFight?.fighter2?.nickname}
        />
        <Location
          location={fetchedFight?.location}
        />
        <EventDate date={fetchedFight?.date?.toISOString()} />

        {/* Videos */}
        <div className="flex flex-row gap-1">
          {Videos.map((video) => (
            <Video
              key={video.id}
              id={video.id}
              alt={video.alt}
              type={video.type}
            />
          ))
          }
        </div>
      </Event>
    </main >
  )
}

export const metadata = {
  title: "News - Boxing",
  description: "Generated by create next app",
};