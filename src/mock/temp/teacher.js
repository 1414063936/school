const teachers = []

for (let i = 1; i <= 5; i++) {
  teachers.push({
    cno: '' + i,
    name: i + '号',
    sex: '男',
    birth: '1990-01-01',
    phone: '1008611',
    address: '地球'
  })
}

export default {
  GET: config => {
    return {
      data: teachers,
      count: teachers.length
    }
  }
}
