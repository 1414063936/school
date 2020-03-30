export const partials = [
  {
    name: 'my-panel',
    template: `
      {{#if items}}
        <div class="my-panel">
          {{#each items}}
            <el-row :gutter="{{gutter}}" :style="{ {{#if style.flex }} flex: {{style.flex}} {{/if}} {{#if style.height}},height: '{{style.height}}'{{/if}} {{#if style.overflow-y}},'overflow-y': '{{style.overflow-y}}'{{else}},'overflow-y': 'auto'{{/if}} }">
              {{#each cols}}
                <el-col :span="{{span}}" :offset="{{offset}}" :push ="{{push}}" :pull="{{pull}}" :style="{ {{#if style.width}} width: '{{style.width}}'{{/if}} }">
                  <div class="my-panel-wrapper">
                    {{#if slot}}<slot name="{{slot}}"></slot>{{/if}}
                    {{> my-panel items = children}}
                  </div>
                </el-col>
              {{/each}}
            </el-row>
          {{/each}}
        </div>
      {{/if}}
`
  }
]
