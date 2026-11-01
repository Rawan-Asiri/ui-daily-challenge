import { useCallback, useRef, useState } from 'react'
import { HistoryPanel } from './components/challenges/HistoryPanel'
import { DrawStage } from './components/draw/DrawStage'
import { HeroIntro } from './components/draw/HeroIntro'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ProgressPanel } from './components/progress/ProgressPanel'
import { ConfirmDialog } from './components/ui/ConfirmDialog'
import { Toaster } from './components/ui/Toaster'
import { getChallenge, TOTAL_CHALLENGES } from './data/challenges'
import { useDrawSequence } from './hooks/useDrawSequence'
import { useProgress } from './hooks/useProgress'
import { useToasts } from './hooks/useToasts'
import { countChallenges } from './lib/format'

type PendingReset = 'draws' | 'all' | null

const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ block: 'start' })

export default function App() {
  const { toasts, notify, dismiss } = useToasts()
  const warnSaveFailed = useCallback(
    () => notify('تعذّر حفظ تقدمك في هذا المتصفح، وسيضيع عند إغلاقه.'),
    [notify],
  )
  const { state, dispatch, pool, statusOf } = useProgress(warnSaveFailed)
  const [pendingReset, setPendingReset] = useState<PendingReset>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const onSelect = useCallback(
    (id: number) => dispatch({ type: 'draw', id, at: new Date().toISOString() }),
    [dispatch],
  )
  const onOpen = useCallback((id: number) => dispatch({ type: 'open', id }), [dispatch])
  const onClose = useCallback(() => dispatch({ type: 'close' }), [dispatch])

  const draw = useDrawSequence({ frameRef, pool, currentId: state.currentId, onSelect, onOpen, onClose })

  const completedCount = state.completed.length

  const handleComplete = (id: number) => {
    if (statusOf(id) === 'done') return
    dispatch({ type: 'complete', id, at: new Date().toISOString() })
    const remaining = TOTAL_CHALLENGES - completedCount - 1
    const element = getChallenge(id)?.element
    notify(
      remaining === 0
        ? 'مبروك! أنجزت التحديات الثلاثين كلها.'
        : `سجّلت ${element} منجزًا. ${remaining === 1 ? 'بقي تحدٍ واحد' : `بقي ${countChallenges(remaining)}`}.`,
      'success',
    )
  }

  const handleOpenFromList = (id: number) => {
    scrollToSection('draw')
    void draw.open(id)
  }

  const goToDraw = () => {
    scrollToSection('draw')
    document.getElementById('draw-button')?.focus({ preventScroll: true })
  }

  const confirmReset = () => {
    if (pendingReset === 'draws') {
      dispatch({ type: 'resetDraws' })
      notify('أعدت ضبط السحب. عادت التحديات غير المنجزة إلى القرعة.')
    } else {
      dispatch({ type: 'resetAll' })
      notify('مسحت كل التقدم. يمكنك البدء من جديد.')
    }
    setPendingReset(null)
  }

  const undoneDrawCount = state.drawn.length - state.drawn.filter(({ id }) => statusOf(id) === 'done').length

  return (
    <>
      <div className="on-navy canvas-dots bg-navy-950 text-white">
        <Header />
        <main id="draw" className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 sm:gap-8 sm:px-8 sm:pt-8 sm:pb-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <HeroIntro completedCount={completedCount} />
          <DrawStage
            state={state}
            pool={pool}
            statusOf={statusOf}
            frameRef={frameRef}
            draw={draw}
            onComplete={handleComplete}
            onReviewDrawn={() => scrollToSection('history')}
            onResetDraws={() => setPendingReset('draws')}
            onResetAll={() => setPendingReset('all')}
          />
        </main>
      </div>

      <ProgressPanel
        completedCount={completedCount}
        hasDraws={undoneDrawCount > 0}
        hasProgress={state.drawn.length > 0 || completedCount > 0}
        onResetDraws={() => setPendingReset('draws')}
        onResetAll={() => setPendingReset('all')}
      />
      <HistoryPanel
        drawn={state.drawn}
        completed={state.completed}
        statusOf={statusOf}
        onOpen={handleOpenFromList}
        onGoToDraw={goToDraw}
      />
      <Footer />

      <ConfirmDialog
        open={pendingReset === 'draws'}
        title="إعادة ضبط السحب؟"
        description={`سيعود ${countChallenges(undoneDrawCount)} غير منجز إلى القرعة، وتبقى إنجازاتك كما هي.`}
        confirmLabel="أعد ضبط السحب"
        onConfirm={confirmReset}
        onCancel={() => setPendingReset(null)}
      />
      <ConfirmDialog
        open={pendingReset === 'all'}
        title="مسح كل التقدم؟"
        description={
          completedCount > 0
            ? `سيُمسح سجل السحب وإنجازاتك (${countChallenges(completedCount)}) نهائيًا، ولا يمكن استعادتها.`
            : 'سيُمسح سجل السحب نهائيًا، ولا يمكن استعادته.'
        }
        confirmLabel="امسح كل التقدم"
        onConfirm={confirmReset}
        onCancel={() => setPendingReset(null)}
      />
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </>
  )
}
