<script setup lang="ts">
const params = useRoute().params

const { data: post } = await useFetch(`/api/posts/${params.id as string}`)

definePageMeta({ layout: 'backend' })

useHead({
   title: 'Posts',
   meta: [
      {
         name: 'keywords',
         content: 'Posts View, Nuxt 3, Backend'
      },
      {
         name: 'Description',
         content: 'Posts View Nuxt 3,  IT Genius Engineering'
      }
   ]
})
</script>

<template>
   <div>
      <div v-if="post">
         <p>id : {{ post.id }}</p>
         <p>title : {{ post.title }}</p>
         <p>content : {{ post.content }}</p>
         <p>published : {{ post.published }}</p>
         <p>authorId : {{ post.authorId }}</p>
         <p>createdAt : {{ post.createdAt }}</p>
         <p>updatedAt : {{ post.updatedAt }}</p>
      </div>
      <div v-else>
         <p>Loading post...</p>
      </div>
   </div>
</template>

<style scoped></style>
