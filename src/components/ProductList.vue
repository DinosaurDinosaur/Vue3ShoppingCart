<script setup>
import { ref } from 'vue'
import { useCartStore } from '../store/cart'

const cart = useCartStore()

// 你可以改成從 API 載入，這裡先用假資料
const products = ref([
  { id: 'sku_tee',   title: 'Classic Tee',   price: 399, image: 'https://picsum.photos/200/300' },
  { id: 'sku_cap',   title: 'Minimal Cap',   price: 299, image: 'https://picsum.photos/200/300' },
  { id: 'sku_mug',   title: 'Ceramic Mug',   price: 249, image: 'https://picsum.photos/200/300' },
  { id: 'sku_bag',   title: 'City Tote',     price: 699, image: 'https://picsum.photos/200/300' },
  { id: 'sku_socks', title: 'Cozy Socks',    price: 199, image: 'https://picsum.photos/200/300' },
  { id: 'sku_bottle',title: 'Steel Bottle',  price: 499, image: 'https://picsum.photos/200/300' }
])

const currency = (n) => new Intl.NumberFormat('zh-TW', { style:'currency', currency:'TWD' }).format(n)
</script>

<template>
  <div class="card">
    <h2 style="margin: 0 0 8px 0">商品列表</h2>
    <div class="product-grid">
      <div v-for="p in products" :key="p.id" class="product card">
        <img :src="p.image" :alt="p.title" loading="lazy" />
        <div class="name">{{ p.title }}</div>
        <div class="price">{{ currency(p.price) }}</div>
        <div class="space"></div>
        <button class="btn" @click="cart.add(p)">加入購物車</button>
      </div>
    </div>
  </div>
</template>
