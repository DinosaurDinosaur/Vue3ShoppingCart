import { defineStore } from 'pinia'

const STORAGE_KEY = 'cart:v1'
const TAX_RATE = 0.05
const FREE_SHIPPING_THRESHOLD = 1000
const SHIPPING_FEE = 80

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] // 每筆：{ id, title, price, qty, image? }
  }),
  getters: {
    count: (s) => s.items.reduce((sum, i) => sum + i.qty, 0),
    subtotal: (s) => s.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    shipping() {
      return this.subtotal === 0 || this.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
    },
    tax() {
      return +(this.subtotal * TAX_RATE).toFixed(2)
    },
    total() {
      return +(this.subtotal + this.tax + this.shipping).toFixed(2)
    }
  },
  actions: {
    init() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) this.items = parsed
        }
      } catch (_) {}
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    add(product, qty = 1) {
      const idx = this.items.findIndex(i => i.id === product.id)
      if (idx >= 0) {
        this.items[idx].qty += qty
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image || '',
          qty
        })
      }
      this.persist()
    },
    setQty(id, qty) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      const n = Math.max(1, Number(qty) | 0)
      item.qty = n
      this.persist()
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    }
  }
})
