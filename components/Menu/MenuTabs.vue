<template>
  <div class="row s-menu__content">
    <div class="column xl-4 lg-5 md-12 s-menu__content-start">
      <div class="section-header" data-num="02">
        <h2 class="text-display-title">Our Menu</h2>
      </div>

      <nav class="tab-nav" ref="tabNavRef" :class="{ 'tab-nav--sticky': isSticky }">
        <ul class="tab-nav__list">
          <li
            v-for="(category, index) in categories"
            :key="index"
            :data-tab-active="activeTab === index ? '' : undefined"
          >
            <a :href="'#tab-' + category.id" @click.prevent="scrollToCategory(index)">
              <span>{{ category.name }}</span>
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                  fill-rule="nonzero"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="column xl-6 lg-6 md-12 s-menu__content-end" ref="menuContentRef">
      <div class="tab-content menu-block">
        <div
          v-for="(category, index) in categories"
          :key="index"
          :id="'tab-' + category.id"
          class="menu-block__group tab-content__item"
          :data-tab-active="activeTab === index ? '' : undefined"
        >
          <h6 class="menu-block__cat-name">{{ category.name }}</h6>

          <ul class="menu-list">
            <MenuItem v-for="item in category.items" :key="item.id" :item="item" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref(0)
const isSticky = ref(false)
const tabNavRef = ref<HTMLElement | null>(null)
const menuContentRef = ref<HTMLElement | null>(null)

const scrollToCategory = (index: number) => {
  activeTab.value = index
  const element = document.getElementById('tab-' + categories[index].id)
  if (element) {
    const firstItem = element.querySelector('.menu-list__item')
    const targetElement = firstItem || element
    
    const stickyNavHeight = tabNavRef.value?.offsetHeight || 60
    const additionalOffset = 250
    const totalOffset = isSticky.value ? stickyNavHeight + additionalOffset : additionalOffset
    
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - totalOffset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (window.innerWidth < 1000 && menuContentRef.value && tabNavRef.value) {
    const rect = menuContentRef.value.getBoundingClientRect()
    const menuEndRect = document.querySelector('.s-menu__content')?.getBoundingClientRect()
    isSticky.value = rect.top <= 0 && (menuEndRect ? menuEndRect.bottom > 0 : true)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const categories = [
  {
    id: 'signature-blends',
    name: 'Signature Blends',
    items: [
      {
        id: 1,
        name: 'Lounge Elegance Espresso',
        description:
          'Rich and full-bodied, our signature espresso blend with notes of dark chocolate and toasted nuts.',
        price: 3.5,
      },
      {
        id: 2,
        name: 'Velvet Mocha Delight',
        description: 'Silky mocha infused with a hint of vanilla, crowned with velvety whipped cream.',
        price: 4.25,
      },
      {
        id: 3,
        name: 'Caramel Macchiato Symphony',
        description: 'A harmonious blend of espresso, steamed milk, and caramel drizzle.',
        price: 4.0,
      },
      {
        id: 4,
        name: 'Hazelnut Heaven Latte',
        description: 'Creamy latte with the nutty goodness of hazelnut syrup.',
        price: 4.5,
      },
      {
        id: 5,
        name: 'French Vanilla Cappuccino',
        description: 'Classic cappuccino with a touch of French vanilla sweetness.',
        price: 4.25,
      },
    ],
  },
  {
    id: 'pastries',
    name: 'Freshly Baked Pastries',
    items: [
      {
        id: 6,
        name: 'Buttery Croissants',
        description: 'Flaky and buttery croissants baked to perfection.',
        price: 2.5,
      },
      {
        id: 7,
        name: 'Flaky Almond Danishes',
        description: 'Delicate pastries filled with almond paste and sliced almonds.',
        price: 3.0,
      },
      {
        id: 8,
        name: 'Blueberry Streusel Muffins',
        description: 'Moist muffins bursting with blueberries and a crumbly streusel top.',
        price: 2.75,
      },
      {
        id: 9,
        name: 'Chocolate-Filled Scones',
        description: 'Tender scones with a surprise chocolate center.',
        price: 3.25,
      },
      {
        id: 10,
        name: 'Raspberry Cream Cheese Danish',
        description: 'Sweet and tangy raspberry filling in a cream cheese danish.',
        price: 3.25,
      },
    ],
  },
  {
    id: 'gourmet-treats',
    name: 'Gourmet Treats',
    items: [
      {
        id: 11,
        name: 'Artisanal Dark Chocolate Truffles',
        description: 'Luxurious dark chocolate truffles dusted with cocoa powder.',
        price: 2.75,
      },
      {
        id: 12,
        name: 'Handcrafted Praline Bonbons',
        description: 'Praline-filled bonbons topped with a caramelized nut.',
        price: 3.0,
      },
      {
        id: 13,
        name: 'Pistachio and Sea Salt Toffee',
        description: 'Crunchy toffee coated in pistachios and sea salt.',
        price: 4.0,
      },
      {
        id: 14,
        name: 'Raspberry White Chocolate Bark',
        description:
          'Creamy white chocolate with swirls of raspberry and a sprinkle of almonds.',
        price: 3.5,
      },
      {
        id: 15,
        name: 'Salted Caramel Brownie Bites',
        description: 'Fudgy brownie bites with a caramel drizzle and a touch of sea salt.',
        price: 2.5,
      },
    ],
  },
]
</script>

<style scoped>
.tab-nav {
  position: relative;
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-nav--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--vspace-0_375) 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-nav:not(.tab-nav--sticky) {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.tab-nav--sticky .tab-nav__list li a {
  color: rgba(255, 255, 255, 0.8);
}

.tab-nav--sticky .tab-nav__list li a:hover {
  color: rgba(255, 255, 255, 1);
}

.tab-nav--sticky .tab-nav__list li[data-tab-active] a {
  color: rgba(255, 255, 255, 1);
  border-bottom-color: rgba(255, 255, 255, 0.8);
}

.tab-nav__list {
  display: flex;
  gap: var(--vspace-0_5);
  padding: 0 var(--gutter);
  margin: 0;
  list-style: none;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.tab-nav__list li a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--vspace-0_5) var(--vspace-0_75);
  white-space: nowrap;
  font-size: var(--text-sm);
  color: var(--color-text-light);
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-nav__list li a:hover {
  color: var(--color-text);
}

.tab-nav__list li[data-tab-active] a {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

.tab-nav__list svg {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

@media screen and (max-width: 1000px) {
  .tab-nav--sticky {
    padding: var(--vspace-0_375) 0;
  }

  .tab-nav__list {
    gap: 0;
  }

  .tab-nav__list li a {
    padding: var(--vspace-0_375) var(--vspace-0_5);
    font-size: calc(var(--text-size) * 0.9);
  }
}
</style>
