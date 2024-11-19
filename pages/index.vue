<script setup lang="ts">
// Fetch data from API
const { data } = useFetch('/api/sample')

// สร้างฟังก์ชัน submit สำหรับส่งข้อมุลไปยัง API
async function submit() {
   // ใช้ $fetch แทน useFetch
   // เมื่อเรียกข้อมูลหลังจากที่คอมโพเนนต์ได้ mount ไปแล้ว
   const response = await $fetch('/api/submit', {
      method: 'POST',
      body: { test: 1234, name: 'Boss', age: 28 }
   })

   console.log(response)
}

// ทดสอบเรียก cookie จากฝั่ง Client
const cookieValue = ref('')
function getCookies() {
   const cookie = document.cookie
   console.log('Client-side Cookies:', cookie)
   cookieValue.value = cookie.includes('myCookie') ? 'myCookie Found' : 'myCookie Not Found'
}
</script>

<template>
   <pre>{{ data }}</pre>

   <button @click="submit">Submit</button>

   <br />
   <button @click="getCookies">Get Cookies</button>
   <p>{{ cookieValue }}</p>
</template>

<style scoped></style>
