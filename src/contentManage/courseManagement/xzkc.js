import React, { useState, useEffect, useContext } from 'react';
import { Select, Input, DatePicker, Button, Cascader, Modal } from 'antd';
import Syxxbd from '../../comon/syxxbd'
import { getqq, postqq } from '../../serve'
import { Lbs, requestTree } from '../../comon/lbs'
var Xzkc = () => {
    const [tblist, settblist] = useState([
        { type: 'input', name: '標題', key: "title" },
        { type: 'upload', name: '课程课件', key: "course" },


        { type: 'input', name: '课程简介', key: 'description' },

        { type: 'select', name: '课程形式', options: [], key: 'formId' },
        { type: 'labelList', options: [], name: '能力标签', key: 'labelList' },
        { type: 'uploadphoto', name: '预览图', key: 'previewPhoto' },


    ]);
    let [treeData, settreeData] = useState([])
    let kcxs = async () => {
        const { data } = await getqq({}, 'curriculumBackstage/getCurriculumFormList')


        let qkbtb = [...tblist]
        qkbtb[3] = { type: 'select', options: data, name: '课程形式', key: "formId" }
        settblist(qkbtb)


    }
    const onSelect = (selectedKeys, info) => {
        console.log(info);
        let { node: { id } } = info

    };

    useEffect(() => {
        kcxs()
        requestTree('curriculumBackstage/getAbilityLabelTree').then((val) => {
            settreeData(val)
        })
    }, [])
    return <>
        <Syxxbd {...{ tblist, plfs: 'searchxxs', onSelect, treeData }}></Syxxbd>
    </>
}
export default Xzkc