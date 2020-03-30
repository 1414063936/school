const renders = {
  click: function (createElement, emitEventHandler, item) {
    return createElement('click-button', {
      ref: item.id,
      refInFor: true,
      props: item,
      on: {
        'click': () => emitEventHandler(`click#${item.id}`)
      }
    })
  },
  checks: function (createElement, emitEventHandler, item) {
    return createElement('button', '嘤')
  }
}
export default renders
