<template>
  <section class="content content--demo-5">
    <h2 class="content__title content__title--size-xl" ref="textRef">
      <slot>Created by Naseri</slot>
    </h2>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// ─── Helper: get element's inner height ───
const getHeight = (el) => {
  const styles = window.getComputedStyle(el);
  const height = el.offsetHeight;
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  const borderTop = parseFloat(styles.borderTopWidth);
  const borderBottom = parseFloat(styles.borderBottomWidth);
  return height - paddingBottom - paddingTop - borderTop - borderBottom;
};

const textRef = ref(null);

// ─── Configuration ───
const CONFIG = {
  totalWords: 8,
  tyIncrement: 15,
  txIncrement: 1,
  opacityIncrement: 0.10,
  delayIncrement: 0.02,
};

let scrollTimeline = null;
let progressTicker = null;
let observer = null;
let isLoaded = false;

onMounted(() => {
  if (!process.client) return;
  const el = textRef.value;
  if (!el) {
    console.error('TextRepetition: element not found');
    return;
  }

  // ─── 1. Get original text and wrap in a link ───
  const originalText = el.textContent.trim() || 'Created by Naseri';
  // Wrap the text in an <a> tag pointing to your GitHub
  const linkHtml = `<a href="https://github.com/Lomochenko" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${originalText}</a>`;

  // ─── 2. Build stacked spans ───
  let innerHTML = '';
  for (let i = 0; i < CONFIG.totalWords; i++) {
    const isLast = i === CONFIG.totalWords - 1;
    const tx = isLast ? 0 : -1 * (CONFIG.totalWords - i) * CONFIG.txIncrement;
    const ty = isLast ? 0 : -1 * (CONFIG.totalWords - i) * CONFIG.tyIncrement;
    const opacity = isLast ? 1 : Math.min(i * CONFIG.opacityIncrement, 1);
    const delay = isLast ? 0 : (CONFIG.totalWords - i) * CONFIG.delayIncrement;

    innerHTML += `
      <span
        data-tx="${tx}"
        data-ty="${ty}"
        data-opacity="${opacity}"
        data-delay="${delay}"
        style="grid-area: 1 / 1 / 2 / 2; display: block; text-align: center;"
      >${linkHtml}</span>
    `;
  }

  el.innerHTML = innerHTML;
  el.style.display = 'grid';
  el.style.placeItems = 'center';
  el.style.width = '100%';
  el.style.overflow = 'hidden';
  el.classList.add('text-rep');

  // ─── 3. Get all spans ───
  const spans = el.querySelectorAll('span');
  const copies = [...spans].slice(0, -1);

  // ─── 4. Add padding-bottom to create scroll space ───
  const height = getHeight(el);
  const paddingBottom = height * Math.floor(CONFIG.totalWords) * CONFIG.tyIncrement / 100;
  el.style.paddingBottom = paddingBottom + 'px';

  // ─── 5. GSAP timeline ───
  scrollTimeline = gsap.timeline({ paused: true }).to(copies, {
    duration: 1,
    ease: 'none',
    yPercent: (_, target) => -1 * parseFloat(target.dataset.ty),
    xPercent: (_, target) => -1 * parseFloat(target.dataset.tx),
    startAt: { opacity: 0 },
    opacity: (_, target) => parseFloat(target.dataset.opacity),
    delay: (_, target) => parseFloat(target.dataset.delay),
  });

  // ─── 6. Intersection Observer ───
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!isLoaded) isLoaded = true;
        gsap.ticker.add(progressTicker);
      } else {
        if (isLoaded) {
          gsap.ticker.remove(progressTicker);
        } else {
          isLoaded = true;
          gsap.ticker.add(progressTicker, true);
        }
      }
    },
    { root: null, rootMargin: '0px', threshold: 0 }
  );

  // ─── 7. Progress updater ───
  progressTicker = () => {
    const scrollY = window.scrollY + window.innerHeight;
    const elTop = el.offsetTop;
    const distance = window.innerHeight + el.offsetHeight;
    const progress = Math.min(Math.max((scrollY - elTop) / distance, 0), 1);
    scrollTimeline.progress(progress);
  };

  observer.observe(el);

  // ─── 8. Resize handler ───
  const handleResize = () => {
    const newHeight = getHeight(el);
    const newPadding = newHeight * Math.floor(CONFIG.totalWords) * CONFIG.tyIncrement / 100;
    el.style.paddingBottom = newPadding + 'px';
  };
  window.addEventListener('resize', handleResize);

  // ─── 9. Cleanup ───
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (progressTicker) {
      gsap.ticker.remove(progressTicker);
      progressTicker = null;
    }
    if (scrollTimeline) {
      scrollTimeline.kill();
      scrollTimeline = null;
    }
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.content {
  --content-offset: 10vh;
  margin: var(--content-offset) 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 120vh; */
  overflow-x: hidden;
  width: 100%;
}

.content__title {
  font-size: clamp(3rem, 10vw, 8rem);
  margin: 0;
  font-family: 'Arial Black', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  cursor: default;
  user-select: none;
  text-align: center;
  width: 100%;
  max-width: 100%;
  color: #b61e1e;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
}

/* ─── Style the link inside the text ─── */
.text-rep span a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
}

/* ─── All spans share the same grid cell ─── */
.text-rep span {
  background: transparent;
  line-height: 0.745;
  will-change: transform, opacity;
  padding-bottom: 0;
  display: block;
  text-align: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-word;
}

/* Ghost copies (semi-transparent) */
.text-rep span:not(:last-child) {
  color: rgba(182, 30, 30, 0.6);
}

/* Original (last) is solid */
.text-rep span:last-child {
  color: #b61e1e;
  opacity: 1 !important;
}

/* ─── Responsive (Phone) ─── */
@media screen and (max-width: 53em) {
  .content__title {
    font-size: clamp(3rem, 7vw, 3.5rem);
    padding: 0 15px;
  }

  .text-rep span {
    font-size: clamp(1.8rem, 7vw, 3.5rem);
    white-space: normal;
    word-break: break-word;
    line-height: 1.1;
  }
}

/* ─── Extra small phones ─── */
@media screen and (max-width: 400px) {
  .content__title {
    font-size: clamp(1.4rem, 5vw, 2.5rem);
    padding: 0 10px;
  }

  .text-rep span {
    font-size: clamp(1.4rem, 5vw, 2.5rem);
  }
}
</style>