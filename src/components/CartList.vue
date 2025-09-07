<script setup>
import { ref } from 'vue'
import { useCartStore } from '../store/cart'
import CartItem from './CartItem.vue'

const cart = useCartStore()
const showCheckout = ref(false)  // 控制彈窗開關

const currency = (n) =>
  new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD' }).format(n)




// import { useCartStore } from '../store/cart'
// import CartItem from './CartItem.vue'

// const cart = useCartStore()
// const currency = (n) => new Intl.NumberFormat('zh-TW', { style:'currency', currency:'TWD' }).format(n)
</script>

<template>
  <div class="card">
    <h2 style="margin: 0 0 8px 0">購物車</h2>

    <div v-if="cart.items.length === 0" style="color:#94a3b8">目前沒有商品。</div>

    <div v-else style="display:flex; flex-direction:column; gap:12px;">
      <CartItem v-for="it in cart.items" :key="it.id" :item="it" />
      <div class="hr"></div>

      <div class="price-line"><span>小計</span><strong>{{ currency(cart.subtotal) }}</strong></div>
      <div class="price-line"><span>運費</span><strong>{{ currency(cart.shipping) }}</strong></div>
      <div class="price-line"><span>稅金 (5%)</span><strong>{{ currency(cart.tax) }}</strong></div>
      <div class="price-line" style="font-size:18px;"><span>合計</span><strong>{{ currency(cart.total) }}</strong></div>

      <div class="row" style="justify-content: flex-end; margin-top: 6px;">
        <button class="btn btn-ghost" @click="cart.clear()">清空購物車</button>
       <button class="btn" @click="showCheckout = true">結帳</button>
      </div>
    </div>

           <!-- Checkout Modal -->
            <div v-if="showCheckout" class="modal-backdrop">
                <div class="modal">
                <h3>結帳確認</h3>
                <p>您的總金額是：<strong>{{ currency(cart.total) }}</strong></p>
                <p>請選擇付款方式：</p>
                <div class="row">
                    <button class="btn">線上刷卡</button>
                    <button class="btn">7-11 到貨付款</button>
                </div>
                <div style="margin-top:12px; text-align:right;">
                    <button class="btn btn-ghost" @click="showCheckout = false">關閉</button>
                </div>
                </div>
            </div>



  </div>

     
</template>


<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
.modal {
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  color: #e2e8f0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
</style>

