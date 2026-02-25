<template>
  <div class="grid-block s-intro__content">
    <div class="intro-header">
      <div 
        class="intro-header__overline"
        v-motion="{ 
          initial: { opacity: 0, y: 30 }, 
          enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 300 } } 
        }"
      >
        Welcome to
      </div>
      <h1 
        class="intro-header__big-type"
        v-motion="{ 
          initial: { opacity: 0, y: 40 }, 
          enter: { opacity: 1, y: 0, transition: { duration: 700, delay: 600 } } 
        }"
      >
        Pelak 1 <br />
        Cafe
      </h1>
    </div>

    <figure 
      class="intro-pic-primary"
      v-motion="{ 
        initial: { opacity: 0, scale: 0.95 }, 
        enter: { opacity: 1, scale: 1, transition: { duration: 800, delay: 200 } } 
      }"
    >
      <img
        src="/images/intro-pic-primary.jpg"
        srcset="/images/intro-pic-primary.jpg 1x, /images/intro-pic-primary@2x.jpg 2x"
        alt=""
      />
    </figure>

    <div class="intro-block-content">
      <figure 
        class="intro-block-content__pic"
        v-motion="{ 
          initial: { opacity: 0, scale: 0.95 }, 
          enter: { opacity: 1, scale: 1, transition: { duration: 800, delay: 400 } } 
        }"
      >
        <img
          src="/images/intro-pic-secondary.jpg"
          srcset="/images/intro-pic-secondary.jpg 1x, /images/intro-pic-secondary@2x.jpg 2x"
          alt=""
        />
      </figure>

      <div class="intro-block-content__text-wrap">
        <p 
          class="intro-block-content__text"
          v-motion="{ 
            initial: { opacity: 0, y: 30 }, 
            enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 900 } } 
          }"
        >
          Savor moments of bliss with every sip, as our expertly crafted coffees and delectable
          pastries embrace your senses.
        </p>

        <ul 
          class="intro-block-content__social"
          v-motion="{ 
            initial: { opacity: 0, y: 30 }, 
            enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 1200 } } 
          }"
        >
          <li><a href="#0">FB</a></li>
          <li><a href="#0">IG</a></li>
          <li><a href="#0">PI</a></li>
          <li><a href="#0">X</a></li>
        </ul>
      </div>
    </div>

    <div 
      class="intro-scroll"
      v-motion="{ 
        initial: { opacity: 0, y: 30 }, 
        enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 1500 } } 
      }"
    >
      <a class="smoothscroll" href="#about">
        <span class="intro-scroll__circle-text"></span>
        <span class="intro-scroll__text u-screen-reader-text">Scroll Down</span>
        <div class="intro-scroll__icon">
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m5.214 14.522s4.505 4.502 6.259 6.255c.146.147.338.22.53.22s.384-.073.53-.22c1.754-1.752 6.249-6.244 6.249-6.244.144-.144.216-.334.217-.523 0-.193-.074-.386-.221-.534-.293-.293-.766-.294-1.057-.004l-4.968 4.968v-14.692c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.692l-4.979-4.978c-.289-.289-.761-.287-1.054.006-.148.148-.222.341-.221.534 0 .189.071.377.215.52z"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </a>
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
  font-size: clamp(var(--text-display), var(--text-3xl) + 10vw, 18.4rem);
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

.intro-scroll {
  z-index: 2;
  grid-column: 2/span 6;
  grid-row: 2;
  display: flex;
  position: relative;
}

.intro-scroll a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 9.2rem;
  height: 9.2rem;
  position: relative;
}

.intro-scroll__circle-text {
  height: 100%;
  width: 100%;
  background-image: url(../images/scrolldown-circle-text.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  animation: rotation 12s linear infinite;
  transform-origin: center;
}

.intro-scroll__text {
  display: block;
  font-family: var(--type-body);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  line-height: var(--vspace-1);
}

.intro-scroll__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--vspace-1_25);
  width: var(--vspace-1_25);
}

.intro-scroll svg {
  height: var(--vspace-0_875);
  width: var(--vspace-0_875);
  animation: bounce 2s ease-in-out infinite;
}

.intro-scroll svg path {
  fill: var(--color-bg-accent-light);
}

@keyframes rotation {
  to {
    transform: rotate(1turn);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@media screen and (max-width: 1300px) {
  .intro-header {
    grid-column: 1/span 6;
  }

  .intro-header__overline {
    font-size: var(--text-md);
  }

  .intro-header__overline::before {
    display: none;
  }

  .intro-scroll {
    grid-column: 1/span 6;
    left: var(--vspace-0_25);
  }

  .intro-scroll a {
    width: 8.8rem;
    height: 8.8rem;
  }
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
