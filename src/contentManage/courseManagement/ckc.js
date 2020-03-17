import React, { useState, useEffect, useContext } from 'react';
import { Select, Input, DatePicker, Button, Cascader, Modal } from 'antd';

import moment from 'moment';
import './ckc.scss';
import VirtualTable from './table.js'
import { getqq, postqq } from '../../serve'
import { ColorContext } from '../../publicState';
import Syxxbd from '../../comon/syxxbd'


function handleChange(value) {
    console.log(`selected ${value}`);
}
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledRangeTime(_, type) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
}
const { Option } = Select;
const Kck = () => {
    // var tblist = [{ type:'select',options:[], }];
    const [tblist, settblist] = useState([
        { type: 'select', options: [{ value: '', name: '所有标签分类' }], name: '标签分类' },
        { type: 'select', options: [{ value: '', name: '请先选择分类' }], name: '一级标签' },
        { type: 'select', options: [{ value: '', name: '请先一级标签' }], name: '二级标签' },
        { type: 'select', options: [], name: '形式' },
        { type: 'input', name: '课程id' },
        { type: 'input', name: '标题' },
        { type: 'input', name: '课程简介' },
        { type: 'choosepeople', name: '选择' },
        { type: 'time', name: '时间' },
        { type: 'select', options: [], name: ' 来源' },
        { type: 'Cascader', options: [], name: ' 部门' },
        { type: 'button', options: [], name: ' 查询' },
        { type: 'button', options: [], name: ' 清空' },
    ]);


    const [kcktotal, setkcktotal] = useState(49)
    const [choosean, setchoosean] = useState('全部')
    const [total2, settotal2] = useState(10)
    const [current, setcurrent] = useState(1)
    var [tabledate, settabledate] = useState([])
    const { color, dispatch } = useContext(ColorContext);
    var plfs = 'searchxxh'


    var shelvesStatus = ['全部', '已上架', '定时上架中', '待上架', '已下架']
    var gnangroup = [{ name: '学分设置', ffm: 'xfsz', icon: 'xfsz.png' }, { name: '批量上架', ffm: 'plsj', icon: 'plsj.png' }, { name: '批量下架', ffm: 'plxj', icon: 'plxj.png' }, { name: '批量删除', ffm: 'plsc', icon: 'plsc.png' }, { name: '导出', ffm: 'dc', icon: 'dc.png' }]

    //标签分类接口
    const tagClassification = async () => {

        const response = await getqq({}, '/accountBackStage/getCrowdPage')
        console.log(response)

    }
    let getCurriculumPage = async () => {
        let data = await getqq({ current: current, size: 10 }, 'curriculumBackstage/getCurriculumPage')
        console.log(data['data']['records'])

        settabledate(data['data']['records'])
    }
    useEffect(() => {
        console.log(choosean)
        tagClassification()
        getCurriculumPage()
    }, []);

    const xzan = (val) => {
        setchoosean(val)
    }

    const columns = [
        {
            title: '序号',
            key: 'xh',
            dataIndex: 'xh',
            // render: text => <a>{text}</a>,
        },
        {
            title: '课程ID',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: '标题',
            key: 'title',
            dataIndex: 'title',
        },

        {
            title: '课程简介',
            key: 'formName',
            dataIndex: 'formName',
        },
        {
            title: '缩略图',
            key: 'previewPhoto',
            dataIndex: 'previewPhoto',
            render: previewPhoto => (
                <img src={`${color.ip}${previewPhoto}`} alt={previewPhoto} style={{
                    height: '31px',
                    width: '31px'
                }} />
            )
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: '课程形式',
            key: 'kcxs',
            dataIndex: 'kcxs',
        },
        {
            title: '公开状态',
            key: 'gkzt',
            dataIndex: 'gkzt',
        },
        {
            title: '课程库',
            key: 'kck',
            dataIndex: 'kck',
        },
        {
            title: '创建时间',
            key: 'foundTime',
            dataIndex: 'foundTime',
        },
        {
            title: '创建人',
            key: 'createpeople',
            dataIndex: 'createpeople',
        },
        {
            title: '操作人',
            key: 'czr',
            dataIndex: 'czr',
        },
        {
            title: '课后习题',
            key: 'khxt',
            dataIndex: 'khxt',
        },
    ];
    const Rbwz = (props) => {
        return (
            <div className="tbwzyhlmd">
                <img src={require(`../../images/contentManage/${props.icon}`)} alt={props.icon} style={{
                    height: '21px',
                    width: '21px'
                }} />
                <p style={{
                    height: '8px'
                }}>{props.name}</p>
            </div>
        )

    }
    const changePage = () => {

    }
    return (
        <div>

            <Syxxbd {...{ tblist,plfs }}></Syxxbd>
            <div className="kckztbf">
                <div className="kckxbtyh">
                    <p>课程库</p>
                    <p>共{kcktotal}门课程</p>

                </div>
                <div className="kckxbtyh">
                    <div>
                        {shelvesStatus.map(item => (
                            <Button type="primary" className={item == choosean ? 'anjg2' : 'anjg'} onClick={() => { xzan(item) }} key={item}>{item}</Button>
                        ))}
                    </div>
                    <div className="tbwzyh">
                        {
                            gnangroup.map(item => (
                                <div key={item.name}><Rbwz icon={item.icon} name={item.name}></Rbwz></div>
                            ))
                        }

                    </div>

                </div>
                <VirtualTable   {...{ tabledate, columns, total2, changePage }} />
            </div>

        </div>
    );
};

export default Kck;
