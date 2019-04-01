 import echarts from 'echarts'
 const this_echarts=echarts
export function chart(chartId,Xdata,Ydata){  
    var $chartId=chartId;
    $chartId = this_echarts.init(document.getElementById(chartId)); 
        $chartId.setOption({
            grid:{
                right:40,
                left:40,
                top:20,
                bottom:40
              },
              xAxis: {
                boundaryGap: false,
                data:Xdata,
                nameTextStyle:{
                  color:'red'
                },
                position:0
              },
              yAxis: {
                type: "value"
              },
              tooltip: {
                trigger: "axis",
                 formatter: '{b}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#5881d8 "></span>{c0}件',
              },
              series: [
                {
                  smooth:'true',
                  data:Ydata,
                  type: "line",
                  label: {
                    normal: {
                      show: true,
                      position: "top",
                      color:'rgba(88, 129, 216, 1)'
                    }
                  },
                  itemStyle:{
                    borderColor:'rgba(88, 129, 216, 1)'
                  },
                  lineStyle:{
                    color:"rgba(88, 129, 216, 1)",
                    width:2
                  },
                  areaStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 1,
                      x2:0,
                      y2:0,
                      colorStops: [
                        {
                          offset:0.8,
                          color: "RGBA(88, 129, 216, 0.18)" // 0% 处的颜色
                        },
                        {
                          offset:0,
                          color: "RGBA(88, 129, 216, 0.06)" // 100% 处的颜色
                        }
                      ],
                      globalCoord: true // 缺省为 false
                    }
                  }
                }
              ]
           });
}
export default {
    chart
}