'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TestWithUser = {
  id: string;
  wpm: number;
  language: string;
  difficulty: string;
  duration: number;
  user: {
    username: string;
  };
};

export function LeaderboardList({ tests }: { tests: TestWithUser[] }) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tests.map((test, index) => {
          const isTopThree = index < 3;
          const bgClass = isTopThree
            ? ['bg-yellow-50 border-yellow-300', 'bg-gray-100 border-gray-300', 'bg-orange-50 border-orange-300'][index]
            : 'bg-white border-zinc-200 ';

          const medal = ['🥇', '🥈', '🥉'][index];
          const textColor = isTopThree
            ? ['text-yellow-500', 'text-indigo-500', 'text-orange-800'][index]
            : 'text-zinc-800';

          const wpmColor =
            test.wpm >= 60
              ? 'text-green-600'
              : test.wpm >= 40
              ? 'text-yellow-600'
              : 'text-red-500';

          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className={`flex items-center justify-between p-4 border shadow-sm transition-shadow hover:shadow-md rounded-2xl ${bgClass}`}
              >
                <CardContent className="flex items-center gap-4 p-0">
                  {isTopThree ? (
                    <span className="text-3xl">{medal}</span>
                  ) : (
                    <UserIcon className="text-indigo-500" />
                  )}

                  <div>
                    <h2 className={`text-lg font-semibold ${textColor}`}>
                      {test.user.username}
                    </h2>
                    <p className={`text-sm font-medium ${wpmColor}`}>
                      WPM: {test.wpm}
                    </p>
                  </div>
                </CardContent>

                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
                    {test.language}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                    {test.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-rose-100 text-rose-800">
                    {test.duration}s
                  </Badge>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
