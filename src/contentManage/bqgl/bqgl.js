
import React, { useState, useEffect, useContext } from 'react';
import { Select, Input, DatePicker, Button, Cascader, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
// import '../courseManagement/ckc.scss';
import VirtualTable from '../courseManagement/table.js'
import { getqq, postqq } from '../../serve'
import { ColorContext } from '../../publicState';

import Syxxbd from '../../comon/syxxbd'

const Bqgl = () => {
    // var tblist = [{ type:'select',options:[], }];

    const [people, choosepeople] = useState('创建人');
    const [visible, setvisible] = useState(false);
    const [kcktotal, setkcktotal] = useState(49)
    const [choosean, setchoosean] = useState('全部')
    const [total2, settotal2] = useState(10)
    const [current, setcurrent] = useState(1)
    var [tabledate, settabledate] = useState([])
    const { color, dispatch } = useContext(ColorContext);
    const [tblist, settblist] = useState([
        { type: 'select', options: [{ value: '12312', name: '所有标签分类' }], name: '标签分类', key: "topLabelId" },


        { type: 'input', name: '一級名稱模糊搜索', key: 'firstLabelName' },
        { type: 'input', name: '二級名稱模糊搜索', key: 'secondLabelName' },
        { type: 'button', options: [], name: '查询' },
    ]);



    var shelvesStatus = ['全部', '已启用', '已停用']

    let search = async (value) => {

        await getqq({ ...value, ...{ current: current, size: 10 } }, 'curriculumBackstage/getAbilityLabelPage').then(({ data: { records, total } }) => {
            settotal2(total)
            settabledate(records)

        })


    }
    const qk = () => {

    }
    //標簽分類
    let bqfl = async () => {
        const { data } = await getqq({ pId: '', type: 1 }, 'curriculumBackstage/getAbilityLabelList')
        let [dyg, ...qtd] = tblist

        settblist([...[{ type: 'select', options: data, name: '标签分类', key: "topLabelId" }], ...qtd])

    }

    useEffect(() => {
        console.log(choosean)
        bqfl()


    }, []);

    const xzan = (val) => {
        setchoosean(val)
    }

    const columns = [

        {
            title: '一级标签',
            key: 'firstName',
            dataIndex: 'firstName',
            align: "center",
            ellipsis: true,
            width: 200,
        },
        {
            title: '二级标签',
            key: 'secondName',
            dataIndex: 'secondName',
            align: "center",
            ellipsis: true,
            width: 400,
        },

        {
            title: '标签说明',
            key: 'description',
            dataIndex: 'description',
            align: "center",
            ellipsis: true,
            width: 200,
        },
        // {
        //     title: '缩略图',
        //     key: 'thumbnail',
        //     dataIndex: 'thumbnail',
        //     render: thumbnail => (
        //         <img src={`${color.ip}${thumbnail}`} alt={thumbnail} style={{
        //             height: '31px',
        //             width: '31px'
        //         }} />
        //     )
        // },
        {
            title: '标签分类',
            key: 'topName',
            dataIndex: 'topName',
        },
        {
            title: '操作人',
            key: 'czr',
            dataIndex: 'czr',
        },

        {
            title: '操作时间',
            key: 'found_time',
            dataIndex: 'found_time',
        },
        {
            title: '狀態',
            key: 'state',
            dataIndex: 'state',
            render: state => (
                <p>{state == 0 ? '無效' : '有效'}</p>
            )
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
            <Syxxbd {...{ tblist, search, qk,plfs:'searchxxh' }}></Syxxbd>

            <div className="kckztbf">
                <div className="kckxbtyh">
                    <p>标签管理</p>

                    <Button type="primary">新增</Button>
                </div>
                <div className="kckxbtyh">
                    <div>
                        {shelvesStatus.map(item => (
                            <Button type="primary" className={item == choosean ? 'anjg2' : 'anjg'} onClick={() => { xzan(item) }} key={item}>{item}</Button>
                        ))}
                    </div>
     
                </div>
                <VirtualTable   {...{ tabledate, columns, total2, changePage }} />
            </div>

        </div>
    );
};

export default Bqgl;
