<template>
<section v-loading="pdfload">
   <iframe style="margin-top:24px;text-align:center;height:700px" :src="srcss"  frameborder="0" border="0" allowtransparency="yes" crolling='no'  width="100%" ></iframe>
</section>
   
</template>
<script>
import { AddList } from "@/api/together"
export default {
  data() {
    return {
      paths: window.g.ApiUrl,
      id: '',
      srcss:"",
      pdfload:false
    }
  },
  methods: {
    pdfview() {
      this.pdfload=true
      AddList().then(res => {
        let data = res.data.data[0]
        console.log(data)
        this.id = data.UPLOAD
        let b = this.paths + "s120017/downloaddoc?id="+data.UPLOAD
        this.srcss=this.paths + "s120017/downloaddoc?id="+data.UPLOAD
        this.pdfload=false
        // window.open(b)
      })
    }
  },
  mounted() {
    this.pdfview()
  }
}
</script>

