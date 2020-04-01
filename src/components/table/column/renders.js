const renders = {
  operations: (createElement, ctx, emitEventHandler) => {
    // emitEventHandler方法由table组件传入
    const row = JSON.parse(JSON.stringify(ctx.props.row))
    const column = ctx.props.column
    const options = column.props.options
    const type = column.props.type
    const label = column.props.label || ''

    let temps = []
    if (options) {
      temps = options.map((option) => {
        const childCtx = {props: {}}
        Object.assign(childCtx.props, option.props)

        switch (option.element) {
          case 'my-click-button':
            childCtx.on = {
              'click': () => {
                // 手动触发table组件自定义事件
                emitEventHandler(`click#${option.props.id}`, row)
              }
            }
            break
        }
        return createElement(option.element, childCtx)
      })
    }

    if (type === 'dropdown') {
      const dropdownButton = createElement(
        'el-button',
        { props: {type: 'text', size: 'mini'} },
        [
          label,
          createElement('i', {class: ['el-icon-menu']}),
          createElement('i', {class: ['el-icon-arrow-down', 'el-icon--right']})
        ]
      )
      const dropdownMenu = createElement('el-dropdown-menu', {slot: 'dropdown'},
        temps.map(item => {
          return createElement('el-dropdown-item', {}, [item])
        })
      )

      return createElement('el-dropdown', {}, [dropdownButton, dropdownMenu])
    }
    return createElement('div', {}, temps)
  }
}

export default renders
