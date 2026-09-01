-- ==============================================================================
-- AL-BENAA & AL-MAJD GROUP - SUPABASE DATABASE SCHEMA & SEED DATA
-- ==============================================================================

-- 1. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY, -- 'benaa', 'majd'
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  tagline TEXT,
  tagline_ar TEXT,
  description TEXT,
  description_ar TEXT,
  color TEXT DEFAULT 'benaa',
  logo TEXT,
  path TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL, -- 'benaa' or 'majd'
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  path TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  company TEXT NOT NULL, -- 'benaa' or 'majd'
  category TEXT NOT NULL, -- 'construction', 'renovation', 'import-export', 'logistics'
  badge TEXT,
  badge_ar TEXT,
  image TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  location TEXT DEFAULT 'Riyadh, Saudi Arabia',
  location_ar TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
  year TEXT DEFAULT '2026',
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  category TEXT NOT NULL, -- 'construction-materials', 'industrial-equipment', etc.
  image TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. CONTACT_MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. DOCUMENTS TABLE (Compliance & Profile)
CREATE TABLE IF NOT EXISTS public.documents (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT,
  description_ar TEXT,
  file_url TEXT NOT NULL,
  tag TEXT DEFAULT 'Document',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. SITE_SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Companies
INSERT INTO public.companies (id, name, name_ar, tagline, tagline_ar, description, description_ar, color, logo, path)
VALUES 
  ('benaa', 'AL BENAA AL RAHAB CONTRACTING EST.', 'مؤسسة البناء الرحاب للمقاولات', 'General Contracting, Construction, Renovation & Project Management', 'إنشاءات، تجديد، صيانة، وإدارة مشاريع', 'Leading Saudi contracting company executing high-end residential, commercial, and industrial construction projects with uncompromised quality standards.', 'مؤسسة مقاولات سعودية رائدة تنفذ المشاريع السكنية والتجارية والصناعية بأعلى معايير الجودة العالمية.', 'benaa', '/logo/al-benaa-logo.svg', '/benaa'),
  ('majd', 'AL MAJD LINES FOR TRADE & IMPORT', 'مؤسسة خطوط المجد للتجارة والاستيراد', 'Import & Export, Global Product Sourcing & Logistics Solutions', 'استيراد وتصدير، تجارة عامة، وحلول لوجستية', 'Premier international trading arm connecting global markets with high-grade construction materials, industrial equipment, and supply chain excellence.', 'ذراع تجاري دولي يربط الأسواق العالمية بأجود مواد البناء والمعدات الصناعية والحلول اللوجستية المتكاملة.', 'majd', '/logo/al-majd-logo.svg', '/majd')
ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO public.services (id, company_id, title, title_ar, description, description_ar, path, is_active, sort_order)
VALUES
  ('construction', 'benaa', 'General Construction & Building', 'الإنشاءات والمقاولات العامة', 'Turnkey execution of premium residential complexes, commercial towers, and industrial facilities in Saudi Arabia.', 'تنفيذ متكامل للمشاريع السكنية والأبراج التجارية والمنشآت الصناعية في المملكة العربية السعودية.', '/benaa/construction', true, 1),
  ('renovation', 'benaa', 'Renovation & Architectural Restoration', 'التجديد والترميم المعماري', 'Modernizing, upgrading, and structurally rehabilitating existing structures to world-class architectural standards.', 'تحديث وترميم وإعادة تأهيل المباني القائمة وفق أحدث المواصفات والمعايير الهندسية.', '/benaa/renovation', true, 2),
  ('maintenance', 'benaa', 'Facility Maintenance & Operations', 'الصيانة الدورية والتشغيل', 'Scheduled preventive maintenance, MEP services, and emergency facility management operations.', 'خدمات الصيانة الوقائية الدورية والأعمال الكهروميكانيكية وإدارة المرافق والمنشآت.', '/benaa/maintenance', true, 3),
  ('project-management', 'benaa', 'Engineering Project Management', 'إدارة المشاريع الهندسية', 'End-to-end project lifecycle oversight, cost engineering, quality assurance, and timeline compliance.', 'إدارة احترافية شاملة لدورة حياة المشروع وضبط التكاليف وضمان الجودة والالتزام بالجداول الزمنية.', '/benaa/project-management', true, 4),
  ('import-export', 'majd', 'International Import & Export', 'الاستيراد والتصدير الدولي', 'Seamless cross-border trading solutions linking global manufacturers with Saudi and regional markets.', 'حلول تجارية دولية متكاملة تربط كبار المصنعين العالميين بالأسواق السعودية والإقليمية.', '/majd/import-export', true, 5),
  ('general-trading', 'majd', 'General Trading & Supply', 'التجارة العامة والتوريدات', 'Diverse multi-sector commercial trade covering building essentials, commodities, and industrial supplies.', 'تجارة تجزئة وجملة وتوريدات شاملة لمختلف القطاعات ومواد البناء والمستلزمات الصناعية.', '/majd/general-trading', true, 6),
  ('product-sourcing', 'majd', 'Global Product Sourcing', 'توريد المنتجات العالمية', 'Identifying, vetting, and procurement of premium certified materials from verified global suppliers.', 'البحث والتعاقد وتوريد المنتجات المعتمدة من أفضل الموردين والمصانع الموثوقة حول العالم.', '/majd/product-sourcing', true, 7),
  ('logistics', 'majd', 'Supply Chain & Logistics', 'الخدمات اللوجستية وسلاسل الإمداد', 'Comprehensive freight forwarding, customs clearance, and secure warehousing distribution across KSA.', 'خدمات الشحن الدولي والتخليص الجمركي والتخزين وإدارة سلاسل الإمداد في كافة مناطق المملكة.', '/majd/logistics', true, 8)
ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (id, title, title_ar, company, category, badge, badge_ar, image, description, description_ar, location, location_ar, year, is_featured)
VALUES
  (1, 'Luxury Residential Compound - Riyadh', 'مجمع سكني فاخر - الرياض', 'benaa', 'construction', 'AL BENAA AL RAHAB CONTRACTING EST.', 'مؤسسة البناء الرحاب للمقاولات', 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80', 'Turnkey execution of a premier modern residential community spanning 12,000 m² built to Saudi Building Code specifications.', 'تنفيذ مجمع سكني متكامل ومطابق لأعلى مواصفات البناء الحديثة وكود البناء السعودي بمساحة 12,000 م².', 'Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية', '2026', true),
  (2, 'Corporate Headquarters Modernization', 'تجديد وتطوير مقر إداري وتجاري', 'benaa', 'renovation', 'AL BENAA AL RAHAB CONTRACTING EST.', 'مؤسسة البناء الرحاب للمقاولات', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'Comprehensive architectural, structural, and smart energy modernization for prime commercial premises.', 'إعادة تأهيل وتجديد معماري وإنشائي كامل للمقر الرئيسي ودمج أنظمة الطاقة الذكية.', 'Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية', '2025', true),
  (3, 'Building Materials Supply Contract', 'توريد مواد بناء ومعدات هندسية', 'majd', 'import-export', 'AL MAJD LINES FOR TRADE & IMPORT', 'مؤسسة خطوط المجد للتجارة والاستيراد', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'Procurement and direct site delivery of high-tensile structural steel and waterproofing membranes from top global mills.', 'توريد حديد التسليح عالي المقاومة والمواد العازلة ومستلزمات الإنشاءات من كبرى المصانع العالمية.', 'Dammam / Jubail Ports', 'موانئ الدمام والجبيل', '2026', true),
  (4, 'Commercial Plaza Fit-Out & MEP', 'تجهيز وتشطيب مجمع تجاري متكامل', 'benaa', 'construction', 'AL BENAA AL RAHAB CONTRACTING EST.', 'مؤسسة البناء الرحاب للمقاولات', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', 'Advanced electromechanical works, safety systems, and bespoke interior finishes for commercial retail spaces.', 'أعمال البنية التحتية والتشطيبات الكهروميكانيكية وأنظمة السلامة المتكاملة بمستوى عالمي.', 'Jeddah, Saudi Arabia', 'جدة، المملكة العربية السعودية', '2025', true),
  (5, 'Global Supply Chain & Freight Solutions', 'خدمات لوجستية وتوريد وشحن دولي', 'majd', 'logistics', 'AL MAJD LINES FOR TRADE & IMPORT', 'مؤسسة خطوط المجد للتجارة والاستيراد', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', 'End-to-end multimodal cargo shipping, bonded warehousing, and rapid customs clearance across GCC entry ports.', 'إدارة سلاسل الإمداد والشحن البحري والجوي والتخليص الجمركي السريع عبر كافة منافذ المملكة.', 'GCC & Saudi Ports', 'كافة المنافذ والموانئ', '2026', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Products
INSERT INTO public.products (id, name, name_ar, category, image, description, description_ar, is_active)
VALUES
  (1, 'Certified Construction Materials', 'مواد بناء معتمدة', 'construction-materials', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', 'High-grade Portland cement, rebar steel, structural timber, and thermal insulation compliant with Saudi Building Code (SBC).', 'أسمنت، حديد تسليح، أخشاب إنشائية، ومواد عزل حراري ومائي مطابقة لكود البناء السعودي.', true),
  (2, 'Industrial Machinery & Heavy Equipment', 'معدات ومكائن صناعية ثقيلة', 'industrial-equipment', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80', 'Imported specialized manufacturing tools, heavy excavation machines, and power generators from leading certified global brands.', 'معدات ومكائن صناعية، آليات حفر ثقيلة، ومولدات طاقة مستوردة من كبرى العلامات المعتمدة عالمياً.', true),
  (3, 'MEP & Electrical Supplies', 'مستلزمات الكهرباء والكهروميكانيك', 'mep-supplies', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'High-voltage cables, transformers, smart distribution panels, and commercial HVAC piping systems.', 'كابلات الضغط العالي، محولات، لوحات توزيع كهربائية ذكية، وأنظمة تكييف مركزي متطورة.', true),
  (4, 'Architectural Finishing & Ceramics', 'مواد التشطيب المعماري والسيراميك', 'finishing', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 'Luxury porcelain, natural marble, precision fixtures, and specialized decorative coatings for luxury projects.', 'بورسلين فاخر، رخام طبيعي، إكسسوارات معمارية دقيقة ودهانات متخصصة للمشاريع الراقية.', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Documents
INSERT INTO public.documents (id, title, title_ar, description, description_ar, file_url, tag, sort_order)
VALUES
  (1, 'Comprehensive Corporate Profile & Qualifications', 'الملف التعريفي الشامل وسابقة الأعمال للمجموعة', 'Download our official company credentials, completed projects portfolio, and technical capabilities brochure.', 'تحميل البروفايل الرسمي الشامل وسجل المشاريع المنجزة والقدرات الفنية والتنفيذية.', '/documents/company-profile.pdf', 'PDF Brochure', 1),
  (2, 'Saudi Commercial Registration (CR) & Licensing', 'السجل التجاري والتراخيص النظامية بالمملكة', 'Fully accredited and certified by the Saudi Ministry of Commerce for contracting, general trading, and import/export.', 'تراخيص معتمدة وسارية من وزارة التجارة والاستثمار للمقاولات العامة والتجارة والاستيراد.', '#', 'Certified License', 2),
  (3, 'Saudi Contractors Authority (SCA) Membership', 'عضوية الهيئة السعودية للمقاولين', 'Classified commercial contractor complying with high industry classification and technical governance standards.', 'عضوية وتصنيف معتمد لدى الهيئة السعودية للمقاولين لمشاريع البناء والتشييد.', '#', 'Accreditation', 3),
  (4, 'ZATCA Tax & VAT Compliance Certificate', 'شهادة الالتزام الضريبي والزكاة (هيئة الزكاة والضريبة والجمارك)', 'Full tax, customs, and electronic invoicing compliance certified by ZATCA.', 'شهادة تسجيل وضريبة القيمة المضافة والفوترة الإلكترونية المعتمدة.', '#', 'Tax Compliance', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed Site Settings
INSERT INTO public.site_settings (key, value)
VALUES
  ('general', '{"siteNameEn": "Al-Benaa & Al-Majd Group", "siteNameAr": "مجموعة البناء والمجد", "taglineEn": "Building the Future, Connecting Global Markets", "taglineAr": "نبني المستقبل، ونربط الأسواق العالمية"}'::jsonb),
  ('contact', '{"phone": "+966 11 456 7890", "phoneAlt": "+966 50 123 4567", "email": "info@albenaa-almajd.com", "addressEn": "King Fahd Road, Al Olaya, Riyadh, Kingdom of Saudi Arabia", "addressAr": "طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية", "workingHoursEn": "Sunday - Thursday: 8:00 AM - 5:00 PM", "workingHoursAr": "الأحد - الخميس: 8:00 ص - 5:00 م", "mapEmbedUrl": "https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed"}'::jsonb),
  ('stats', '{"yearsExperience": "15+", "completedProjects": "150+", "tradePartners": "45+", "exportHubs": "12+"}'::jsonb),
  ('social', '{"facebook": "https://facebook.com", "linkedin": "https://linkedin.com", "instagram": "https://instagram.com", "twitter": "https://twitter.com"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security (RLS) & Allow public read access, authenticated write
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DO  BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read companies') THEN
    CREATE POLICY "Public read companies" ON public.companies FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read services') THEN
    CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read projects') THEN
    CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read products') THEN
    CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read documents') THEN
    CREATE POLICY "Public read documents" ON public.documents FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read site_settings') THEN
    CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert contact_messages') THEN
    CREATE POLICY "Public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on contact_messages') THEN
    CREATE POLICY "Full access for all on contact_messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on companies') THEN
    CREATE POLICY "Full access for all on companies" ON public.companies FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on services') THEN
    CREATE POLICY "Full access for all on services" ON public.services FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on projects') THEN
    CREATE POLICY "Full access for all on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on products') THEN
    CREATE POLICY "Full access for all on products" ON public.products FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on documents') THEN
    CREATE POLICY "Full access for all on documents" ON public.documents FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Full access for all on site_settings') THEN
    CREATE POLICY "Full access for all on site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- 8. STORAGE BUCKETS (images & documents)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('images', 'images', true),
  ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for Public Reading and Authenticated/Public Uploads
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access Images') THEN
    CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload Access Images') THEN
    CREATE POLICY "Upload Access Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access Documents') THEN
    CREATE POLICY "Public Access Documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload Access Documents') THEN
    CREATE POLICY "Upload Access Documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents');
  END IF;
END $$;
