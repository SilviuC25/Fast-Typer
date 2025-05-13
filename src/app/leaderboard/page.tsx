import { prisma } from '@/lib/prisma';
import { Trophy } from 'lucide-react';
import { LeaderboardList } from '@/components/LeaderboardList';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const topTests = await prisma.test.findMany({
    orderBy: { wpm: 'desc' },
    distinct: ['userId'],
    take: 20,
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="text-center mb-8 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500 w-8 h-8 animate-pulse" />
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>

      <LeaderboardList tests={topTests} />
    </div>
  );
}
