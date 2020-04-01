const renders = {
  click: function (createElement, emitEventHandler, item) {
    return createElement('my-click-button', {
      ref: item.id,
      refInFor: true,
      props: item,
      on: {
        'click': () => emitEventHandler(`click#${item.id}`)
      }
    })
  },
  checks: function (createElement, emitEventHandler, item) {
    return createElement('my-checks-button', {
      ref: item.id,
      refInFor: true,
      props: item,
      on: {

      }
    })
  }
}
export default renders
