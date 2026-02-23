<template>
  <section id="testimonials" class="testimonials">
    <div class="container">
      <div class="testimonials__header">
        <h2 class="testimonials__title">What Our Guests Say</h2>
        <p class="testimonials__subtitle">Real experiences from our valued customers</p>
      </div>

      <div class="testimonials__grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-card__stars">
            <span v-for="i in 5" :key="i" class="star">★</span>
          </div>
          <p class="testimonial-card__text">{{ testimonial.text }}</p>
          <div class="testimonial-card__author">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="testimonial-card__avatar" />
            <div>
              <p class="testimonial-card__name">{{ testimonial.name }}</p>
              <p class="testimonial-card__role">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  id: number
  text: string
  name: string
  role: string
  avatar: string
}

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    text: 'The best coffee experience I have ever had. The ambiance is perfect and the staff is incredibly friendly.',
    name: 'Sarah Johnson',
    role: 'Coffee Enthusiast',
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 2,
    text: 'Cafe Pelak has become my favorite spot to work and relax. Highly recommended!',
    name: 'Michael Chen',
    role: 'Freelancer',
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 3,
    text: 'The pastries are fresh and delicious. Every visit is a treat!',
    name: 'Emma Davis',
    role: 'Food Blogger',
    avatar: '/images/avatars/avatar-3.jpg',
  },
])
</script>

<style scoped>
.testimonials {
  padding: var(--vspace-4) 0;
  background-color: var(--color-bg);
}

.testimonials__header {
  text-align: center;
  margin-bottom: var(--vspace-3);
}

.testimonials__title {
  margin-bottom: var(--vspace-0_5);
}

.testimonials__subtitle {
  color: var(--color-text-light);
  font-size: var(--text-md);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--vspace-2);
}

.testimonial-card {
  padding: var(--vspace-2);
  background-color: var(--color-bg-neutral);
  border-radius: var(--radius-md);
  border-top: 3px solid var(--color-bg-primary);
  transition: all var(--transition-base);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.testimonial-card__stars {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-bg-secondary);
}

.star {
  margin-right: 0.25rem;
}

.testimonial-card__text {
  margin-bottom: var(--vspace-1);
  color: var(--color-text);
  line-height: var(--type-line-height-body);
  font-style: italic;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-card__name {
  margin: 0;
  font-weight: 600;
  color: var(--color-headings);
}

.testimonial-card__role {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}
</style>

