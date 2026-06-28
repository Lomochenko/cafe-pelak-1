<template>
  <div>
    <!-- <Header /> -->
    <section id="intro" class="container s-intro target-section">
      <Hero />
    </section>
    <section id="menu" class="container s-menu target-section">
      <Menu />
    </section>
    <section id="gallery" class="container s-gallery target-section">
      <Gallery />
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import {
  SITE_URL,
  SEO_TITLE,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  BUSINESS,
  buildLocalBusinessJsonLd,
} from '~/utils/seo'

definePageMeta({
  layout: false,
})

// Fetch all dynamic data on the server (SSR) so it's ready on first paint
const { fetchAll } = useMenu()
const { fetchGallery } = useGallery()
await useAsyncData('site-data', () => Promise.all([fetchAll(), fetchGallery()]))

// Static, search-optimized metadata for the home page.
useSeoMeta({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS.join(', '),
  author: BUSINESS.nameEn,
  ogType: 'website',
  ogSiteName: BUSINESS.nameEn,
  ogTitle: SEO_TITLE,
  ogDescription: SEO_DESCRIPTION,
  ogUrl: SITE_URL,
  ogImage: BUSINESS.image,
  ogImageAlt: SEO_TITLE,
  ogLocale: 'fa_IR',
  ogLocaleAlternate: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: SEO_TITLE,
  twitterDescription: SEO_DESCRIPTION,
  twitterImage: BUSINESS.image,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: SITE_URL }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: buildLocalBusinessJsonLd(),
    },
  ],
})
</script>