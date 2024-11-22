<script setup lang="ts">
const router = useRouter()

const posts = ref()

const getPosts = async () => {
   try {
      const response = await $fetch('/api/posts', { method: 'GET' })
      console.log(response)
      posts.value = response
   } catch (error) {
      console.error('Error fetching posts:', error)
   }
}

const viewPost = (id: number) => {
   router.push(`/backend/posts/view/${id}`)
}

const editPost = (id: number) => {
   router.push(`/backend/posts/edit/${id}`)
}

const deletePost = async (id: number) => {
   if (confirm('ยืนยันที่จะลบข้อมูล!') == true) {
      const response = await $fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (response.statusCode === 200) {
         getPosts()
      }
   }
}

onMounted(() => {
   getPosts()
})

definePageMeta({ layout: 'backend' })

useHead({
   title: 'Posts',
   meta: [
      {
         name: 'keywords',
         content: 'Posts, Nuxt 3, Backend'
      },
      {
         name: 'Description',
         content: 'Posts Nuxt 3,  IT Genius Engineering'
      }
   ]
})
</script>

<template>
   <div>
      <h2 class="text-2xl font-bold mb-6">Posts</h2>
      <div class="overflow-x-auto">
         <table class="table w-full">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Published</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Manage</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="post in posts" :key="post.id">
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.published ? 'Yes' : 'No' }}</td>
                  <td>{{ post.authorId ? `Author ${post.authorId}` : 'Unknown' }}</td>
                  <td>{{ post.createdAt }}</td>
                  <td class="space-x-2">
                     <button class="btn btn-sm btn-primary" @click="viewPost(post.id)">View</button>
                     <button class="btn btn-sm btn-warning" @click="editPost(post.id)">Edit</button>
                     <button class="btn btn-sm btn-error" @click="deletePost(post.id)">Delete</button>
                  </td>
               </tr>
            </tbody>

            <tbody v-if="posts?.length == 0">
               <tr>
                  <td colspan="6"><p class="text-center">ไม่พบข้อมูล</p></td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<style scoped></style>
