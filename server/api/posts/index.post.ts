// POST: http://localhost:3000/api/posts
import { PrismaClient } from '@prisma/client'

// Type for User
type TUser = {
   name: string
   email: string
   posts?: TPost[]
}

// Type for Post
type TPost = {
   title: string
   content: string
   published: boolean
   author?: TUser
}

// Instance of PrismaClient
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   // Get the request body
   const body = await readBody<TPost>(event)

   // Create a new post
   const post = await prisma.post.create({
      data: {
         title: body.title,
         content: body.content,
         published: body.published,
         author: {
            // connectOrCreate, เช็คเงื่อนไขว่า มี email หรือยังใน table user ถ้ายังเข้า create
            connectOrCreate: {
               where: {
                  email: body.author!.email // เครื่องหมาย ! ตามหลังคือ บังคับค่าต้องมี
               },
               create: {
                  name: body.author!.name,
                  email: body.author!.email
               }
            }
         }
      }
   })

   // Return the created post
   return post

})