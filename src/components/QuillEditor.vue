<template>
  <div class="editorBox">
    <quilleditor
      v-model="content"
      ref="myTextEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
    >
      <div id="toolbar" slot="toolbar">
        <!-- Add subscript and superscript buttons -->
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
        <span class="ql-formats">
          <button type="button" class="ql-header" value="1"></button>
          <button type="button" class="ql-header" value="2"></button>
        </span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
        <span class="ql-formats"><button class="ql-script" value="sub"></button></span>
        <span class="ql-formats"><button class="ql-indent" value="-1"></button></span>
        <span class="ql-formats"><button class="ql-indent" value="+1"></button></span>
        <span class="ql-formats"><button class="ql-direction" value="rtl"></button></span>
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-align"></select>
        <span class="ql-formats"><button type="button" class="ql-link"></button></span>
        <span class="ql-formats">
          <button type="button" @click="imgClick" style="outline:none">
            <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
              class="ql-fill"
              cx="6"
              cy="7"
              r="1"></circle> <polyline
                class="ql-even ql-fill"
                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
          </button>
        </span>
        <span class="ql-formats"><button type="button" class="ql-video"></button></span>
      </div>
    </quilleditor>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // ?????? ?????? ????????? ????????? -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // ??????  ?????????-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1???2 ?????????-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // ?????????????????????-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // ??????/??????-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // ??????-----[{ indent: '-1' }, { indent: '+1' }]
  [{'direction': 'rtl'}], // ????????????-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // ????????????-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // ??????-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // ?????????????????????????????????-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // ????????????-----[{ font: [] }]
  [{ align: [] }], // ????????????-----[{ align: [] }]
  ['clean'], // ??????????????????-----['clean']
  ['image'] // ????????????????????????-----['link', 'image', 'video']
]

export default {
  name: 'VEditor',
  props: {
    value: {
      type: String
    },
    /* ????????????????????? */
    uploadUrl: {
      type: String,
      default: '/'
    },
    /* ???????????????file??????name */
    fileName: {
      type: String,
      default: 'file'
    },
    maxUploadSize: {
      type: Number,
      default: 1024 * 1024 * 1024 * 500
    }
  },
  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
          // toolbar: toolbarOptions
        }
      },
      client: null
    }
  },
  methods: {
    onEditorBlur (quill) {
      this.$emit('blur', this.content)
    },
    /* ???????????????????????? */
    onFileChange (e) {
      this.$emit('fileChange', e, this)
    },
    /* ???????????????????????? */
    imgClick () {
      /* if (!this.uploadUrl) {
        console.log('no editor uploadUrl')
        return
      } */
      /* ????????????input file */
      var input = document.createElement('input')
      input.type = 'file'
      input.name = this.fileName
      input.accept = 'image/jpeg, image/png, image/jpg, image/gif'
      input.onchange = this.onFileChange

      console.log('??????????????????', input)

      input.click()
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  components: {
    quilleditor: quillEditor
  },
  mounted () {
    this.content = this.value
  },
  watch: {
    value (newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal
        }
      }
    }
  }
}
</script>
<style>
.ql-align .ql-picker-label svg{
  width: 20px;
  height: 20px;
}
.editorBox .ql-toolbar{
	display: flex;
	flex-wrap: wrap;
}
.editorBox .ql-editor{
	min-height: 266px;
}
.editorBox .ql-formats{
	height: 30px;
	text-align: left;
}
.editorBox .ql-toolbar.ql-snow .ql-picker-label{
  display: flex;
  align-items: center;
}
</style>