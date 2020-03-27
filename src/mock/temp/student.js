const students = []

for (let i = 1; i <= 18; i++) {
  students.push({
    cno: '' + i,
    name: i + '号',
    sex: '男',
    birth: '2000-01-01',
    phone: '1008611',
    address: '地球'
  })
}

export default {
  GET: config => {
    return {
      data: students,
      count: students.length
    }
  }
}
