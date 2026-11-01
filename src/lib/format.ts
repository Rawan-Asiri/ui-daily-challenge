const dateFormat = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', {
  day: 'numeric',
  month: 'long',
})

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso))
}

/** صياغة العدد مع كلمة «تحدٍ» حسب قواعد العدد في العربية. */
export function countChallenges(count: number): string {
  if (count === 0) return 'لا تحديات'
  if (count === 1) return 'تحدٍ واحد'
  if (count === 2) return 'تحديان'
  if (count <= 10) return `${count} تحديات`
  return `${count} تحديًا`
}
