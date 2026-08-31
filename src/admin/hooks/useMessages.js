import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const sampleMessages = [
  {
    id: 1,
    name: 'Eng. Abdullah Al-Otaibi',
    email: 'a.otaibi@saudicorp.sa',
    phone: '+966 50 123 4567',
    message: 'We are looking for a turnkey general contractor for a 4-storey commercial center in Riyadh Al Olaya. Please provide profile and project scheduling details.',
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Salem Al-Harbi (Trading Director)',
    email: 'salem@harbi-trading.com',
    phone: '+966 55 987 6543',
    message: 'Requesting wholesale quotation for 500 MT of structural steel and Portland cement delivery to Dammam Port.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
]

export function useMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('contact_messages')
        .select('*')
        .order('id', { ascending: false })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        setMessages(data)
      } else {
        setMessages(sampleMessages)
      }
    } catch (err) {
      console.warn('Supabase contact_messages fetch error, using local fallback:', err)
      setMessages(sampleMessages)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const markAsRead = async (id, isRead = true) => {
    try {
      const { error: updateErr } = await supabase
        .from('contact_messages')
        .update({ is_read: isRead })
        .eq('id', id)

      if (updateErr) throw updateErr

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m))
      )
      return { success: true }
    } catch (err) {
      console.error('Error updating message status:', err)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m))
      )
      return { success: true, localOnly: true }
    }
  }

  const deleteMessage = async (id) => {
    try {
      const { error: delErr } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (delErr) throw delErr

      setMessages((prev) => prev.filter((m) => m.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting message:', err)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      return { success: true, localOnly: true }
    }
  }

  return {
    messages,
    loading,
    error,
    refreshMessages: fetchMessages,
    markAsRead,
    deleteMessage,
  }
}
