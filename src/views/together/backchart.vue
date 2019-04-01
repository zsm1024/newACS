<template>
  <ve-line :data="chartbackData" :settings="chartbackSettings"></ve-line>
</template>
<script>
export default {
  data() {
    return {
      nowdate: "",
      backvalue:"",
      firstDay:"",
      EndDay:"", 
      chartbackSettings: {
        area: true,
        label: {
          normal: {
            show: true
          }
        }
      }
    };
  },
  methods: {
    getnowdate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day =new Date(year,month,0);
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.firstDay= year.toString() + "-" + month.toString()+'-01';
      this.EndDay=year.toString() + "-" + month.toString()+'-'+day.getDate();
      this.backvalue = mydate;
    },
    choosemonth1(val) {
      this.backvalue = val;
      this.backvalue = this.backvalue ? Moment(this.backvalue).format("YYYY-MM") : "";
    },
    changesearch1() {
      this.chartbackData.rows = [];
      this.getLOANBACKCharDatas();
    },
    addbackdata() {
       this.chartbackData.rows=[];
      if (this.backdatas && this.backdatas != null) {
       this.backdatas.forEach(el => {
          this.chartbackData.rows.push({ name: el.date, 放款退件: el.num });
        });
      } else {
        this.chartbackData.rows.push({ name: this.backvalue, 放款退件: "0" });
      }
    },
    getLOANBACKCharDatas() {
      let parmas = {
        sdate: '2018-06',
        type: "LOANBACK"
      };
       getCharData(parmas).then(res => {
        if (res.data.success == 1) {      
          let data = res.data.data;
          this.backdatas = data;
          this.addbackdata()
        }
      });
    },
  },
  mounted() {
    this.getLOANCharDatas();
   
  }
};
</script>

