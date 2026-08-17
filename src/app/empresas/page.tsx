import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import EmpresasLandingHeader from '@/components/empresas/EmpresasLandingHeader';
import EmpresasWhatsAppCta from '@/components/empresas/EmpresasWhatsAppCta';
import EmpresasMobileStickyCta from '@/components/empresas/EmpresasMobileStickyCta';
import {
  FaClipboardList,
  FaBoxOpen,
  FaTruck,
  FaHandsHelping,
  FaBuilding,
  FaUtensils,
  FaHotel,
  FaBriefcase,
  FaStore,
  FaCar,
  FaClinicMedical,
  FaEllipsisH,
  FaVial,
  FaPumpSoap,
  FaSprayCan,
  FaToilet,
  FaWindowMaximize,
  FaBroom,
  FaTools,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaStar,
  FaComments,
  FaBoxes,
  FaExclamationTriangle,
  FaRandom,
} from 'react-icons/fa';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FaCarOn } from 'react-icons/fa6';

const SITE_URL = 'https://www.ecocleanmatinhos.com.br';

export const metadata: Metadata = {
  title: 'Produtos de Limpeza para Empresas em Guaratuba | EcoClean',
  description:
    'Produtos de limpeza profissional para empresas em Guaratuba. Soluções para restaurantes, hotéis, comércios, escritórios e outros negócios. A EcoClean, de Matinhos, atende a região. Solicite um orçamento pelo WhatsApp.',
  alternates: {
    canonical: `${SITE_URL}/empresas`,
  },
  openGraph: {
    title: 'Produtos de Limpeza para Empresas em Guaratuba | EcoClean',
    description:
      'Fornecedora de produtos e soluções de limpeza para empresas em Guaratuba e região. Solicite um orçamento à EcoClean.',
    url: `${SITE_URL}/empresas`,
    siteName: 'EcoClean',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/logo.jpg`,
        width: 512,
        height: 512,
        alt: 'EcoClean — produtos de limpeza para empresas',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Produtos de Limpeza para Empresas em Guaratuba | EcoClean',
    description:
      'Produtos de limpeza profissional para empresas em Guaratuba. Solicite orçamento com a EcoClean.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const segmentos = [
  {
    title: 'Restaurantes',
    description: 'Produtos para cozinhas, áreas de atendimento, banheiros e limpeza pesada.',
    icon: FaUtensils,
  },
  {
    title: 'Hotéis e pousadas',
    description: 'Produtos para quartos, banheiros, áreas comuns e manutenção diária.',
    icon: FaHotel,
  },
  {
    title: 'Empresas e escritórios',
    description: 'Soluções para limpeza diária, banheiros, pisos e espaços compartilhados.',
    icon: FaBriefcase,
  },
  {
    title: 'Empresas de limpeza',
    description: 'Produtos profissionais para utilização em diferentes clientes e ambientes.',
    icon: MdOutlineCleaningServices,
  },
  {
    title: 'Mercados e comércios',
    description: 'Produtos para manutenção e limpeza das instalações do seu negócio.',
    icon: FaStore,
  },
  {
    title: 'Lava-car e estética automotiva',
    description: 'Opções da linha automotiva para limpeza e manutenção do segmento.',
    icon: FaCarOn,
  },
  {
    title: 'Clínicas e atendimento',
    description: 'Soluções para limpeza e higienização do ambiente de atendimento.',
    icon: FaClinicMedical,
  },
  {
    title: 'Outros negócios',
    description: 'Atendimento a empresas com necessidades específicas de limpeza.',
    icon: FaEllipsisH,
  },
];

const problemas = [
  {
    title: 'Produtos inadequados',
    description:
      'Comprar o produto errado pode aumentar o consumo e diminuir a eficiência da limpeza.',
    icon: FaExclamationTriangle,
  },
  {
    title: 'Desperdício',
    description:
      'Usar produtos sem orientação ou em quantidades inadequadas pode elevar os custos da operação.',
    icon: HiOutlineTrash,
  },
  {
    title: 'Compras emergenciais',
    description:
      'Ficar sem produtos importantes atrapalha a rotina e a operação da empresa.',
    icon: FaTruck,
  },
  {
    title: 'Muitos fornecedores',
    description:
      'Procurar itens diferentes em vários lugares torna a rotina de compras mais complicada.',
    icon: FaRandom,
  },
  {
    title: 'Falta de padronização',
    description:
      'Produtos e métodos diferentes dificultam o padrão de limpeza da equipe.',
    icon: FaBoxOpen,
  },
];

const solucoes = [
  {
    title: 'Produtos adequados',
    description: 'Encontre opções de acordo com a necessidade do seu negócio.',
    icon: FaCheckCircle,
  },
  {
    title: 'Mais praticidade',
    description: 'Centralize suas compras de produtos de limpeza em um só fornecedor.',
    icon: FaClipboardList,
  },
  {
    title: 'Orientação',
    description: 'Converse com nossa equipe para encontrar soluções adequadas à rotina.',
    icon: FaComments,
  },
  {
    title: 'Abastecimento',
    description: 'Facilite a reposição dos produtos utilizados regularmente na empresa.',
    icon: FaBoxes,
  },
  {
    title: 'Atendimento próximo',
    description: 'Tenha contato direto com uma empresa da região, sem burocracia.',
    icon: FaHandsHelping,
  },
];

/** Categorias reais do catálogo EcoClean (sem inventar SKUs) */
const categorias = [
  { title: 'Desinfetante', description: 'Para rotinas que exigem higienização do ambiente.', icon: FaVial },
  { title: 'Detergente', description: 'Limpeza diária de superfícies e utensílios.', icon: FaPumpSoap },
  { title: 'Multiuso', description: 'Versatilidade para diferentes áreas da empresa.', icon: FaSprayCan },
  { title: 'Desengordurante', description: 'Adequado a cozinhas e limpeza mais pesada.', icon: FaPumpSoap },
  { title: 'Banheiro', description: 'Produtos para sanitários e áreas úmidas.', icon: FaToilet },
  { title: 'Limpa Vidros', description: 'Acabamento limpo em vitrines, portas e janelas.', icon: FaWindowMaximize },
  { title: 'Limpeza em Geral', description: 'Opções para a manutenção do dia a dia.', icon: FaBroom },
  { title: 'Automotivo', description: 'Linha para lava-car e estética automotiva.', icon: FaCar },
  {
    title: 'Acessórios e materiais',
    description: 'Ferramentas, mops, panos e complementos da rotina de limpeza.',
    icon: FaTools,
  },
];

const diferenciais = [
  {
    title: 'Empresa local',
    description:
      'A EcoClean está em Matinhos – PR e atende empresas de Guaratuba e região com proximidade.',
    icon: FaMapMarkerAlt,
  },
  {
    title: 'Fornecedora para negócios',
    description:
      'Atendimento pensado para empresas que precisam de produtos profissionais de forma recorrente.',
    icon: FaBuilding,
  },
  {
    title: 'Variedade de produtos',
    description:
      'Catálogo amplo para diferentes rotinas de limpeza — da cozinha ao escritório e ao automotivo.',
    icon: FaBoxes,
  },
  {
    title: 'Reputação na região',
    description:
      'Uma empresa local com excelente reputação entre seus clientes no litoral do Paraná.',
    icon: FaStar,
  },
];

const passos = [
  {
    step: '01',
    title: 'Conte o que sua empresa precisa',
    description: 'Fale com a EcoClean pelo WhatsApp e descreva o tipo de negócio e a rotina.',
  },
  {
    step: '02',
    title: 'Encontre as opções adequadas',
    description: 'Nossa equipe ajuda a identificar os produtos mais adequados à sua necessidade.',
  },
  {
    step: '03',
    title: 'Receba seu orçamento',
    description: 'Solicite uma proposta e organize as compras de limpeza da empresa.',
  },
];

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center mb-4">
      <div className="h-px w-8 sm:w-10 bg-gradient-to-r from-transparent to-[#173363]/40" />
      <span className="mx-3 sm:mx-4 text-[#173363] text-xs sm:text-sm font-light tracking-[0.2em] uppercase">
        {children}
      </span>
      <div className="h-px w-8 sm:w-10 bg-gradient-to-l from-transparent to-[#173363]/40" />
    </div>
  );
}

export default function EmpresasPage() {
  return (
    <main className="min-h-screen bg-white pb-[88px] md:pb-0">
      <EmpresasLandingHeader />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sec1.jpg"
            alt="Ambiente profissional limpo — EcoClean para empresas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#173363]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173363]/90 via-[#173363]/70 to-[#173363]/45" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-28 pb-20 md:pt-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 max-w-2xl">
              <p className="text-[#8ED96A] text-xs sm:text-sm font-light tracking-[0.2em] uppercase mb-4">
                Soluções para empresas
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light text-white leading-tight mb-5">
                Produtos de limpeza profissional para{' '}
                <span className="text-[#8ED96A] font-normal">empresas em Guaratuba</span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
                Encontre produtos adequados à rotina de limpeza do seu negócio — restaurantes,
                hotéis, comércios, escritórios e outros segmentos.
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-8 max-w-xl">
                A EcoClean fica em <strong className="font-medium text-white">Matinhos – PR</strong>{' '}
                e atende empresas de Guaratuba e região com orientação e orçamento pelo WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <EmpresasWhatsAppCta id="hero-whatsapp" fullWidth className="sm:w-auto" />
                <a
                  href="#solucoes"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-full text-base font-medium text-white border-2 border-white/80 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Conhecer nossas soluções
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-[2px] p-6 xl:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/30">
                    <Image
                      src="/logo.jpg"
                      alt="Logo EcoClean"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">EcoClean</p>
                    <p className="text-white/70 text-sm">Fornecedora para empresas</p>
                  </div>
                </div>
                <ul className="space-y-4 text-white/90 text-sm">
                  {[
                    'Atendimento a compradores e gestores',
                    'Produtos para rotina profissional de limpeza',
                    'Orientação para montar o abastecimento',
                    'Orçamento rápido pelo WhatsApp',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <FaCheckCircle className="w-4 h-4 text-[#8ED96A] mt-0.5 shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mb-1">Atendimento</p>
                  <p className="text-white text-sm">Guaratuba e região • Base em Matinhos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="py-16 md:py-24 bg-[#FAFBFD]" aria-labelledby="segmentos-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Segmentos</SectionEyebrow>
            <h2 id="segmentos-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Soluções para{' '}
              <span className="text-[#6EC747] font-normal">diferentes tipos de negócios</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Atendemos empresas com necessidades distintas de limpeza — do dia a dia à limpeza mais
              intensa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {segmentos.map(item => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group rounded-xl border border-gray-100 bg-white p-5 hover:border-[#6EC747]/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#6EC747]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#6EC747]" aria-hidden />
                  </div>
                  <h3 className="text-base font-medium text-[#173363] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="problemas-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Desafios comuns</SectionEyebrow>
            <h2
              id="problemas-title"
              className="text-3xl md:text-4xl font-light text-[#173363] leading-tight"
            >
              Sua empresa enfrenta{' '}
              <span className="text-[#6EC747] font-normal">algum desses problemas?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {problemas.map(item => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-[#FAFBFD] rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-[#6EC747]/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#6EC747]" aria-hidden />
                  </div>
                  <h3 className="text-xl font-medium text-[#173363] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUÇÃO ECOCLEAN */}
      <section id="solucoes" className="py-16 md:py-24 bg-[#FAFBFD] scroll-mt-24" aria-labelledby="solucoes-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Solução EcoClean</SectionEyebrow>
            <h2 id="solucoes-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Um fornecedor para facilitar a rotina de limpeza da{' '}
              <span className="text-[#6EC747] font-normal">sua empresa</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {solucoes.map(item => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="text-center sm:text-left">
                  <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#6EC747]" aria-hidden />
                  </div>
                  <h3 className="text-lg font-medium text-[#173363] mb-2">{item.title}</h3>
                  <div className="w-10 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-3 mx-auto sm:mx-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <EmpresasWhatsAppCta id="solucoes-whatsapp" variant="secondary" />
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="categorias-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Catálogo</SectionEyebrow>
            <h2 id="categorias-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Categorias de produtos para a{' '}
              <span className="text-[#6EC747] font-normal">rotina da sua empresa</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Seleção baseada no catálogo EcoClean — sem inventar linhas ou especificações.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {categorias.map(item => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group rounded-xl border border-gray-100 bg-[#FAFBFD] p-5 hover:border-[#6EC747]/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#173363]/5 flex items-center justify-center mb-4 group-hover:bg-[#6EC747]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#173363] group-hover:text-[#6EC747]" aria-hidden />
                  </div>
                  <h3 className="text-base font-medium text-[#173363] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ECONOMIA */}
      <section className="py-16 md:py-24 bg-[#173363] relative overflow-hidden" aria-labelledby="economia-title">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#6EC747]/10 blur-[40px]" aria-hidden />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-[40px]" aria-hidden />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[#8ED96A] text-xs sm:text-sm font-light tracking-[0.2em] uppercase mb-4">
              Economia inteligente
            </p>
            <h2
              id="economia-title"
              className="text-3xl md:text-4xl font-light text-white leading-tight max-w-3xl mx-auto"
            >
              O produto mais barato nem sempre é o{' '}
              <span className="text-[#8ED96A] font-normal">mais econômico</span>
            </h2>
            <p className="text-white/80 mt-5 max-w-2xl mx-auto leading-relaxed">
              O custo real depende de rendimento, concentração, diluição, frequência de uso e
              adequação ao tipo de limpeza. Escolher o produto certo pode ajudar sua empresa a
              reduzir desperdícios e melhorar a eficiência da rotina.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              'Rendimento do produto',
              'Concentração e diluição',
              'Frequência de utilização',
              'Quantidade realmente necessária',
              'Adequação ao tipo de limpeza',
              'Padronização na equipe',
            ].map(item => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-4"
              >
                <FaCheckCircle className="w-4 h-4 text-[#8ED96A] mt-0.5 shrink-0" aria-hidden />
                <span className="text-white/90 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <EmpresasWhatsAppCta
              id="economia-whatsapp"
              label="Quero encontrar os produtos certos para minha empresa"
              message="Olá! Vim pelo site da EcoClean e gostaria de encontrar os produtos de limpeza certos para minha empresa em Guaratuba."
            />
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="diferenciais-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Por que a EcoClean</SectionEyebrow>
            <h2 id="diferenciais-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Uma empresa local com{' '}
              <span className="text-[#6EC747] font-normal">reputação construída na região</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {diferenciais.map(item => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-[#FAFBFD]"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#6EC747]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#173363] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-16 md:py-24 bg-[#FAFBFD]" aria-labelledby="prova-title">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <SectionEyebrow>Confiança</SectionEyebrow>
            <h2 id="prova-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Excelente <span className="text-[#6EC747] font-normal">reputação no Google</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
              A EcoClean é uma empresa local reconhecida na região. Consulte as avaliações públicas
              no Google para conhecer a experiência de quem já compra conosco.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-[#173363]/20 bg-white p-8 md:p-10 text-center">
            <div className="flex justify-center gap-1 mb-4" aria-hidden>
              {[1, 2, 3, 4, 5].map(n => (
                <FaStar key={n} className="w-5 h-5 text-[#6EC747]/40" />
              ))}
            </div>
            <p className="text-[#173363] font-medium mb-2">Espaço reservado para depoimentos reais</p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
              Em breve, publicaremos aqui relatos de empresas atendidas. Até lá, fale conosco pelo
              WhatsApp e conheça nosso atendimento.
            </p>
            <div className="mt-6">
              <EmpresasWhatsAppCta id="prova-whatsapp" variant="secondary" label="Falar com a EcoClean" />
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="como-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Passo a passo</SectionEyebrow>
            <h2 id="como-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Como <span className="text-[#6EC747] font-normal">funciona</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Um processo simples para sua empresa receber orientação e orçamento sem burocracia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {passos.map((item, index) => (
              <article key={item.step} className="relative text-center md:text-left">
                <div className="text-5xl font-light text-[#6EC747]/25 mb-3">{item.step}</div>
                <h3 className="text-xl font-medium text-[#173363] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                {index < passos.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(100%-0.5rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-[#173363]/20 to-[#6EC747]/20"
                    aria-hidden
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RECORRÊNCIA */}
      <section className="py-16 md:py-24 bg-[#FAFBFD]" aria-labelledby="recorrencia-title">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto text-center">
              <SectionEyebrow>Abastecimento</SectionEyebrow>
              <h2 id="recorrencia-title" className="text-3xl md:text-4xl font-light text-[#173363] leading-tight">
                Não espere o estoque acabar para{' '}
                <span className="text-[#6EC747] font-normal">comprar</span>
              </h2>
              <p className="text-gray-600 mt-5 leading-relaxed">
                Empresas consomem produtos de limpeza de forma recorrente. Ter um fornecedor
                confiável facilita a reposição e evita que itens importantes faltem no meio da
                operação.
              </p>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Conte com a EcoClean para organizar as compras de limpeza do seu negócio e manter a
                rotina em dia.
              </p>
              <div className="mt-8">
                <EmpresasWhatsAppCta
                  id="recorrencia-whatsapp"
                  label="Quero organizar o abastecimento da minha empresa"
                  message="Olá! Vim pelo site da EcoClean e gostaria de organizar o abastecimento de produtos de limpeza da minha empresa em Guaratuba."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-16 md:py-24 bg-[#173363] relative overflow-hidden"
        aria-labelledby="cta-final-title"
      >
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <h2
            id="cta-final-title"
            className="text-3xl md:text-4xl font-light text-white leading-tight mb-5"
          >
            Precisa abastecer sua empresa com{' '}
            <span className="text-[#8ED96A] font-normal">produtos de limpeza?</span>
          </h2>
          <p className="text-white/85 leading-relaxed mb-8 max-w-xl mx-auto">
            Fale com a EcoClean e solicite um orçamento para sua empresa em Guaratuba.
          </p>
          <EmpresasWhatsAppCta id="final-whatsapp" fullWidth className="sm:w-auto" />
          <p className="text-white/55 text-sm mt-5">
            Matinhos – PR · Atendimento a Guaratuba e região
          </p>
        </div>
      </section>

      <Footer />
      <EmpresasMobileStickyCta />
    </main>
  );
}
