<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__section">
          <h3 class="footer__title">Cafe Pelak</h3>
          <p class="footer__text">Experience premium coffee culture with us.</p>
          <div class="footer__social">
            <a href="#" class="footer__social-link" aria-label="Facebook">f</a>
            <a href="#" class="footer__social-link" aria-label="Instagram">📷</a>
            <a href="#" class="footer__social-link" aria-label="Twitter">𝕏</a>
          </div>
        </div>

        <div class="footer__section">
          <h4 class="footer__heading">Quick Links</h4>
          <ul class="footer__list">
            <li><a href="#intro" class="footer__link" @click="handleNavClick">Intro</a></li>
            <li><a href="#menu" class="footer__link" @click="handleNavClick">Menu</a></li>
            <li><a href="#gallery" class="footer__link" @click="handleNavClick">Gallery</a></li>
          </ul>
        </div>
        <!-- contact -->
         <div class="footer__section">
          <h4 class="footer__heading">Contact</h4>
          <ul class="footer__list">
            <li><a href="tel:+1234567890" class="footer__link">+1 (234) 567-890</a></li>
            <li><a href="#cafePelak1" class="footer__link">Instagram</a></li>
            <li>123 Coffee Street, City, Country</li>
          </ul>
        </div>

        <div class="footer__section">
          <h4 class="footer__heading">Location</h4>
          <!-- add location later -->
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2025 Cafe Pelak. All rights reserved.</p>
        <div class="footer__links">
          <a href="#" class="footer__link">Privacy Policy</a>
          <a href="#" class="footer__link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const handleNavClick = (e: Event) => {
e.preventDefault()
const target = e.target as HTMLAnchorElement
const href = target.getAttribute('href')
if (href) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
}
</script>

<style scoped>
.footer {
  background-color: var(--color-bg-neutral);
  color: var(--color-text);
  padding: var(--vspace-3) 0 var(--vspace-2);
  border-top: 1px solid var(--color-border);
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--vspace-2);
  margin-bottom: var(--vspace-2);
}

.footer__section {
  padding: var(--vspace-1);
}

.footer__title {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--vspace-0_75);
  color: var(--color-headings);
}

.footer__heading {
  font-size: var(--text-md);
  font-weight: 600;
  margin-bottom: var(--vspace-0_75);
  color: var(--color-headings);
}

.footer__text {
  color: var(--color-text-light);
  margin-bottom: var(--vspace-1);
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-bg);
  border-radius: 50%;
  color: var(--color-text);
  transition: all var(--transition-base);
}

.footer__social-link:hover {
  background-color: var(--color-bg-primary);
  color: var(--color-white);
}

.footer__list {
  list-style: none;
  padding: 0;
}

.footer__list li {
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
}

.footer__link {
  color: var(--color-text-light);
  transition: color var(--transition-base);
}

.footer__link:hover {
  color: var(--color-link);
}

.footer__label {
  font-weight: 600;
  color: var(--color-text);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--vspace-1);
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copyright {
  margin: 0;
  color: var(--color-text-light);
  font-size: var(--text-sm);
}

.footer__links {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer__links {
    justify-content: center;
  }
}
</style>
