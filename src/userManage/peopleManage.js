import React, { useState, useEffect } from 'react';
import './peopleManage.scss'
import '../contentManage/courseManagement/ckc.scss'
import { Button, Input } from 'antd';
import VirtualTable from '../contentManage/courseManagement/table.js'
import { getqq, postqq } from '../serve'
var shelvesStatus = ['全部', '启用', '停用']
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
const People = () => {
    const [choosean, setchoosean] = useState('全部')
    const xzan = (val) => {
        setchoosean(val)
    }
    const [total2, settotal2] = useState(10)
    const [current, setcurrent] = useState(1)
    const [name, setname] = useState("")
    let [data, setdata] = useState([])
    const changePage = () => { };
    let requestPeople = async () => {
        let status;
        switch (choosean) {
            case '全部':
                status = '';
                break
            case '启用':
                status = 1;
                break
            case '停用':
                status = 0;
                break
        }
        let { data: { records, total } } = await getqq({ current: current, size: 10, name: name, state: status }, 'accountBackStage/getCrowdPage')
        // const records2 = records.map(item => {
        //     item['data']
        // })
        settotal2(total)
        setdata(records)
        console.log(records)

    }
    useEffect(() => {
        requestPeople()
    }, [])
    return (<div className="content">
        <p className="rqtitle">人群管理</p>
        <div className="dxxyh">


            <div className="xxyh"> {shelvesStatus.map(item => (
                <Button type="primary" className={item == choosean ? 'anjg2' : 'anjg'} onClick={() => { xzan(item) }} key={item}>{item}</Button>
            ))}
                <Search placeholder="请输入人群名称" className="search" onSearch={value => console.log(value)} enterButton />
            </div>
            <div className="xzrq">
                <img src={require('../images/peopleManage/xzrq.png')} style={{
                    height: '21px',
                    width: '21px'
                }} />
                <p style={{ margin: 0 }}> 新增人群</p>
            </div>
        </div>
        <div style={{ width: '100%' }}> <VirtualTable data={data} columns={columns} total2={total2} changePage={changePage}></VirtualTable>     </div>

    </div >)
}
export default People;