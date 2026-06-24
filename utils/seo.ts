/**
 * Static SEO configuration for Cafe Pelak 1.
 *
 * NOTE: update `SITE_URL`, contact details and geo-coordinates with the
 * cafe's real production values when available.
 */

// Production domain. Update this to the real domain before deploying.
export const SITE_URL = 'https://cafepelak1.ir'

// Brand / business facts (Hashtgerd, Alborz, Iran)
export const BUSINESS = {
  name: 'کافه پلاک یک',
  nameEn: 'Cafe Pelak 1',
  legalName: 'Cafe Pelak 1 — کافه بیکری پلاک یک',
  phone: '+989366687897',
  instagram: 'https://instagram.com/cafePelak1',
  streetAddress: 'هشتگرد، البرز',
  locality: 'هشتگرد',
  region: 'البرز',
  country: 'IR',
  postalCode: '',
  // Approximate Hashtgerd coordinates — replace with the exact location.
  latitude: 35.9626,
  longitude: 50.6797,
  priceRange: '$$',
  image: `${SITE_URL}/images/intro-pic-primary.jpg`,
  logo: `${SITE_URL}/images/logo.svg`,
} as const

// All targeted keywords (Persian + English) for the cafe & bakery.
export const SEO_KEYWORDS: string[] = [
  'کافه کیا',
  'کافه هشتگرد',
  'کافه بیکری',
  'کافه بیکری هشتگرد',
  'کیا کافه',
  'kia cafe',
  'cafe kia',
  'pelak 1',
  'cafe pelak 1',
  'pelak yek',
  'پلاک یک',
  'پلاک یک هشتگرد',
  'کافه پلاک یک',
  'پلاک 1',
  'کافه پلاک 1',
  'کافه هشتگرد',
]

export const SEO_TITLE =
  'کافه پلاک یک هشتگرد | Cafe Pelak 1 — کافه بیکری'

export const SEO_DESCRIPTION =
  'کافه پلاک یک هشتگرد | کافه و بیکری تخصصی با نان و شیرینی تازه و فضایی دنج.. Cafe Pelak 1 — specialty coffee & fresh bakery in Hashtgerd.'

/**
 * Schema.org JSON-LD for a coffee shop / bakery.
 * Returned as a string ready to be injected into a <script type="application/ld+json">.
 */
export const buildLocalBusinessJsonLd = (): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['CafeOrCoffeeShop', 'Bakery'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: [
      BUSINESS.nameEn,
      'کافه کیا',
      'کیا کافه',
      'Kia Cafe',
      'پلاک یک',
      'Pelak Yek',
      'کافه پلاک 1',
      'Cafe Pelak 1',
    ],
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    image: BUSINESS.image,
    logo: BUSINESS.logo,
    priceRange: BUSINESS.priceRange,
    servesCuisine: ['Coffee', 'Bakery', 'Pastry', 'Dessert'],
    keywords: SEO_KEYWORDS.join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    sameAs: [BUSINESS.instagram],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:45',
        closes: '22:45',
      },
    ],
  }

  return JSON.stringify(data)
}
