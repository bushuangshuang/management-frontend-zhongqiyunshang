import { upLoadFile } from '@/api/common'

let data = {}
upLoadFile(data).then(res => {
  if (res.data.code === '200') {
    this.infoForm.fileUrl = res.data.list[0]
  } else {
    this.$Message.info(res.data.msg)
  }
})
