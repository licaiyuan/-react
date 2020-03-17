
import { Tree } from 'antd';
import React, { useState, useEffect } from 'react';
import { getqq, postqq } from '../serve'
const { TreeNode } = Tree;
const Lbs = (props) => {
    let { onSelect, treeData, onCheck } = props
    return <Tree


        onSelect={onSelect}
        // onCheck={onCheck}
        treeData={treeData}
        onCheck={onCheck}
    />
}
const requestTree = async (url) => {

    let { data } = await getqq({}, url)

    data.forEach(item => {

        item.title = item['name']
        item.key = item['id']
        item.children.forEach(item2 => {
            item2.title = item2['name']
            item2.key = item2['id']
            item2.children.forEach(item3 => {
                item3.title = item3['name']
                item3.key = item3['id']
            })
        })


    })
    return data




}

export { Lbs, requestTree }
// 'dept/getDeptTree'