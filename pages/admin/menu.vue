<template>
  <AdminLayout dir="rtl">
    <div class="menu-admin">
      <div class="admin-header-section">
        <div>
          <h2 class="admin-section-title">آیتم‌ های منو</h2>
          <p class="admin-section-subtitle">{{ menuItems.length }} آیتم / {{ categories.length }} دسته</p>
        </div>
        <button @click="openAddForm" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          افزودن آیتم
        </button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs" role="tablist">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
          role="tab"
          :aria-selected="activeCategory === cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="menu-items-grid">
        <div class="cards-grid">
          <div v-for="n in 6" :key="n" class="menu-item-card skeleton-card">
            <div class="skeleton skeleton--rect skeleton--thumbnail"></div>
            <div class="card-content">
              <div class="skeleton skeleton--text skeleton--title"></div>
              <div class="skeleton skeleton--text skeleton--desc"></div>
              <div class="skeleton skeleton--text skeleton--short"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Items Grid -->
      <div v-else-if="filteredItems.length" class="menu-items-grid" dir="rtl">
        <TransitionGroup name="card" tag="div" class="cards-grid">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="menu-item-card"
          >
            <div class="card-content">
              <div class="card-header">
                <h4 class="card-title">{{ item.name }}</h4>
                <span class="card-price" dir="ltr">{{ item.price }} T</span>
              </div>
              <p class="card-description">{{ item.description }}</p>
              <div class="card-meta">
                <span class="card-category">{{ item.category }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button @click="editItem(item)" class="action-btn" aria-label="Edit item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ویرایش
              </button>
              <button @click="confirmDelete(item)" class="action-btn action-btn--danger" aria-label="Delete item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                حذف
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div v-else class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
        <h3>هنوز آیتمی وجود ندارد</h3>
        <p>اولین آیتم را اضافه کنید</p>
        <button @click="openAddForm" class="btn btn-primary">افزودن آیتم</button>
      </div>
    </div>

    <!-- Add/Edit Form Modal -->
    <Teleport to="body">
      <Transition name="modal" dir="rtl">
        <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">{{ editingItem ? 'ویرایش آیتم' : 'افزودن آیتم' }}</h3>
              <button class="modal-close" @click="closeForm" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form @submit.prevent="saveItem" class="modal-body">
              <div class="form-group">
                <label class="form-label">نام *</label>
                <input v-model="formData.name" type="text" class="form-input" placeholder="نام آیتم را وارد کنید" required />
              </div>
              <div class="form-group">
                <label class="form-label">توضیحات *</label>
                <textarea v-model="formData.description" class="form-input form-textarea" placeholder="توضیحات آیتم" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">قیمت (تومان) *</label>
                <input v-model="formData.price" type="number" step="0.01" min="0" class="form-input" placeholder="۰" required />
              </div>
              <div class="form-group">
                <label class="form-label">دسته بندی *</label>
                <select v-model="formData.category" class="form-input form-select" required>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" @click="closeForm" class="btn btn-outline">انصراف</button>
                <button type="submit" class="btn btn-primary" :disabled="saving">
                  {{ saving ? 'در حال ذخیره...' : (editingItem ? 'به روز رسانی' : 'افزودن') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal" dir="rtl">
        <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
          <div class="modal-container modal-sm">
            <div class="modal-header">
              <h3 class="modal-title">حذف آیتم</h3>
              <button class="modal-close" @click="cancelDelete" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p>از حذف <strong>{{ itemToDelete?.name }}</strong> مطمئن هستید؟</p>
              <p class="delete-warning">این عمل قابل بازگشت نیست.</p>
            </div>
            <div class="modal-footer">
              <button @click="cancelDelete" class="btn btn-outline">انصراف</button>
              <button @click="executeDelete" class="btn btn-danger" :disabled="deleting">
                {{ deleting ? 'در حال حذف...' : 'حذف' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { useToast } from '~/composables/useToast'
import AdminLayout from '~/components/AdminLayout.vue'

const toast = useToast()

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, categories, fetchAll } = useMenu()

onMounted(async () => {
  loading.value = true
  await fetchAll()
  loading.value = false
})

const activeCategory = ref('')
const showForm = ref(false)
const showDeleteConfirm = ref(false)
const editingItem = ref(null)
const itemToDelete = ref(null)
const saving = ref(false)
const deleting = ref(false)
const loading = ref(false)

watch(categories, (cats) => {
  if (cats.length && !activeCategory.value) activeCategory.value = cats[0]
}, { immediate: true })

const formData = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
})

const filteredItems = computed(() =>
  menuItems.value.filter(item => item.category === activeCategory.value)
)

const openAddForm = () => {
  editingItem.value = null
  formData.value = { name: '', description: '', price: 0, category: activeCategory.value }
  showForm.value = true
}

const editItem = (item) => {
  editingItem.value = item
  formData.value = { name: item.name, description: item.description, price: item.price, category: item.category }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingItem.value = null
  formData.value = { name: '', description: '', price: 0, category: activeCategory.value }
}

const saveItem = async () => {
  saving.value = true
  try {
    const itemData = {
      name: formData.value.name,
      description: formData.value.description,
      price: Number(formData.value.price),
      category: formData.value.category,
    }
    if (editingItem.value) {
      await updateMenuItem(editingItem.value.id, itemData)
    } else {
      await addMenuItem(itemData)
    }
    closeForm()
  } catch (error) {
    console.error('Failed to save item:', error)
    toast.add('خطا در ذخیره آیتم: ' + (error?.message || 'خطای ناشناخته'), 'error')
  } finally {
    saving.value = false
  }
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  itemToDelete.value = null
}

const executeDelete = async () => {
  if (!itemToDelete.value) return
  deleting.value = true
  try {
    await deleteMenuItem(itemToDelete.value.id)
  } catch (error) {
    console.error('Failed to delete item:', error)
    toast.add('خطا در حذف آیتم: ' + (error?.message || 'خطای ناشناخته'), 'error')
  } finally {
    deleting.value = false
    cancelDelete()
  }
}
</script>

<style scoped>
.menu-admin {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.admin-section-title {
  font-size: x-large;
  color: var(--color-headings);
  margin: 0 0 0.25rem;
  font-family: var(--font-digi);
}

.admin-section-subtitle {
  color: var(--color-text-light);
  font-size: 1.5rem;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-digi);
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  flex-wrap: wrap;
}

.category-tabs button {
  padding: 0.8rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text);
  font-size: x-large;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s var(--ease-snappy-polished);
  font-family: var(--font-digi);
}

.category-tabs button:hover {
  border-color: var(--color-bg-primary);
  color: var(--color-bg-primary);
}

.category-tabs button.active {
  background: var(--color-bg-primary);
  border-color: var(--color-bg-primary);
  color: #fff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.menu-item-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s var(--ease-snappy-polished), box-shadow 0.2s var(--ease-snappy-polished);
}

.menu-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.card-title {
  margin: 0;
  font-size: x-large;
  font-weight: 600;
  color: var(--color-headings);
  line-height: 1.3;
  font-family: var(--font-digi);
}

.card-price {
  font-size: large;
  font-weight: 700;
  color: var(--color-bg-primary-light);
  white-space: nowrap;
  flex-shrink: 0;
}

.card-description {
  margin: 0 0 0.75rem;
  color: var(--color-text-light);
  font-size: large;
  line-height: 1.5;

}
/* .admin-section-title {
  font-size: x-large;
  color: var(--color-headings);
  margin: 0 0 0.25rem;
  font-family: var(--font-digi);
} */
.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.card-category {
  font-size: 1.275rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-light);
  background: var(--color-bg-neutral);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-neutral-light);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.6rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  font-size: large;
  font-family: var(--font-digi);
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy-polished);
}

.action-btn:hover {
  color: var(--color-text);
  border-color: var(--color-bg-primary);
}

.action-btn--danger:hover {
  color: #fff;
  border-color: #dc2626;
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-light);
  font-family: var(--font-digi);
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: var(--color-headings);
  font-family: var(--font-digi);
  font-size: x-large;
}

.empty-state p {
  margin: 0 0 1.5rem;
  font-size: large;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-container {
  background: var(--color-bg-neutral);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-sm {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  margin: 0;
  color: var(--color-headings);
  font-size: large;
  font-weight: 600;
  font-family: var(--font-digi);
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  display: flex;
}

.modal-close:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  font-family: var(--font-digi);
}
.modal-body strong {
  font-size: x-large;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: 1rem;
}
.form-group:last-child {
  margin-bottom: 0;
}

input, input::placeholder, textarea, select {
  font-family: var(--font-digi) !important;
  font-size: large !important;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: larger;
  font-weight: 500;
  color: var(--color-headings);
  font-family: var(--font-digi);
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 1.4rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-bg-primary);
  box-shadow: 0 0 0 3px var(--color-bg-primary-light);
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239fa1a1' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 0.75rem center;
  padding-left: 2.5rem;
}

.delete-warning {
  color: #dc2626;
  font-size: large;
  margin-top: 0.5rem;
}

/* Button Styles */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy-polished);
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--color-bg-primary);
  color: #fff;
  border-color: var(--color-bg-primary);
  font-size: large;
}

.btn-primary:hover {
  background: var(--color-bg-primary-dark);
}

.btn-outline {
  background: var(--color-bg-neutral-dark);
  color: var(--color-text);
  border-color: var(--color-border);
  font-size: large;
}

.btn-outline:hover {
  background: var(--color-bg);
  border-color: var(--color-text-light);
}

.btn-danger {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Transitions */
.card-enter-active,
.card-leave-active {
  transition: all 0.3s var(--ease-snappy-polished);
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s var(--ease-snappy-polished);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .admin-header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-header-section .btn {
    width: 100%;
    justify-content: center;
  }

  .category-tabs {
    justify-content: flex-start;
  }

  .modal-container {
    max-width: 100%;
    margin: 0.5rem;
  }

  .modal-footer {
    flex-direction: column;
  }

  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

/* Skeleton Loader */
.skeleton-card {
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, var(--color-bg-neutral-dark, #171a19) 25%, var(--color-bg-neutral-light, #232625) 50%, var(--color-bg-neutral-dark, #171a19) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm, 0.25rem);
}

.skeleton--rect {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md, 0.5rem);
}

.skeleton--text {
  height: 14px;
  margin-bottom: 0.6rem;
}

.skeleton--title {
  width: 65%;
  height: 18px;
}

.skeleton--desc {
  width: 90%;
}

.skeleton--short {
  width: 40%;
  margin-bottom: 0;
}

.skeleton--thumbnail {
  aspect-ratio: 16/10;
  border-radius: var(--radius-md, 0.5rem);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>