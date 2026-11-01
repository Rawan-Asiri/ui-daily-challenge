import type { Challenge } from '../types'

export const CHALLENGES: readonly Challenge[] = [
  { id: 1, element: 'Profile Card', subject: 'بطاقة تعريف لمصممة واجهات', designType: 'مكوّن واجهة', difficulty: 'Easy' },
  { id: 2, element: 'Button', subject: 'مجموعة أزرار لتطبيق بنكي', designType: 'مكوّن واجهة', difficulty: 'Easy' },
  { id: 3, element: 'Dashboard', subject: 'واجهة تجمع معسكرات تدريبية لمتدربة', designType: 'لوحة تحكم', difficulty: 'Advanced' },
  { id: 4, element: 'Search Bar', subject: 'شريط بحث لمنصة كتب إلكترونية', designType: 'نموذج وإدخال', difficulty: 'Easy' },
  { id: 5, element: 'Navigation Bar', subject: 'شريط تنقل لتطبيق تسوق', designType: 'تنقّل', difficulty: 'Easy' },
  { id: 6, element: 'Login Form', subject: 'تسجيل دخول لمنصة تعليمية', designType: 'نموذج وإدخال', difficulty: 'Easy' },
  { id: 7, element: 'Product Card', subject: 'بطاقة منتج لمتجر عطور', designType: 'مكوّن واجهة', difficulty: 'Easy' },
  { id: 8, element: 'Pricing Card', subject: 'باقات اشتراك لمنصة تصميم', designType: 'مكوّن واجهة', difficulty: 'Medium' },
  { id: 9, element: 'Notification Card', subject: 'إشعار موعد تسليم مشروع', designType: 'تفاعل وتنبيه', difficulty: 'Easy' },
  { id: 10, element: 'Sidebar', subject: 'قائمة جانبية لنظام إدارة مشاريع', designType: 'تنقّل', difficulty: 'Medium' },
  { id: 11, element: 'Statistics Card', subject: 'بطاقة إحصائيات لمتجر إلكتروني', designType: 'عرض بيانات', difficulty: 'Easy' },
  { id: 12, element: 'Empty State', subject: 'واجهة عدم وجود مهام', designType: 'تفاعل وتنبيه', difficulty: 'Easy' },
  { id: 13, element: 'Progress Bar', subject: 'مؤشر تقدم دورة تدريبية', designType: 'تفاعل وتنبيه', difficulty: 'Easy' },
  { id: 14, element: 'Review Card', subject: 'تقييم عميل لمتجر مجوهرات', designType: 'مكوّن واجهة', difficulty: 'Easy' },
  { id: 15, element: 'Calendar UI', subject: 'تقويم لحجز المواعيد', designType: 'نموذج وإدخال', difficulty: 'Medium' },
  { id: 16, element: 'Profile Page', subject: 'صفحة الملف الشخصي لمتدربة', designType: 'صفحة كاملة', difficulty: 'Medium' },
  { id: 17, element: 'Filter Panel', subject: 'فلاتر البحث عن الوظائف', designType: 'نموذج وإدخال', difficulty: 'Medium' },
  { id: 18, element: 'Checkout UI', subject: 'واجهة إتمام طلب متجر إلكتروني', designType: 'صفحة كاملة', difficulty: 'Advanced' },
  { id: 19, element: 'Weather Widget', subject: 'أداة الطقس لمدينة أبها', designType: 'مكوّن واجهة', difficulty: 'Medium' },
  { id: 20, element: 'Table UI', subject: 'جدول إدارة الموظفين', designType: 'عرض بيانات', difficulty: 'Medium' },
  { id: 21, element: 'Course Details', subject: 'تفاصيل دورة تدريبية', designType: 'صفحة كاملة', difficulty: 'Medium' },
  { id: 22, element: 'Modal', subject: 'نافذة تأكيد حذف مشروع', designType: 'تفاعل وتنبيه', difficulty: 'Easy' },
  { id: 23, element: 'Chat Interface', subject: 'واجهة محادثة مع مساعد AI', designType: 'صفحة كاملة', difficulty: 'Medium' },
  { id: 24, element: 'Analytics Dashboard', subject: 'لوحة تحليل مبيعات متجر', designType: 'لوحة تحكم', difficulty: 'Advanced' },
  { id: 25, element: 'Onboarding Screen', subject: 'شاشة ترحيبية لتطبيق سفر', designType: 'صفحة كاملة', difficulty: 'Medium' },
  { id: 26, element: 'Booking Card', subject: 'بطاقة حجز فندق', designType: 'مكوّن واجهة', difficulty: 'Medium' },
  { id: 27, element: 'Settings Page', subject: 'صفحة إعدادات تطبيق', designType: 'صفحة كاملة', difficulty: 'Medium' },
  { id: 28, element: 'Comparison Table', subject: 'جدول مقارنة بين 3 باقات اشتراك في منصة SaaS', designType: 'عرض بيانات', difficulty: 'Advanced' },
  { id: 29, element: 'Mobile Dashboard', subject: 'لوحة تحكم لتطبيق إدارة مصاريف', designType: 'لوحة تحكم', difficulty: 'Advanced' },
  { id: 30, element: 'Landing Page Hero', subject: 'القسم الرئيسي لمنصة تقنية ناشئة', designType: 'صفحة كاملة', difficulty: 'Advanced' },
]

export const TOTAL_CHALLENGES = CHALLENGES.length

export function getChallenge(id: number): Challenge | undefined {
  return CHALLENGES.find((challenge) => challenge.id === id)
}
