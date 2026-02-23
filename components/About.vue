<template>
  <section id="about" class="about">
    <div class="container">
      <div class="about__grid">
        <div class="about__image">
          <img
            src="/images/about-pic-primary.jpg"
            alt="About Cafe Pelak"
            class="about__img"
          />
        </div>

        <div class="about__content">
          <h2 class="about__title">About Cafe Pelak</h2>
          <p class="about__text">
            Welcome to Cafe Pelak, where tradition meets modern coffee culture. We are dedicated to
            providing the finest coffee experience with carefully selected beans from around the
            world.
          </p>
          <p class="about__text">
            Our passionate baristas craft each cup with precision and care, ensuring every visit is
            memorable. From our cozy ambiance to our exceptional service, we create the perfect
            space for coffee lovers.
          </p>

          <div class="about__features">
            <div class="feature">
              <h3 class="feature__title">Premium Quality</h3>
              <p class="feature__text">Sourced from the finest coffee regions worldwide</p>
            </div>
            <div class="feature">
              <h3 class="feature__title">Expert Baristas</h3>
              <p class="feature__text">Trained professionals crafting your perfect cup</p>
            </div>
            <div class="feature">
              <h3 class="feature__title">Cozy Atmosphere</h3>
              <p class="feature__text">The perfect place to relax and connect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.about {
  padding: var(--vspace-4) 0;
  background-color: var(--color-bg-neutral);
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--vspace-2);
  align-items: center;
}

.about__image {
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.about__img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform var(--transition-slow);
}

.about__image:hover .about__img {
  transform: scale(1.05);
}

.about__content {
  padding: var(--vspace-1);
}

.about__title {
  margin-bottom: var(--vspace-1);
  color: var(--color-headings);
}

.about__text {
  margin-bottom: var(--vspace-1);
  line-height: var(--type-line-height-body);
  color: var(--color-text);
}

.about__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--vspace-1);
  margin-top: var(--vspace-2);
}

.feature {
  padding: var(--vspace-1);
  background-color: var(--color-bg);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-bg-primary);
}

.feature__title {
  font-size: var(--text-md);
  margin-bottom: 0.5rem;
  color: var(--color-headings);
}

.feature__text {
  font-size: var(--text-sm);
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__features {
    grid-template-columns: 1fr;
  }
}
</style>

