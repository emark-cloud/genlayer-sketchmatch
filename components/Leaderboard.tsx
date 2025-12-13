interface LeaderboardProps {
  leaderboard: [string, number][];
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <ul className="space-y-3 mt-6">
      {leaderboard.map(([player, score], index) => (
        <li
          key={player}
          className="flex justify-between bg-gray-100 p-3 rounded border"
        >
          <span>
            {index + 1}. {player}
          </span>
          <span>{score} pts</span>
        </li>
      ))}
    </ul>
  );
}
