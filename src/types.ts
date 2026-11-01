export type Difficulty = 'Easy' | 'Medium' | 'Advanced'

export type DesignType =
  | 'مكوّن واجهة'
  | 'نموذج وإدخال'
  | 'تنقّل'
  | 'عرض بيانات'
  | 'لوحة تحكم'
  | 'صفحة كاملة'
  | 'تفاعل وتنبيه'

export interface Challenge {
  /** رقم اليوم في قائمة التحدي، من 1 إلى 30. */
  id: number
  element: string
  subject: string
  designType: DesignType
  difficulty: Difficulty
}

export type ChallengeStatus = 'waiting' | 'drawn' | 'done'

export interface LogEntry {
  id: number
  /** ISO timestamp */
  at: string
}

export interface ProgressState {
  drawn: LogEntry[]
  completed: LogEntry[]
  currentId: number | null
}
