import { TOTAL_CHALLENGES } from '../../data/challenges'

function Figure({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dd className="font-display text-2xl leading-none font-medium text-white sm:text-4xl">{value}</dd>
      <dt className="text-sm text-sky-200">{label}</dt>
    </div>
  )
}

export function HeroIntro({ completedCount }: { completedCount: number }) {
  return (
    <div className="max-w-xl lg:pt-6">
      <h1 className="font-display text-[1.75rem] leading-[1.35] font-medium text-white sm:text-5xl sm:leading-[1.3] xl:text-[3.5rem]">
        تحدي نوفمبر لتصميم واجهات المستخدم
      </h1>
      <p className="mt-2 text-base text-sky-200 sm:mt-6 sm:text-xl">كل يوم فكرة جديدة، وكل تحدٍ يطور مهارتك.</p>
      <dl className="mt-3 flex items-baseline gap-8 sm:mt-10">
        <Figure value={TOTAL_CHALLENGES} label="تحديًا" />
        <Figure value={completedCount} label="منجز" />
      </dl>
    </div>
  )
}
