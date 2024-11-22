<script setup lang="ts">
const params = useRoute().params
const PID = params.id as string

const { data: post } = await useFetch(`/api/posts/${PID}`)

const statusNotify = ref(false)

const submitEdit = async () => {
   try {
      await $fetch(`/api/posts/${PID}`, {
         method: 'PUT',
         body: {
            id: PID,
            title: post.value?.title,
            content: post.value?.content,
            published: post.value?.published
         }
      })

      statusNotify.value = true

      setTimeout(() => {
         statusNotify.value = false
      }, 3000)
   } catch (error) {
      console.error('Error fetching posts:', error)
   }
}
definePageMeta({ layout: 'backend' })

useHead({
   title: 'Posts',
   meta: [
      {
         name: 'keywords',
         content: 'Posts Edit, Nuxt 3, Backend'
      },
      {
         name: 'Description',
         content: 'Posts Edit Nuxt 3,  IT Genius Engineering'
      }
   ]
})
</script>

<template>
   <div>
      <div v-show="statusNotify" role="alert" class="alert alert-success">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <span>update success!</span>
      </div>

      <div v-if="post">
         <p>id : {{ post.id }}</p>
         <p>
            title :
            <input v-model="post.title" type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
         </p>
         <p>
            content :
            <input v-model="post.content" type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
         </p>
         <p>
            published :
            <input v-model="post.published" type="checkbox" class="toggle toggle-primary" :checked="post.published" />
         </p>
         <p>authorId : {{ post.authorId }}</p>
         <p>createdAt : {{ post.createdAt }}</p>
         <p>updatedAt : {{ post.updatedAt }}</p>
      </div>
      <div v-else>
         <p>Loading post...</p>
      </div>

      <button class="btn btn-primary" @click="submitEdit">Submit Edit</button>
   </div>
</template>

<style scoped>
p {
   padding: 8px 0px;
}
</style>
