import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, PhoneCall } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient.js'
import { useSettings } from '../../admin/hooks/useSettings.js'
import { CONTACT_INFO } from '../../utils/constants.js'

export default function ContactForm() {
  const [searchParams] = useSearchParams()
  const subjectParam = searchParams.get('subject') || ''

  const { settings } = useSettings()
  const contact = settings?.contact || CONTACT_INFO
  const whatsappNumber = contact.whatsapp || contact.phone || CONTACT_INFO.whatsapp

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceCategory: subjectParam ? 'specific' : 'general',
      message: subjectParam ? `Inquiry regarding: ${subjectParam}\n` : '',
      website_hp: '', // Honeypot field for bot protection
    },
  })

  useEffect(() => {
    if (subjectParam) {
      setValue('message', `Inquiry regarding: ${subjectParam}\n`)
    }
  }, [subjectParam, setValue])

  const onSubmit = async (data) => {
    setErrorMessage('')

    // 1. Honeypot check (if filled by bot, fake success & drop)
    if (data.website_hp) {
      console.warn('Bot submission caught via honeypot')
      setStatus('success')
      reset()
      return
    }

    // 2. Persistent Rate Limit check (60 seconds between submissions)
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
      const formattedMessage = data.serviceCategory && data.serviceCategory !== 'general'
        ? `[Category: ${data.serviceCategory}]\n${data.message.trim()}`
        : data.message.trim()

      const { error } = await supabase.from('contact_messages').insert([
        {
          name: data.name.trim().substring(0, 100),
          email: data.email.trim().toLowerCase().substring(0, 150),
          phone: data.phone ? data.phone.trim().substring(0, 30) : null,
          message: formattedMessage.substring(0, 2000),
        },
      ])

      if (error) {
        if (error.message?.includes('Rate limit exceeded')) {
          throw new Error('Rate limit exceeded. Please wait 60 seconds before submitting another inquiry. / تم تجاوز الحد المسموح.')
        }
        throw error
      }

      localStorage.setItem('albenaa_last_contact_submit', now.toString())
      setStatus('success')
      reset()
    } catch (err) {
      console.error('Supabase contact form submission error:', err)
      setErrorMessage(err.message || 'Error sending message. Please try again. / حدث خطأ أثناء الإرسال.')
      setStatus('error')
    }
  }

  const cleanWaNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')

  return (
    <div className="space-y-6">
      {/* WhatsApp Quick Trigger Header */}
      {cleanWaNumber && (
        <a
          href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
            subjectParam ? `Hello, I would like to inquire about: ${subjectParam}` : 'Hello, I have an inquiry for Al-Benaa & Al-Majd.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between hover:bg-emerald-100 transition-colors shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">Prefer Instant WhatsApp Chat?</p>
              <p className="text-[11px] text-emerald-700 font-arabic">محادثة مباشرة وفورية عبر الواتساب</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
            Chat Now <PhoneCall className="w-3.5 h-3.5" />
          </span>
        </a>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl"
      >
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
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
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

        <div className="grid sm:grid-cols-2 gap-4">
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
                  message: 'Invalid email address',
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
              Phone / Mobile <span className="text-gray-400 font-normal text-xs">(Optional)</span>
              <span className="block text-xs font-normal text-gray-500 font-arabic">رقم الهاتف أو الجوال</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="+966 50 000 0000"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benaa"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-bold text-gray-800 text-sm">
            Inquiry Category
            <span className="block text-xs font-normal text-gray-500 font-arabic">تصنيف الطلب أو الخدمة</span>
          </label>
          <select
            {...register('serviceCategory')}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benaa bg-white"
          >
            <option value="general">General Corporate Inquiry / استفسار عام</option>
            <option value="construction">General Construction & Engineering / مقاولات وإنشاءات</option>
            <option value="renovation">Renovation & Restoration / ترميم وتجديد</option>
            <option value="maintenance">Facility Maintenance Contract / عقد صيانة وتشغيل</option>
            <option value="project-mgmt">Project Management & Oversight / إدارة وإشراف مشاريع</option>
            <option value="import-export">Import, Export & Customs / استيراد وتصدير وتخليص</option>
            <option value="wholesale-trading">Wholesale Building Materials / تجارة مواد بناء جملة</option>
            <option value="factory-sourcing">Factory Direct Sourcing / بحث وتوريد مصانع عالمية</option>
            <option value="logistics-freight">Logistics & Freight Services / خدمات شحن ولوجستيات</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-bold text-gray-800 text-sm">
            Message & Project Details <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 font-arabic">تفاصيل الطلب أو المشروع</span>
          </label>
          <textarea
            rows={4}
            {...register('message', {
              required: 'Please write your message | يرجى كتابة رسالتك أو تفاصيل استفسارك',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
            })}
            placeholder="Tell us about your project requirements, quantities, or technical specifications..."
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
          className="w-full bg-benaa text-white font-bold py-4 px-6 rounded-xl hover:bg-benaa-light transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting || status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <div className="text-center">
                <span className="block text-sm leading-tight">Submitting Inquiry...</span>
                <span className="block text-xs font-arabic opacity-80 leading-tight">جارٍ الإرسال...</span>
              </div>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-majd-light" />
              <div className="text-center">
                <span className="block text-sm leading-tight">Submit Quotation / Project Request</span>
                <span className="block text-xs font-arabic opacity-80 leading-tight">إرسال الطلب وعرض السعر</span>
              </div>
            </>
          )}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Your inquiry has been submitted successfully!</p>
              <p className="text-xs font-arabic text-green-700 mt-0.5">تم استلام طلبك بنجاح، وسيتواصل معك مهندسونا أو مستشارونا في أقرب وقت.</p>
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
    </div>
  )
}
