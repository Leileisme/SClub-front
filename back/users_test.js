import users from './models/users.js'
// import texts from './models/texts.js'node

// 非學生
const data = [
  {
    EMAIL: '1111@gmail.com',
    PASSWORD: '111111',
    SCHOOL_NAME: '科技大學',
    SCHOOL_CITY: '臺北市',
    REAL_NAME: '老王先生',
    USER_NAME: '1111',
    NICK_NAME: '老王先生',
    BDAY: '2000/1/1',
    GENDER: '生理女',
    MOBILE: '12345678',
    STUDENT_GRADE: '高一',
    EMAIL_UB: '',
    ROLE: 2,
    SCORES: 80,
    IS_STUDENT: true
  }]

const test = async () => {
  console.log('start')
  await users.create(data)
  console.log('end')
}
// const data2 = [
//   {
//     EMAIL: '1111@gmail.com'
//   }]

// const test = async () => {
//   try {
//     console.log('Starting texts.create')
//     await texts.create(data2)
//     console.log('Finished texts.create')
//   } catch (error) {
//     console.error('Error in texts.create:', error)
//   }
// }

test()
