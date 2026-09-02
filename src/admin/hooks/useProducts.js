import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          nameAr: p.name_ar || p.nameAr || '',
          category: p.category,
          image: p.image,
          description: p.description,
          descriptionAr: p.description_ar || p.descriptionAr || '',
          isActive: p.is_active ?? true,
        }))
        setProducts(mapped)
      } else {
        setProducts([])
      }
    } catch (err) {
      console.error('Supabase products fetch error:', err)
      setProducts([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const addProduct = async (productData) => {
    try {
      const payload = {
        name: productData.name,
        name_ar: productData.nameAr || productData.name_ar || '',
        category: productData.category || 'construction-materials',
        image: productData.image || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        description: productData.description || '',
        description_ar: productData.descriptionAr || productData.description_ar || '',
        is_active: productData.isActive ?? true,
      }

      const { data, error: insertErr } = await supabase
        .from('products')
        .insert([payload])
        .select()

      if (insertErr) throw insertErr

      await fetchProducts()
      return { success: true, data }
    } catch (err) {
      console.error('Error adding product:', err)
      return { success: false, error: err.message || 'Failed to save product in Supabase database' }
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      const payload = {
        name: productData.name,
        name_ar: productData.nameAr || productData.name_ar || '',
        category: productData.category,
        image: productData.image,
        description: productData.description,
        description_ar: productData.descriptionAr || productData.description_ar || '',
        is_active: productData.isActive ?? true,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateErr } = await supabase
        .from('products')
        .update(payload)
        .eq('id', id)
        .select()

      if (updateErr) throw updateErr

      await fetchProducts()
      return { success: true, data }
    } catch (err) {
      console.error('Error updating product:', err)
      return { success: false, error: err.message || 'Failed to update product in Supabase database' }
    }
  }

  const deleteProduct = async (id) => {
    try {
      const { error: delErr } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (delErr) throw delErr

      setProducts((prev) => prev.filter((p) => p.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting product:', err)
      return { success: false, error: err.message || 'Failed to delete product from Supabase database' }
    }
  }

  return {
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
