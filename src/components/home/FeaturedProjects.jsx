import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import ProjectCard from '../projects/ProjectCard.jsx'
import { useProjects } from '../../admin/hooks/useProjects.js'

export default function FeaturedProjects() {
  const { projects } = useProjects()
  const featured = projects.filter((p) => p.isFeatured !== false)

  return (
    <section className="section-container bg-white py-20">
      <Container>
        <SectionTitle
          eyebrow="Our Portfolio"
          eyebrowAr="سجل أعمالنا ومشاريعنا"
          title="Featured Projects & Trade Deliveries"
          titleAr="مشاريع مميزة وعقود توريد استراتيجية"
          subtitle="Explore our milestone achievements in construction engineering and commercial trading across Saudi Arabia."
          subtitleAr="استعرض أبرز إنجازاتنا في التطوير الإنشائي والتجارة العامة في مختلف مناطق المملكة."
        />
        
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-14"
          >
            {featured.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}



