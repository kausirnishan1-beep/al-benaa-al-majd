import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient.js'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
        },
      ])
      if (error) throw error
      setStatus('success')
      reset()
    } catch (err) {
      console.error('Supabase contact form submission error:', err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium text-gray-700">الاسم الكامل *</label>
        <input
          type="text"
          {...register('name', {
            required: 'يرجى إدخال الاسم الكامل',
            minLength: { value: 2, message: 'يجب أن يحتوي الاسم على حرفين على الأقل' },
          })}
          placeholder="مثال: محمد أحمد"
          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-500 focus:ring-red-300' : 'focus:ring-benaa'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 inline" /> {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني *</label>
        <input
          type="email"
          dir="ltr"
          {...register('email', {
            required: 'يرجى إدخال البريد الإلكتروني',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'يرجى إدخال بريد إلكتروني صحيح',
            },
          })}
          placeholder="name@example.com"
          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 text-left ${
            errors.email ? 'border-red-500 focus:ring-red-300' : 'focus:ring-benaa'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 inline" /> {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">رقم الهاتف (اختياري)</label>
        <input
          type="tel"
          dir="ltr"
          {...register('phone')}
          placeholder="+20 100 000 0000"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benaa text-left"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">الرسالة *</label>
        <textarea
          rows={5}
          {...register('message', {
            required: 'يرجى كتابة رسالتك أو استفسارك',
            minLength: { value: 10, message: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل' },
          })}
          placeholder="اكتب تفاصيل طلبك أو استفسارك هنا..."
          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
            errors.message ? 'border-red-500 focus:ring-red-300' : 'focus:ring-benaa'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 inline" /> {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || status === 'loading'}
        className="w-full bg-benaa text-white font-semibold py-3 px-6 rounded-lg hover:bg-benaa-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting || status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>جارٍ الإرسال...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>إرسال الرسالة</span>
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.</span>
        </div>
      )}
    </form>
  )
}
