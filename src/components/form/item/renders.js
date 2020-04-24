const renders = {
  input: (createElement, ctx) => {
    ctx.data.attrs = {
      placeholder: ctx.data.props.placeholder,
      disabled: ctx.data.props.disabled
    }

    let childrenCreateElement = []
    if (ctx.data.props.slots) {
      ctx.data.props.slots.forEach(function (slot) {
        const element = slot.element
        let childCtx
        let grandson
        switch (element) {
          case 'div':
            childCtx = {
              slot: slot.name
            }
            grandson = slot.text
            break
          case 'my-select':
            childCtx = {
              slot: slot.name,
              props: Object.assign({}, slot),
              on: {
                'change': function (val) {
                  slot.value = val
                }
              }
            }
            break
        }
        childrenCreateElement.push(createElement(element, childCtx, grandson))
      })
    }
    return createElement('el-input', ctx.data, childrenCreateElement)
  },
  select: (createElement, ctx) => {
    return createElement('my-select', ctx.data)
  },
  'input-number': (createElement, ctx) => {
    return createElement('el-input-number', ctx.data)
  },
  radio: (createElement, ctx) => {
    const options = ctx.data.props.options
    let childrenCreateElement = []
    options.forEach(option => {
      const childCtx = {}
      childCtx.props = { label: option.value }
      childrenCreateElement.push(createElement('el-radio', childCtx, option.label))
    })
    return createElement('el-radio-group', ctx.data, childrenCreateElement)
  },
  checkbox: (createElement, ctx) => {
    const options = ctx.data.props.options
    let childrenCreateElement = []
    options.forEach(option => {
      const childCtx = {}
      childCtx.props = { label: option.value }
      childrenCreateElement.push(createElement('el-checkbox', childCtx, option.label))
    })
    return createElement('el-checkbox-group', ctx.data, childrenCreateElement)
  },
  'checkbox-group': (createElement, ctx) => {

  },
  switch: (createElement, ctx) => {
    return createElement('el-switch', ctx.data)
  },
  slider: (createElement, ctx) => {
    return createElement('el-slider', ctx.data)
  },
  'time-select': (createElement, ctx) => {
    return createElement('el-time-select', ctx.data)
  },
  'time-picker': (createElement, ctx) => {
    return createElement('el-time-picker', ctx.data)
  },
  'date-picker': (createElement, ctx) => {
    return createElement('el-date-picker', ctx.data)
  },
  rate: (createElement, ctx) => {
    return createElement('el-rate', ctx.data)
  },
  cascader: (createElement, ctx) => {
    return createElement('el-cascader', ctx.data)
  },
  'color-picker': (createElement, ctx) => {
    return createElement('el-color-picker', ctx.data)
  },
  'transfer': (createElement, ctx) => {
    return createElement('el-transfer', ctx.data)
  }
}

export default renders
