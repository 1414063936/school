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
    }
  }
}
