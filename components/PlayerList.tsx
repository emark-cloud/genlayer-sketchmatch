interface PlayerListProps {
  players: string[];
  readyPlayers: string[];
}

export default function PlayerList({ players, readyPlayers }: PlayerListProps) {
  return (
    <ul className="mt-4 space-y-2">
      {players.map((p) => (
        <li
          key={p}
          className="bg-gray-100 rounded p-3 flex justify-between"
        >
          <span>{p}</span>

          <span className={readyPlayers.includes(p) ? "text-green-600" : "text-gray-400"}>
            {readyPlayers.includes(p) ? "Ready" : "Not Ready"}
          </span>
        </li>
      ))}
    </ul>
  );
}
