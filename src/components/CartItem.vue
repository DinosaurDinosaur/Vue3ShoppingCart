<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const props = defineProps({
  item: { type: Object, required: true }
})
const cart = useCartStore()

const lineTotal = computed(() => props.item.price * props.item.qty)
const currency = (n) => new Intl.NumberFormat('zh-TW', { style:'currency', currency:'TWD' }).format(n)
</script>

<template>
  <div class="row" style="justify-content: space-between;">
    <div class="row" style="gap:12px;">
      <img v-if="item.image" :src="item.image" :alt="item.title" style="width:56px;height:56px;object-fit:cover;border-radius:10px;border:1px solid rgba(255,255,255,0.06);" />
      <div>
        <div style="font-weight:700;">{{ item.title }}</div>
        <div style="color:#94a3b8;">單價：{{ currency(item.price) }}</div>
      </div>
    </div>

    <div class="row">
      <button class="btn btn-ghost" @click="cart.setQty(item.id, item.qty - 1)">－</button>
      <input class="input" type="number" min="1" :value="item.qty" @change="cart.setQty(item.id, $event.target.value)" />
      <button class="btn btn-ghost" @click="cart.setQty(item.id, item.qty + 1)">＋</button>
      <div style="width:110px; text-align:right; font-weight:700">{{ currency(lineTotal) }}</div>
      <button class="btn btn-danger" @click="cart.remove(item.id)">刪除</button>
    </div>
  </div>
</template>
