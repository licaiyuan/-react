import React, { useState, useEffect } from 'react';
import './peopleManage.scss'
import '../contentManage/courseManagement/ckc.scss'
import { Button, Input } from 'antd';
import VirtualTable from '../contentManage/courseManagement/table.js'
import { getqq, postqq } from '../serve'
import { Lbs, requestTree } from '../comon/lbs'
const { Search } = Input;


const columns = [
    {
        title: '人群名称',
        key: 'name',
        dataIndex: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: '说明/描述',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: '人群图标',
        key: 'icon',
        dataIndex: 'icon',
    },

    {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
    },
    // {
    //     title: '操作',
    //     key: 'status',
    //     dataIndex: 'status',
    //     render: status => {
    //         {
    //             status.map(item => {
    //                 return (
    //                     <p key={item}>{item}</p>
    //                 )
    //             })
    //         }
    //     }
    // }

];
const Bmmanage = () => {
    const [choosean, setchoosean] = useState('全部')
    const xzan = (val) => {
        setchoosean(val)
    }
    const [total2, settotal2] = useState(10)
    const [current, setcurrent] = useState(1)
    const [name, setname] = useState("")
    let [data, setdata] = useState([])
    const [treeData, settreeData] = useState([])
    var [pId, setpId] = useState('')
    const changePage = () => { };
    const tbwzlist = [{ name: '新增', icon: 'xzrq.png' }, { name: '批量导入', icon: 'pldr.png' }, { name: '批量删除', icon: 'plsc.png' },]
    let bmimformation = async (pId) => {
        let { data } = await getqq({ current: current, pId: pId, size: 10 }, 'dept/getDeptByPId')
        console.log(data)
    }

    useEffect(() => {

        requestTree('dept/getDeptTree').then((val) => {
            settreeData(val)
        })



    }, [])
    const onSelect = (selectedKeys, info) => {
        console.log(info);
        let { node: { id } } = info
        bmimformation(id)
    };

    // const onCheck = (checkedKeys, info) => {
    //     console.log('onCheck', checkedKeys, info);
    // };
    return (<div className="content">
        <Lbs
            {...{ onSelect, treeData }}


        />
        <div className="szpl">


            <p className="rqtitle" style={{ width: '100%' }}>部门管理</p>
            <div className="dxxyh">


                <div className="xxyh">
                    <Search placeholder="请输入部门名称" className="search" onSearch={value => console.log(value)} enterButton />
                </div>
                <div className="xzrq">
                    {
                        tbwzlist.map(item => (
                            <div className="xzrq" key={item.name} style={{ marginLeft: '10px' }}>
                                <img src={require(`../images/peopleManage/${item.icon}`)} style={{
                                    height: '21px',
                                    width: '21px'
                                }} />
                                <p style={{ margin: 0 }}> {item.name}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div style={{ width: '100%' }}><VirtualTable data={data} columns={columns} total2={total2} changePage={changePage} style={{ width: '100%' }}></VirtualTable></div>
        </div>
    </div>)
}
export default Bmmanage;