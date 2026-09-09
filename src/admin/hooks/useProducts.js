import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'High-Tensile Structural Steel & Rebar',
    nameAr: 'حديد تسليح وهياكل معدنية عالية المقاومة',
    category: 'construction-materials',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'SASO-certified high-tensile steel bars and reinforced mesh for foundational and heavy commercial concrete framing.',
    descriptionAr: 'حديد تسليح عالي الشد وشبك معتمد ومطابق للمواصفات السعودية (SASO) لكافة المشاريع الإنشائية.',
    isActive: true,
  },
  {
    id: 2,
    name: 'Premium Architectural Porcelain & Ceramics',
    nameAr: 'بورسلان وسيراميك معماري فاخر',
    category: 'finishes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Direct imported high-grade floor tiles, wall porcelain, and slip-resistant outdoor pavers for commercial projects.',
    descriptionAr: 'بلاط بورسلان وسيراميك مستورد عالي الجودة ومقاوم للانزلاق مخصص للأبراج والمجمعات السكنية والتجارية.',
    isActive: true,
  },
  {
    id: 3,
    name: 'Industrial Power Tools & Light Compaction Machinery',
    nameAr: 'معدات صناعية وأدوات كهربائية ومداحل خفيفة',
    category: 'tools-machinery',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty rotary hammers, concrete vibrators, and compaction tools imported directly from top global manufacturers.',
    descriptionAr: 'معدات حفر ودك خرسانة ومعدات قطع كهربائية صناعية مستوردة بأعلى معايير الأداء والتحمل.',
    isActive: true,
  },
  {
    id: 4,
    name: 'Certified Industrial Safety & PPE Gear',
    nameAr: 'معدات الوقاية والسلامة المهنية المعتمدة',
    category: 'safety-gear',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    description: 'OSHA & Saudi civil defense approved safety helmets, high-visibility apparel, steel-toe boots, and fall arrest harnesses.',
    descriptionAr: 'معدات حماية شخصية وخوذات وأحذية سلامة وسترات عاكسة مطابقة لمعايير الدفاع المدني والسلامة المهنية.',
    isActive: true,
  },
  {
    id: 5,
    name: 'Thermal & Waterproofing Polyurethane Insulation',
    nameAr: 'عوازل مائية وحرارية وبولي يوريثان',
    category: 'insulation',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    description: 'SBC-compliant extruded polystyrene boards, bituminous membranes, and elastomeric waterproofing sealants.',
    descriptionAr: 'ألواح عزل حراري وعوازل مائية بيتومينية مطابقة لكود البناء السعودي لترشيد استهلاك الطاقة.',
    isActive: true,
  },
  {
    id: 6,
    name: 'Heavy Brass Valves & Commercial Plumbing Fittings',
    nameAr: 'صمامات ومحابس نحاسية ومستلزمات سباكة تجارية',
    category: 'plumbing',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Pressure-tested industrial gate valves, PPR pipes, and multi-tier plumbing connections with international certification.',
    descriptionAr: 'صمامات تحكم ومحابس نحاسية وأنابيب ومستلزمات شبكات مياه معتمدة للمشاريع والمنشآت الكبرى.',
    isActive: true,
  },
]

export function useProducts() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
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
        setProducts(DEFAULT_PRODUCTS)
      }
    } catch (err) {
      console.error('Supabase products fetch error:', err)
      setProducts(DEFAULT_PRODUCTS)
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
        .select()

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
