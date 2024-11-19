export default defineEventHandler((event) => {

   // รับ parameter ที่ส่งมาจาก client
   // http://localhost:3000/users/xx
   const id = getRouterParam(event, 'id')

   // รับ query string ที่ส่งมาจาก client
   // http://localhost:3000/users/xx?type=admin&page=1
   const query = getQuery(event)

   return {
      id: id,
      query: { type: query.type, page: query.page },
      name: 'User API from server/routes/user/[id].ts'
   }
})