type Fighter = {
  name: string;
};

type Event = {
  title: string;
  slug: string;
  date: string;
  location: string;
  status: string;
  broadcasters: string[];
  id: string;
};

type Match = {
  id: string;
  title: string;
  date: string;
  location: string;
  scheduled_rounds: number;
  status: string;
  fighters: {
    fighter_1: Fighter;
    fighter_2: Fighter;
  };
  event: Event;
};

export default async function Home() {
  const url = 'https://boxing-data-api.p.rapidapi.com/v1/fights/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6d8f144cc1msh9ee0c53d6339abfp1b3198jsnefa95c58c76d',
      'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com'
    }
  };

  const fetchMatches = async (page: number): Promise<any> => {
    const res = await fetch(`${url}?page=${page}`, options);
    return res.json();
  };

  let allMatches: Match[] = [];
  let page = 1;

  try {
    let data: any;
    do {
      data = await fetchMatches(page);
      
      // Log the data to inspect its structure
      console.log('Fetched data:', data);

      // Check if the fetched data is an array before spreading
      if (Array.isArray(data)) {
        allMatches = [...allMatches, ...data];
      } else {
        console.error('Fetched data is not an array:', data);
        break; // Exit loop if data is not in the expected format
      }

      page += 1; // Increase page number to fetch the next set of matches
    } while (data.length === 25); // Continue until less than 25 matches are returned (last page)

    // Group matches by event
    const groupedByEvent = allMatches.reduce((groups: { [key: string]: Match[] }, match) => {
      const eventId = match.event.id;
      if (!groups[eventId]) {
        groups[eventId] = [];
      }
      groups[eventId].push(match);
      return groups;
    }, {});

    return (
      <div>
        <h1>Upcoming Fights</h1>
        {Object.entries(groupedByEvent).map(([eventId, matches]) => {
          const event = matches[0].event; // All matches in this group have the same event
          return (
            <div key={eventId} className="match-card">
              <h2>{event.title}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>Status: {event.status}</p>
              {matches.map((match) => (
                <div key={match.id}>
                  <h3>{match.title}</h3>
                  <p>Date: {new Date(match.date).toLocaleDateString()}</p>
                  <p>Rounds: {match.scheduled_rounds}</p>
                  <p>Status: {match.status}</p>
                  <div>
                    <strong>
                      {match.fighters.fighter_1.name} vs {match.fighters.fighter_2.name}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}
