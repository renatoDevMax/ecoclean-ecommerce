import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import CondominiosLandingHeader from '@/components/condominios/CondominiosLandingHeader';
import CondominiosWhatsAppCta from '@/components/condominios/CondominiosWhatsAppCta';
import CondominiosMobileStickyCta from '@/components/condominios/CondominiosMobileStickyCta';
import {
  FaClipboardList,
  FaBoxOpen,
  FaTruck,
  FaHandsHelping,
  FaBuilding,
  FaToilet,
  FaSprayCan,
  FaWindowMaximize,
  FaBroom,
  FaPumpSoap,
  FaTools,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaStar,
  FaComments,
} from 'react-icons/fa';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { HiOutlineTrash } from 'react-icons/hi2';

const SITE_URL = 'https://www.ecocleanmatinhos.com.br';

export const metadata: Metadata = {
  title: 'Produtos de Limpeza para Condomínios em Guaratuba | EcoClean',
  description:
    'Produtos de limpeza profissional para condomínios em Guaratuba. A EcoClean, de Matinhos, ajuda síndicos e administradoras a organizar o abastecimento. Solicite um orçamento pelo WhatsApp.',
  alternates: {
    canonical: `${SITE_URL}/condominios`,
  },
  openGraph: {
    title: 'Produtos de Limpeza para Condomínios em Guaratuba | EcoClean',
    description:
      'Soluções de limpeza profissional para condomínios em Guaratuba e região. Fale com a EcoClean e solicite um orçamento.',
    url: `${SITE_URL}/condominios`,
    siteName: 'EcoClean',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/logo.jpg`,
        width: 512,
        height: 512,
        alt: 'EcoClean — produtos de limpeza',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Produtos de Limpeza para Condomínios em Guaratuba | EcoClean',
    description:
      'Produtos de limpeza profissional para condomínios em Guaratuba. Solicite orçamento com a EcoClean.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const problemas = [
  {
    title: 'Compras sem planejamento',
    description:
      'Comprar produtos diferentes a cada vez dificulta o controle do consumo e do orçamento do condomínio.',
    icon: FaClipboardList,
  },
  {
    title: 'Desperdício',
    description:
      'Produtos inadequados ou usados de forma incorreta aumentam custos sem melhorar o resultado da limpeza.',
    icon: HiOutlineTrash,
  },
  {
    title: 'Falta de padronização',
    description:
      'Cada colaborador usando um produto diferente prejudica a padronização e a qualidade da limpeza.',
    icon: FaBoxOpen,
  },
  {
    title: 'Falta de reposição',
    description:
      'Ficar sem itens essenciais no meio da rotina gera improvisos e problemas para a administração.',
    icon: FaTruck,
  },
];

const solucoes = [
  { title: 'Limpeza de pisos', description: 'Produtos adequados para áreas de alto fluxo.', icon: FaBroom },
  { title: 'Limpeza de banheiros', description: 'Higiene e desinfecção de sanitários coletivos.', icon: FaToilet },
  { title: 'Desinfecção', description: 'Soluções para ambientes que exigem maior cuidado.', icon: FaPumpSoap },
  { title: 'Limpeza de vidros', description: 'Acabamento limpo em portarias e fachadas internas.', icon: FaWindowMaximize },
  {
    title: 'Áreas comuns',
    description: 'Corredores, elevadores, hall e espaços compartilhados.',
    icon: FaBuilding,
  },
  { title: 'Limpeza pesada', description: 'Produtos para rotinas mais intensas de manutenção.', icon: FaSprayCan },
  { title: 'Manutenção', description: 'Apoio contínuo à rotina de conservação do condomínio.', icon: FaTools },
  {
    title: 'Acessórios e materiais',
    description: 'Complementos para a equipe de limpeza do dia a dia.',
    icon: MdOutlineCleaningServices,
  },
];

const beneficios = [
  {
    title: 'Compra mais organizada',
    description: 'Centralize as necessidades de limpeza com um fornecedor dedicado ao condomínio.',
    icon: FaClipboardList,
  },
  {
    title: 'Produtos adequados',
    description: 'Orientações para escolher o que faz sentido para cada superfície e rotina.',
    icon: FaCheckCircle,
  },
  {
    title: 'Mais praticidade',
    description: 'Facilite a rotina de compras de síndicos, administradoras e responsáveis.',
    icon: FaTruck,
  },
  {
    title: 'Atendimento próximo',
    description: 'Fale direto com a equipe da EcoClean para alinhar as melhores opções.',
    icon: FaHandsHelping,
  },
];

const diferenciais = [
  {
    title: 'Empresa local',
    description:
      'A EcoClean está em Matinhos – PR e atende condomínios de Guaratuba e região com proximidade.',
    icon: FaMapMarkerAlt,
  },
  {
    title: 'Foco em soluções profissionais',
    description:
      'Atendimento pensado para rotinas de limpeza de áreas comuns, não apenas para o consumo doméstico.',
    icon: FaBuilding,
  },
  {
    title: 'Reputação construída na região',
    description:
      'Uma empresa conhecida localmente, com presença consolidada e atendimento próximo ao litoral do Paraná.',
    icon: FaStar,
  },
  {
    title: 'Orientação no orçamento',
    description:
      'Ajudamos a identificar necessidades do condomínio antes de montar uma proposta adequada.',
    icon: FaComments,
  },
];

const passos = [
  {
    step: '01',
    title: 'Fale com a EcoClean',
    description: 'Conte um pouco sobre o condomínio e as necessidades de limpeza.',
  },
  {
    step: '02',
    title: 'Receba uma orientação',
    description: 'Nossa equipe ajuda a identificar os produtos mais adequados à rotina.',
  },
  {
    step: '03',
    title: 'Solicite seu orçamento',
    description: 'Receba uma proposta alinhada às demandas do seu condomínio.',
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

export default function CondominiosPage() {
  return (
    <main className="min-h-screen bg-white pb-[88px] md:pb-0">
      <CondominiosLandingHeader />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sec1.jpg"
            alt="Ambiente limpo e organizado — EcoClean"
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
                Soluções para condomínios
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light text-white leading-tight mb-5">
                Produtos de limpeza profissional para{' '}
                <span className="text-[#8ED96A] font-normal">condomínios em Guaratuba</span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
                Abasteça áreas comuns, banheiros, corredores, elevadores e demais espaços do
                condomínio com produtos adequados à rotina profissional de limpeza.
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-8 max-w-xl">
                A EcoClean fica em <strong className="font-medium text-white">Matinhos – PR</strong>{' '}
                e atende condomínios de Guaratuba e região com orientação e orçamento pelo WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <CondominiosWhatsAppCta id="hero-whatsapp" fullWidth className="sm:w-auto" />
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
                    <p className="text-white/70 text-sm">Fornecedor para condomínios</p>
                  </div>
                </div>
                <ul className="space-y-4 text-white/90 text-sm">
                  {[
                    'Atendimento a síndicos e administradoras',
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

      {/* PROBLEMAS */}
      <section className="py-16 md:py-24 bg-[#FAFBFD]" aria-labelledby="problemas-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Desafios comuns</SectionEyebrow>
            <h2
              id="problemas-title"
              className="text-3xl md:text-4xl font-light text-[#173363] leading-tight"
            >
              Seu condomínio precisa de mais do que produtos de limpeza.{' '}
              <span className="text-[#6EC747] font-normal">Precisa de um fornecedor confiável.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {problemas.map(item => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
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

      {/* SOLUÇÕES */}
      <section id="solucoes" className="py-16 md:py-24 bg-white scroll-mt-24" aria-labelledby="solucoes-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Soluções</SectionEyebrow>
            <h2 id="solucoes-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Tudo o que seu condomínio precisa para{' '}
              <span className="text-[#6EC747] font-normal">manter a limpeza em dia</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Categorias pensadas para a rotina de limpeza profissional em áreas condominiais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {solucoes.map(item => {
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

          <div className="mt-10 text-center">
            <CondominiosWhatsAppCta id="solucoes-whatsapp" variant="secondary" />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16 md:py-24 bg-[#FAFBFD]" aria-labelledby="beneficios-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionEyebrow>Benefícios</SectionEyebrow>
            <h2 id="beneficios-title" className="text-3xl md:text-4xl font-light text-[#173363]">
              Por que síndicos e administradoras{' '}
              <span className="text-[#6EC747] font-normal">escolhem a EcoClean</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map(item => {
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
            <h2 id="economia-title" className="text-3xl md:text-4xl font-light text-white leading-tight max-w-3xl mx-auto">
              Seu condomínio pode estar desperdiçando dinheiro com{' '}
              <span className="text-[#8ED96A] font-normal">produtos de limpeza</span>
            </h2>
            <p className="text-white/80 mt-5 max-w-2xl mx-auto leading-relaxed">
              Economia nem sempre é comprar o mais barato. Muitas vezes é escolher o produto certo,
              usar a diluição adequada, padronizar a rotina e evitar compras emergenciais.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              'Escolher o produto correto para cada área',
              'Utilizar a diluição adequada',
              'Evitar desperdícios na rotina',
              'Comprar de acordo com o consumo',
              'Padronizar produtos da equipe',
              'Reduzir compras emergenciais',
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
            <CondominiosWhatsAppCta
              id="economia-whatsapp"
              label="Quero analisar as necessidades do meu condomínio"
              message="Olá! Vim pelo site e gostaria de analisar as necessidades de limpeza do meu condomínio em Guaratuba."
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
              Em breve, publicaremos aqui relatos de síndicos e administradoras. Até lá, fale conosco
              pelo WhatsApp e conheça nosso atendimento.
            </p>
            <div className="mt-6">
              <CondominiosWhatsAppCta id="prova-whatsapp" variant="secondary" label="Falar com a EcoClean" />
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
              Um processo simples para o condomínio receber orientação e orçamento sem burocracia.
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

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 bg-[#173363] relative overflow-hidden" aria-labelledby="cta-final-title">
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
          <h2 id="cta-final-title" className="text-3xl md:text-4xl font-light text-white leading-tight mb-5">
            Vamos cuidar melhor da limpeza do{' '}
            <span className="text-[#8ED96A] font-normal">seu condomínio?</span>
          </h2>
          <p className="text-white/85 leading-relaxed mb-8 max-w-xl mx-auto">
            Fale com a EcoClean e solicite um orçamento para produtos de limpeza do seu condomínio em
            Guaratuba.
          </p>
          <CondominiosWhatsAppCta id="final-whatsapp" fullWidth className="sm:w-auto" />
          <p className="text-white/55 text-sm mt-5">
            Matinhos – PR · Atendimento a Guaratuba e região
          </p>
        </div>
      </section>

      <Footer />
      <CondominiosMobileStickyCta />
    </main>
  );
}
