<template>
  <div class="grid-block s-intro__content">
    <div class="intro-header">
      <div class="intro-header__overline anim-fade-in-up" style="animation-delay: 0.3s">
        Welcome to
      </div>
      <h1 @click="scrollToMenu" class="intro-header__big-type anim-fade-in-up--big" style="animation-delay: 0.6s">
        <span>Pelak 1</span> <br />
        <span>Cafe</span>
      </h1>
    </div>

    <figure @click="scrollToMenu" class="intro-pic-primary anim-fade-in-scale" style="animation-delay: 0.2s">
      <img
        src="/images/intro-pic-primary.jpg"
        srcset="/images/intro-pic-primary.jpg 1x, /images/intro-pic-primary@2x.jpg 2x"
        alt=""
      />
    </figure>

    <div class="intro-block-content">
      <figure @click="scrollToMenu" class="intro-block-content__pic anim-fade-in-scale" style="animation-delay: 0.4s">
        <img
          src="/images/intro-pic-secondary.jpg"
          srcset="/images/intro-pic-secondary.jpg 1x, /images/intro-pic-secondary@2x.jpg 2x"
          alt=""
        />
      </figure>

      <div class="intro-block-content__text-wrap">
        <p class="intro-block-content__text anim-fade-in-up" style="animation-delay: 0.9s">
          Great coffee, fresh pastries – crafted with love and a warm welcome.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.s-intro {
  --content-padding-top: max(13.6rem, 24vh);
  --content-padding-bottom: var(--vspace-2_5);
  --content-min-height: calc(var(--vspace-1) * 27);
  z-index: 2;
  height: max(var(--content-min-height), 100vh);
  overflow: hidden;
  position: relative;
}

.s-intro__content {
  --grid-gap-v: 0;
  z-index: 2;
  grid-template-rows: auto 1fr;
  align-items: center;
  padding-top: var(--content-padding-top);
  padding-bottom: var(--content-padding-bottom);
  position: relative;
}

.intro-header {
  --overline-hline: calc(((100 / (6/1)) * 1%) - var(--gutter));
  z-index: 2;
  grid-column: 2/span 6;
  padding-top: var(--vspace-1);
  position: relative;
}

.intro-header__overline {
  font-family: var(--type-headings);
  font-weight: 400;
  font-style: italic;
  font-size: var(--text-lg);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  padding-left: 0.25em;
  margin-top: var(--vspace-0_25);
  margin-bottom: calc(var(--vspace-0_375) * -1);
  position: relative;
}

.intro-header__overline::before {
  content: "";
  display: block;
  height: 1px;
  width: var(--overline-hline);
  background-color: var(--color-text-light);
  position: absolute;
  top: 50%;
  left: calc((var(--overline-hline) + var(--gutter)) * -1);
}

.intro-header__big-type {
  font-size: clamp(var(--text-display), var(--text-3xl) + 10vw, 13.4rem);
  line-height: 1;
  margin-top: 0;
}

.intro-pic-primary {
  --pic-primary-width: calc((100 / (12/4)) * 1%);
  --pic-primary-mleft: calc(var(--pic-primary-width) / 2);
  width: var(--pic-primary-width);
  display: inline-flex;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  position: absolute;
  top: var(--content-padding-top);
  left: calc(50% - var(--pic-primary-mleft));
}

.intro-pic-primary img {
  margin: 0;
  vertical-align: bottom;
  aspect-ratio: 1200/1650;
}

.intro-block-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 9/span 4;
  grid-row: 1/3;
  padding-bottom: var(--vspace-2);
  position: relative;
}

.intro-block-content__pic {
  position: relative;
}

.intro-block-content__pic img {
  margin: 0;
  vertical-align: bottom;
  aspect-ratio: 1050/600;
}

.intro-block-content__text {
  border-top: 1px solid var(--color-border);
  padding-top: var(--vspace-0_5);
}

.intro-block-content__social {
  display: flex;
  margin-left: 0;
  list-style: none;
}

.intro-block-content__social li {
  padding-left: 0;
  margin-right: var(--vspace-0_625);
}

.intro-block-content__social a {
  font-size: var(--text-sm);
  letter-spacing: 0.15em;
  color: var(--color-text-light);
  transition: color 0.3s ease;
}

.intro-block-content__social a:hover {
  color: var(--color-text);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUpBig {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.anim-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease both;
  animation-play-state: paused;
}

.anim-fade-in-up--big {
  opacity: 0;
  animation: fadeInUpBig 0.7s ease both;
  animation-play-state: paused;
}

.anim-fade-in-scale {
  opacity: 0;
  animation: fadeInScale 0.8s ease both;
  animation-play-state: paused;
}

[data-page-ready] .anim-fade-in-up,
[data-page-ready] .anim-fade-in-up--big,
[data-page-ready] .anim-fade-in-scale {
  animation-play-state: running;
}

@media screen and (max-width: 1000px) {
  .intro-header {
    grid-column: 1/-1;
  }

  .intro-pic-primary {
    width: 50%;
    left: auto;
    right: 0;
    padding: 0;
  }

  .intro-block-content {
    grid-column: 4/span 9;
    grid-row: 2;
    flex-direction: row;
    padding-top: 15%;
  }

  .intro-block-content__text-wrap,
  .intro-block-content__pic {
    flex: none;
    width: 50%;
  }

  .intro-block-content__text-wrap {
    padding-inline: var(--gutter);
    position: relative;
    z-index: 3;
  }

  .intro-block-content__pic {
    padding-right: var(--gutter);
  }

  .intro-block-content__pic img {
    aspect-ratio: auto;
  }

  .intro-block-content__text {
    font-size: var(--text-sm);
    line-height: var(--vspace-0_875);
    border: none;
    padding-top: 0;
  }

  .intro-scroll svg {
    height: var(--vspace-0_75);
    width: var(--vspace-0_75);
  }
}

@media screen and (max-width: 900px) {
  .s-intro {
    --content-padding-top: max(13.6rem, 20vh);
  }
}

@media screen and (max-width: 800px) {
  .s-intro {
    height: auto;
  }

  .intro-header__overline {
    font-size: calc(var(--text-size) * 1.1);
  }

  .intro-block-content {
    grid-column: 1/-1;
    padding-top: var(--vspace-1);
  }

  .intro-scroll {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  .s-intro {
    --content-padding-top: max(12.8rem, 12vh);
  }

  .intro-pic-primary {
    width: 66.6666%;
  }

  .intro-block-content {
    padding-top: var(--vspace-0_5);
    padding-bottom: 0;
    flex-direction: column;
    align-items: start;
    justify-content: end;
  }

  .intro-block-content__pic {
    width: 60%;
    margin-bottom: 0;
    padding-inline: 0;
    margin-bottom: var(--vspace-1);
  }

  .intro-block-content__text-wrap {
    width: 100%;
    padding-inline: 0;
  }
}

@media screen and (max-width: 400px) {
  .intro-block-content__pic {
    width: max(18rem, 60%);
  }
}
</style>
<script setup lang="ts">
import { onMounted } from 'vue'

// Ensure 'menu' element exists
onMounted(() => {
  const menuElement = document.getElementById('menu')
  if (!menuElement) {
    console.error('Menu section not found!')
  }
})

// Smooth scroll function
function scrollToMenu() {
  const menuElement = document.getElementById('menu')
  if (menuElement) {
    menuElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>