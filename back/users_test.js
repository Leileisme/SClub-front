import users from "./models/users.js"

const data = [
{EMAIL:'1111@gmail.com',PASSWORD:'111111',SCHOOL_NAME:'科技大學',SCHOOL_CITY:'臺北市',REAL_NAME:'老王先生',USER_NAME:'1111',NICK_NAME:'老王先生',BDAY:'2000/01/01',GENDER:'生理女',MOBILE:'912345678',STUDENT_GRADE:'高一',EMAIL_UB:'',ROLE:2,TOKENS:'123546',IS_STUDENT:true}]

const test = async()=>{
  await users.create(data)
}

test()