import { BgText } from "@/components/News/BgText";
import { EventFighters } from "@/components/News/EventFighters";
import { prisma } from "@/lib/prisma";
import { Video } from "@/components/News/Video";
import { Countdown } from "@/components/News/Countdown";
import { EventDetails } from "@/components/News/EventDetails";
import { BroadcastProps } from "@/types/fightsType";

const Videos = [{
  id: "XXcnG0w5T9k",
  alt: "Gervonta Davis primed for Lamont Roach, aims for 3 fights in 2025",
  type: "INTERVIEW"
},
{
  id: "Kf682Zs_piM",
  alt: "Tank vs. Roach MEDIA WORKOUT",
  type: "MEDIA WORKOUT",
},
{
  id: "_NCcP6V67MA",
  alt: "GLOVES OFF: Tank vs Roach | EPISODE 1",
  type: "GLOVES OFF",
}]

export default async function News() {
  const id = '675f98329777a49a554299e9';
  const fetchedFight = await prisma.fight.findUnique({
    where: { id },
    select: {
      title: true,
      location: true,
      date: true,
      eventDate: true,
      broadcasters: true,
      fighter1: { select: { name: true, nickname: true } },
      fighter2: { select: { name: true, nickname: true } },
    },
  });

  if (!fetchedFight)
    console.error('No fight found');

  return (
    <main className={`relative bg-gray-100 px-7 py-16`}>
      <Countdown date={fetchedFight?.eventDate?.toISOString()} />
      <div className="relative overflow-hidden z-10">
        <EventFighters
          fighter1={fetchedFight?.fighter1}
          fighter2={fetchedFight?.fighter2}
        >
          <EventDetails
            fighter1={fetchedFight?.fighter1?.name || fetchedFight?.fighter1?.nickname}
            fighter2={fetchedFight?.fighter2?.name || fetchedFight?.fighter2?.nickname}
            eventDate={fetchedFight?.eventDate?.toISOString()}
            location={fetchedFight?.location}
            date={fetchedFight?.date?.toISOString()}
            broadcasters={fetchedFight?.broadcasters as BroadcastProps[] | undefined}
          />
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
        </EventFighters>
        <BgText
          fighter1={fetchedFight?.fighter1?.name || fetchedFight?.fighter1?.nickname}
          fighter2={fetchedFight?.fighter2?.name || fetchedFight?.fighter2?.nickname}
        />
      </div>
    </main >
  )
}

export const metadata = {
  title: "News - Boxing",
  description: "Generated by create next app",
};