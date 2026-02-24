<template>
  <div class="row s-menu__content">
    <div class="column xl-4 lg-5 md-12 s-menu__content-start">
      <div class="section-header" data-num="02">
        <h2 class="text-display-title">Our Menu</h2>
      </div>

      <nav class="tab-nav">
        <ul class="tab-nav__list">
          <li
            v-for="(category, index) in categories"
            :key="index"
            :data-tab-active="activeTab === index ? '' : undefined"
          >
            <a :href="'#tab-' + category.id" @click.prevent="activeTab = index">
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

    <div class="column xl-6 lg-6 md-12 s-menu__content-end">
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
import { ref } from 'vue'

const activeTab = ref(0)

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