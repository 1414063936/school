import $ from 'jquery'

// 同步读取
export function syncHttpGet (url, data, successFun, errorFun) {
  $.ajax({
    url: url,
    type: 'get',
    async: false,
    data: data,
    timeout: 1000 * 3,
    dataType: 'json',
    success: successFun,
    error: function (xhr, textStatus) {

    }
  })
}
