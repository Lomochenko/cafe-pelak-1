<template>
  <footer class="footer">
    <div class="footer__bg-pattern"></div>
    <div class="footer__grid-lines"></div>
    
    <div class="container">
      <div class="footer__content">
        <!-- Brand Section -->
        <div class="footer__brand">
          <h3 class="footer__title">
            <span class="footer__title-line">Cafe</span>
            <span class="footer__title-line footer__title-line--accent">Pelak</span>
          </h3>
          <p class="footer__tagline">Experience premium coffee culture with us.</p>
          
          <div class="footer__social">
            <a href="#cafePelak1" class="footer__social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="tel:+1234567890" class="footer__social-link" aria-label="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="footer__section">
          <h4 class="footer__heading">Contact</h4>
          <ul class="footer__list">
            <li class="footer__list-item">
              <svg class="footer__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <a href="tel:+1234567890" class="footer__link">+1 (234) 567-890</a>
            </li>
            <li class="footer__list-item">
              <svg class="footer__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
              <a href="#cafePelak1" class="footer__link">@cafePelak1</a>
            </li>
            <li class="footer__list-item">
              <svg class="footer__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>123 Coffee Street, City, Country</span>
            </li>
          </ul>
        </div>

        <!-- Location Section with Map -->
        <div class="footer__section footer__section--location">
          <h4 class="footer__heading">Location</h4>
          <div class="footer__map-wrapper">
            <iframe
              class="footer__map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9627430987844!2d51.38897!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzIxLjEiTiA1McKwMjMnMjAuMyJF!5e0!3m2!1sen!2s!4v1234567890"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Cafe Pelak Location"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2025 Cafe Pelak. All rights reserved.</p>
        <div class="footer__links">
          <a href="#" class="footer__link footer__link--bottom">Privacy Policy</a>
          <span class="footer__divider">|</span>
          <a href="#" class="footer__link footer__link--bottom">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--vspace-4) 0 var(--vspace-2);
  overflow: hidden;
}

/* Animated Background Pattern */
.footer__bg-pattern {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(70, 134, 114, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(70, 134, 114, 0.1), transparent),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-neutral-dark) 100%);
  animation: patternPulse 8s ease-in-out infinite;
}

@keyframes patternPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Animated Grid Lines */
.footer__grid-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(70, 134, 114, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(70, 134, 114, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 20s linear infinite;
  mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%);
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

/* Top Accent Line */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--color-1-400) 20%,
    var(--color-1-500) 50%, 
    var(--color-1-400) 80%,
    transparent 100%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Grid Layout */
.footer__content {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.8fr;
  gap: clamp(1.5rem, 4vw, var(--vspace-3));
  margin-bottom: var(--vspace-3);
  position: relative;
  z-index: 1;
}

.footer__brand {
  animation: fadeInUp 0.8s ease-out;
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

.footer__title {
  font-family: var(--type-headings);
  font-size: clamp(var(--text-2xl), 5vw, var(--text-3xl));
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--vspace-1);
  display: flex;
  flex-direction: column;
  gap: 0.1em;
}

.footer__title-line {
  display: block;
  animation: slideIn 0.8s ease-out backwards;
}

.footer__title-line--accent {
  color: var(--color-1-500);
  animation-delay: 0.2s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.footer__tagline {
  font-size: clamp(0.85rem, 2vw, var(--text-base));
  color: var(--color-text-light);
  margin-bottom: var(--vspace-1_5);
  line-height: 1.6;
  animation: fadeInUp 0.8s ease-out 0.3s backwards;
}

.footer__social {
  display: flex;
  gap: var(--vspace-0_5);
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 5vw, 3rem);
  height: clamp(2.5rem, 5vw, 3rem);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--color-text);
  transition: all 0.4s var(--ease-smooth);
  position: relative;
  overflow: hidden;
}

.footer__social-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-1-500), var(--color-1-600));
  opacity: 0;
  transition: opacity 0.4s var(--ease-smooth);
}

.footer__social-link:hover {
  transform: translateY(-3px);
  border-color: var(--color-1-500);
  box-shadow: 0 10px 30px -10px rgba(70, 134, 114, 0.5);
}

.footer__social-link:hover::before {
  opacity: 1;
}

.footer__social-link svg {
  width: clamp(1rem, 2.5vw, 1.25rem);
  height: clamp(1rem, 2.5vw, 1.25rem);
  position: relative;
  z-index: 1;
  transition: transform 0.3s var(--ease-smooth);
}

.footer__social-link:hover svg {
  transform: scale(1.1);
}

.footer__section {
  animation: fadeInUp 0.8s ease-out backwards;
}

.footer__section:nth-child(2) {
  animation-delay: 0.2s;
}

.footer__section:nth-child(3) {
  animation-delay: 0.4s;
}

.footer__heading {
  font-family: var(--type-headings);
  font-size: clamp(var(--text-base), 3vw, var(--text-lg));
  font-weight: 600;
  margin-bottom: var(--vspace-1);
  color: var(--color-headings);
  position: relative;
  padding-bottom: var(--vspace-0_5);
}

.footer__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2rem;
  height: 2px;
  background: linear-gradient(90deg, var(--color-1-500), transparent);
  transition: width 0.4s var(--ease-smooth);
}

.footer__section:hover .footer__heading::after {
  width: 4rem;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list-item {
  display: flex;
  align-items: flex-start;
  gap: clamp(0.5rem, 1.5vw, var(--vspace-0_5));
  margin-bottom: var(--vspace-0_75);
  font-size: clamp(0.85rem, 2vw, var(--text-base));
  color: var(--color-text-light);
  transition: all 0.3s var(--ease-smooth);
}

.footer__list-item:hover {
  transform: translateX(5px);
  color: var(--color-text);
}

.footer__icon {
  width: clamp(0.9rem, 2vw, 1.25rem);
  height: clamp(0.9rem, 2vw, 1.25rem);
  flex-shrink: 0;
  color: var(--color-1-500);
  transition: transform 0.3s var(--ease-smooth);
  margin-top: 0.15em;
}

.footer__list-item:hover .footer__icon {
  transform: scale(1.15);
}

.footer__link {
  color: var(--color-text-light);
  text-decoration: none;
  transition: all 0.3s var(--ease-smooth);
  position: relative;
}

.footer__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-1-500);
  transition: width 0.3s var(--ease-smooth);
}

.footer__link:hover {
  color: var(--color-1-500);
}

.footer__link:hover::after {
  width: 100%;
}

.footer__map-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
}

.footer__map-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  pointer-events: none;
  z-index: 1;
}

.footer__map-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px -10px rgba(70, 134, 114, 0.3);
}

.footer__map {
  width: 100%;
  height: clamp(160px, 22vw, 220px);
  display: block;
  filter: grayscale(0.7) contrast(1.1);
  transition: filter 0.4s var(--ease-smooth);
}

.footer__map-wrapper:hover .footer__map {
  filter: grayscale(0.5) contrast(1.2);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--vspace-2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: var(--vspace-1);
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.footer__copyright {
  margin: 0;
  color: var(--color-text-light);
  font-size: clamp(var(--text-xs), 2vw, var(--text-sm));
}

.footer__links {
  display: flex;
  align-items: center;
  gap: var(--vspace-0_75);
  font-size: clamp(var(--text-xs), 2vw, var(--text-sm));
}

.footer__divider {
  color: rgba(255, 255, 255, 0.2);
}

.footer__link--bottom {
  color: var(--color-text-light);
}

.footer__link--bottom:hover {
  color: var(--color-1-500);
}

/* Responsive Design */
@media screen and (max-width: 1000px) {
  .footer__content {
    grid-template-columns: 1fr 1fr;
    gap: var(--vspace-2);
  }

  .footer__section--location {
    grid-column: 1 / -1;
  }
}

@media screen and (max-width: 768px) {
  .footer {
    padding: var(--vspace-3) 0 var(--vspace-2);
  }

  .footer__content {
    grid-template-columns: 1fr;
    gap: var(--vspace-2);
  }

  .footer__brand {
    text-align: center;
  }

  .footer__social {
    justify-content: center;
  }

  .footer__title {
    align-items: center;
  }

  .footer__heading {
    text-align: center;
  }

  .footer__heading::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer__list-item {
    justify-content: center;
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
    gap: var(--vspace-0_75);
  }

  .footer__links {
    justify-content: center;
  }
}

@media screen and (max-width: 600px) {
  .footer {
    padding: var(--vspace-2_5) 0 var(--vspace-1_5);
  }

  .footer__content {
    gap: var(--vspace-1_5);
  }

  .footer__social-link {
    width: 2.75rem;
    height: 2.75rem;
  }

  .footer__map {
    height: 160px;
  }

  .footer__copyright,
  .footer__links {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 400px) {
  .footer {
    padding: var(--vspace-2) 0 var(--vspace-1);
  }

  .footer__list-item {
    font-size: 0.85rem;
    text-align: center;
  }

  .footer__title {
    font-size: 1.75rem;
  }
}
</style>
