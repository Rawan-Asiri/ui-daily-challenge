import { formatDate } from '../../lib/format'
import type { ChallengeStatus, LogEntry } from '../../types'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import { SectionHeading } from '../ui/SectionHeading'
import { ChallengeRow } from './ChallengeRow'

interface LogProps {
  title: string
  entries: LogEntry[]
  statusOf: (id: number) => ChallengeStatus
  onOpen: (id: number) => void
  empty: { title: string; description: string }
  onGoToDraw: () => void
  metaLabel: string
}

function Log({ title, entries, statusOf, onOpen, empty, onGoToDraw, metaLabel }: LogProps) {
  const newestFirst = [...entries].reverse()
  return (
    <div className="min-w-0">
      <h3 className="mb-3 flex items-baseline gap-2 text-lg font-medium text-navy-950">
        {title}
        <span className="text-sm font-normal text-slate">{entries.length}</span>
      </h3>
      {newestFirst.length === 0 ? (
        <EmptyState
          title={empty.title}
          description={empty.description}
          action={
            <Button variant="outline" onClick={onGoToDraw}>
              اذهب إلى القرعة
            </Button>
          }
        />
      ) : (
        <ul>
          {newestFirst.map((entry) => (
            <ChallengeRow
              key={entry.id}
              id={entry.id}
              status={statusOf(entry.id)}
              meta={`${metaLabel} ${formatDate(entry.at)}`}
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

interface Props {
  drawn: LogEntry[]
  completed: LogEntry[]
  statusOf: (id: number) => ChallengeStatus
  onOpen: (id: number) => void
  onGoToDraw: () => void
}

export function HistoryPanel({ drawn, completed, statusOf, onOpen, onGoToDraw }: Props) {
  return (
    <section aria-labelledby="history-title" id="history" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        id="history-title"
        title="سجل الشهر"
        description="التحديات التي سحبتها ولم تنجزها لا تعود إلى القرعة، لكن يمكنك فتحها وإكمالها من هنا."
      />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Log
          title="التحديات المسحوبة"
          entries={drawn}
          statusOf={statusOf}
          onOpen={onOpen}
          onGoToDraw={onGoToDraw}
          metaLabel="سُحب في"
          empty={{ title: 'لم تسحب أي تحدٍ بعد', description: 'اسحب تحدي اليوم وسيظهر هنا.' }}
        />
        <Log
          title="التحديات المنجزة"
          entries={completed}
          statusOf={statusOf}
          onOpen={onOpen}
          onGoToDraw={onGoToDraw}
          metaLabel="أُنجز في"
          empty={{ title: 'لا إنجازات حتى الآن', description: 'نفّذ تحديًا ثم اضغط «أنجزت التحدي» لتسجيله هنا.' }}
        />
      </div>
    </section>
  )
}
