import $ from 'jquery'
export default {
  methods: {
    syncHttpGet (url, data, successFun, errorFun) {
      $.ajax({
        url: url,
        type: 'GET',
        async: false,
        data: data,
        timeout: 1000 * 3,
        dataType: 'json',
        success: successFun,
        error: function (xhr, textStatus) {}
      })
    },
    convertFileToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            size: file.size,
            result: reader.result
          })
        }

        reader.onerror = () => {
          reject(new Error('error'))
        }
      })
    }
  }
}
