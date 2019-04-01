import { getAppTags } from "@/api/credit";
import { collectPluck, collectOnly, collectReplace } from "@/utils/index";

export function addMianFlag(data, localDiffPara) {
    var tagName = "async_extend_mian"; // 新增标签列的键（只要不与其他键冲突即可）
    var apiDiffPara = "CamainNo"; // 接口需要比对的键 一般为申请编号
    // tag标签
    var applicationNos = collectPluck(data, localDiffPara)
        .filter(item => {
            return item;
        })
        .join(",");
    var para = {
        applicationnos: applicationNos,
        notype: 1,
        scenecode: "0003"
    };
    getAppTags(para).then(res => {
      if(!res){
        return 
      }
        var tagData = res.data.data;
        if ( res.data.success) {
            data.forEach((item) => {
                this.$set(
                    item,
                    tagName,
                    !!tagData.filter(citem => {
                        return citem[apiDiffPara] == item[localDiffPara];
                    }).length
                );
            });
        }
    });
}