<script setup lang="ts">
const router = useRouter()

const users = ref()

const getUsers = async () => {
   try {
      const response = await $fetch('/api/users', { method: 'GET' })
      const result = response.map((item) => ({ ...item, selected: false }))
      users.value = result
   } catch (error) {
      console.error('Error fetching users:', error)
   }
}

const viewUser = (id: number) => {
   router.push(`/backend/users/view/${id}`)
}

const viewPost = (id: number) => {
   router.push(`/backend/posts/view/${id}`)
}

onMounted(() => {
   getUsers()
})

definePageMeta({ layout: 'backend' })

useHead({
   title: 'Users',
   meta: [
      {
         name: 'keywords',
         content: 'Users, Nuxt 3, Backend'
      },
      {
         name: 'Description',
         content: 'Users Nuxt 3,  IT Genius Engineering'
      }
   ]
})
</script>

<template>
   <div>
      <h2 class="text-2xl font-bold mb-6">Users</h2>
      <div class="overflow-x-auto">
         <table class="table w-full">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Post</th>
                  <th>Manage</th>
               </tr>
            </thead>
            <tbody v-for="user in users" :key="user.id">
               <tr>
                  <td>{{ user.id }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.createdAt }}</td>
                  <td class="cursor-pointer" @click="user.selected = true">
                     <div class="flex gap-1 items-center">
                        {{ user.posts?.length }}

                        <span class="underline">view</span>
                     </div>
                  </td>

                  <td class="space-x-2">
                     <button class="btn btn-sm btn-primary" @click="viewUser(user.id)">View</button>
                  </td>
               </tr>

               <tr v-if="user.posts?.length != 0">
                  <td v-show="user.selected" colspan="6">
                     <div>
                        <div class="flex justify-between">
                           <p class="font-bold text-xl">
                              Posts : <span class="font-medium text-gray-500"> ({{ user.posts?.length }}) count</span>
                           </p>
                           <p class="underline cursor-pointer" @click="user.selected = false">hide</p>
                        </div>

                        <div v-for="post in user.posts" class="border-b py-3">
                           <p>Id : {{ post?.id }}</p>
                           <p>Title : {{ post?.title }}</p>
                           <p>Content : {{ post?.content }}</p>
                           <p>Published : {{ post?.published }}</p>
                           <p>Created : {{ post?.createdAt }}</p>
                           <button class="btn btn-primary btn-xs" @click="viewPost(post.id)">View</button>
                        </div>
                     </div>
                  </td>
               </tr>
            </tbody>

            <tbody v-if="users?.length == 0">
               <tr>
                  <td colspan="6"><p class="text-center">ไม่พบข้อมูล</p></td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<style scoped></style>
