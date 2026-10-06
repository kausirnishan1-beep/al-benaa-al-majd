import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

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

      setMessages(data || [])
    } catch (err) {
      console.warn('Supabase contact_messages fetch error:', err)
      setMessages([])
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
      console.error('Error updating message status in Supabase:', err)
      return { success: false, error: err.message || 'Failed to update message status' }
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
      console.error('Error deleting message from Supabase:', err)
      return { success: false, error: err.message || 'Failed to delete message' }
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
