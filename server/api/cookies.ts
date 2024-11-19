export default defineEventHandler((event) => {


   // สร้างคุกกี้ใหม่
   setCookie(event, 'myCookie', 'myCookieValue', {
      httpOnly: true, // ป้องกันการอ่านค่าคุกกี้จาก JavaScript
      maxAge: 60 * 60 * 24, // คุกกี้หมดอายุใน 1 วัน
      secure: process.env.NODE_ENV === 'production' // ใช้ https ใน production
   })

   // อ่านตุกกี้จาก Request
   const cookies = parseCookies(event)
   console.log(cookies)

   return {
      message: 'Cookies has been set',
      cookies
   }
})