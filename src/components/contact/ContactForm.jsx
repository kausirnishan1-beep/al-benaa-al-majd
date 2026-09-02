import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient.js'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
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
      website_hp: '', // Honeypot field for bot protection
    },
  })

  const onSubmit = async (data) => {
    setErrorMessage('')

    // 1. Honeypot check (if filled by bot, fake success & drop)
    if (data.website_hp) {
      console.warn('Bot submission caught via honeypot')
      setStatus('success')
      reset()
      return
    }

    // 2. Persistent Rate Limit check (60 seconds between submissions across page refreshes)
    const lastSubmitTime = parseInt(localStorage.getItem('albenaa_last_contact_submit') || '0', 10)
    const now = Date.now()
    const elapsedSeconds = Math.floor((now - lastSubmitTime) / 1000)
    if (elapsedSeconds < 60) {
      const waitTime = 60 - elapsedSeconds
      setErrorMessage(`Please wait ${waitTime} seconds before submitting another inquiry. / يرجى الانتظار ${waitTime} ثانية قبل إرسال رسالة أخرى`)
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: data.name.trim().substring(0, 100),
          email: data.email.trim().toLowerCase().substring(0, 150),
          phone: data.phone ? data.phone.trim().substring(0, 30) : null,
          message: data.message.trim().substring(0, 2000),
        },
      ])
      if (error) {
        if (error.message?.includes('Rate limit exceeded')) {
          throw new Error('Rate limit exceeded. Please wait 60 seconds before submitting another inquiry. / تم تجاوز الحد المسموح. يرجى الانتظار 60 ثانية.')
        }
        throw error
      }

      localStorage.setItem('albenaa_last_contact_submit', now.toString())
      setStatus('success')
      reset()
    } catch (err) {
      console.error('Supabase contact form submission error:', err)
      setErrorMessage(err.message || 'Error sending message. Please try again. / حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
      {/* Honeypot field (hidden from human visitors) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex="-1"
          autoComplete="off"
          {...register('website_hp')}
        />
      </div>
      <div>
        <label className="block mb-1 font-bold text-gray-800 text-sm">
          Full Name <span className="text-red-500">*</span>
          <span className="block text-xs font-normal text-gray-500 font-arabic">الاسم الكامل</span>
        </label>
        <input
          type="text"
          {...register('name', {
            required: 'Please enter your full name | يرجى إدخال الاسم الكامل',
            minLength: { value: 2, message: 'Name must be at least 2 characters | يجب أن يحتوي الاسم على حرفين على الأقل' },
          })}
          placeholder="e.g. Abdullah Al-Otaibi / عبدالله العتيبي"
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-benaa'
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 inline" /> {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-bold text-gray-800 text-sm">
          Business Email <span className="text-red-500">*</span>
          <span className="block text-xs font-normal text-gray-500 font-arabic">البريد الإلكتروني</span>
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Please enter your email | يرجى إدخال البريد الإلكتروني',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address | يرجى إدخال بريد إلكتروني صحيح',
            },
          })}
          placeholder="name@company.com"
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-benaa'
          }`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 inline" /> {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-bold text-gray-800 text-sm">
          Phone Number <span className="text-gray-400 font-normal text-xs">(Optional / اختياري)</span>
          <span className="block text-xs font-normal text-gray-500 font-arabic">رقم الهاتف أو الواتساب</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="+966 50 000 0000"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benaa"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-gray-800 text-sm">
          Message & Project Details <span className="text-red-500">*</span>
          <span className="block text-xs font-normal text-gray-500 font-arabic">تفاصيل الطلب أو الرسالة</span>
        </label>
        <textarea
          rows={5}
          {...register('message', {
            required: 'Please write your message | يرجى كتابة رسالتك أو تفاصيل استفسارك',
            minLength: { value: 10, message: 'Message must be at least 10 characters | الرسالة يجب أن تحتوي على 10 أحرف على الأقل' },
          })}
          placeholder="Tell us about your project, materials requirements, or inquiry..."
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
            errors.message ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-benaa'
          }`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 inline" /> {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || status === 'loading'}
        className="w-full bg-benaa text-white font-bold py-4 px-6 rounded-xl hover:bg-benaa-light transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
      >
        {isSubmitting || status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <div className="text-center">
              <span className="block text-sm leading-tight">Sending Message...</span>
              <span className="block text-xs font-arabic opacity-80 leading-tight">جارٍ الإرسال...</span>
            </div>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 text-majd-light" />
            <div className="text-center">
              <span className="block text-sm leading-tight">Send Message / Request Quote</span>
              <span className="block text-xs font-arabic opacity-80 leading-tight">إرسال الرسالة وطلب عرض سعر</span>
            </div>
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Your message has been sent successfully!</p>
            <p className="text-xs font-arabic text-green-700 mt-0.5">تم إرسال رسالتك بنجاح، سنتواصل معك في أقرب وقت.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">{errorMessage || 'Error sending message. Please try again.'}</p>
            <p className="text-xs font-arabic text-red-700 mt-0.5">حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.</p>
          </div>
        </div>
      )}
    </form>
  )
}

