/*
 * @Author: ln
 * @Date: 2019-01-10 14:51:09
 * @LastEditors: ln
 * @Description: 扩展标签列
 * @Version: 0.0.1
 */


import { getAppTags } from "@/api/credit";
import { collectPluck, collectOnly } from "@/utils/index";
import { collectReplace } from "../../utils";

/**
 * @description: 扩展标签列
 * @param 列表数据;组装键名 
 * @return: 
 */
export function extendGridCol(data, localDiffPara) {
    var tagName = "async_extend_tag"; // 新增标签列的键（只要不与其他键冲突即可）
    var apiDiffPara = "CamainNo"; // 接口需要比对的键 一般为申请编号
    var apiPara = "Name"; // 接口的标签字段
    var apiTagCode = 'tagCode' // 需要区分颜色的字段
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
        var tagData = res.data.data;
        if (res.data.success) {
            data.forEach((item) => {
                var j = {};
                j[apiPara] = 'name';
                j[apiTagCode] = 'code';
                this.$set(
                    item,
                    tagName,
                    collectReplace(collectOnly(
                        tagData.filter(citem => {
                            return citem[apiDiffPara] == item[localDiffPara];
                        }),
                        [apiPara, apiTagCode]
                    ), j)
                );
            });
        }
    }).catch(() => {

    });
}