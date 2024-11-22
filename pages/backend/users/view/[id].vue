<script setup lang="ts">
const params = useRoute().params

const { data: user } = await useFetch(`/api/users/${params.id as string}`)

definePageMeta({ layout: 'backend' })

useHead({
   title: 'Users',
   meta: [
      {
         name: 'keywords',
         content: 'Users View, Nuxt 3, Backend'
      },
      {
         name: 'Description',
         content: 'Users View Nuxt 3,  IT Genius Engineering'
      }
   ]
})
</script>

<template>
   <div>
      <div v-if="user">
         <p>id : {{ user.id }}</p>
         <p>email : {{ user.email }}</p>
         <p>name : {{ user.name }}</p>
         <p>createdAt : {{ user.createdAt }}</p>
         <p>updatedAt : {{ user.updatedAt }}</p>
      </div>
      <div v-else>
         <p>Loading post...</p>
      </div>
   </div>
</template>

<style scoped></style>
