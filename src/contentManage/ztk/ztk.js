import React, { useState, useEffect, useContext } from 'react';
import { Select, Input, DatePicker, Button, Cascader, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../courseManagement/ckc.scss';
import VirtualTable from '../courseManagement//table.js'
import { getqq, postqq } from '../../serve'
import { ColorContext } from '../../publicState';
const { RangePicker } = DatePicker;

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
const Ztk = () => {
    // var tblist = [{ type:'select',options:[], }];

    const [people, choosepeople] = useState('创建人');
    const [visible, setvisible] = useState(false);
    const [kcktotal, setkcktotal] = useState(49)
    const [choosean, setchoosean] = useState('全部')
    const [total2, settotal2] = useState(10)
    const [current, setcurrent] = useState(1)
    var [tabledate, settabledate] = useState([])
    const { color, dispatch } = useContext(ColorContext);
    const onChange = () => { };
    const addPeople = () => {
        console.log('add');
        setvisible(true);
    };

    var shelvesStatus = ['全部', '普通', '推荐']
    var gnangroup = [{ name: '导出', ffm: 'dc', icon: 'dc.png' }, { name: '批量上架', ffm: 'plsj', icon: 'plsj.png' }, { name: '批量下架', ffm: 'plxj', icon: 'plxj.png' }, { name: '批量删除', ffm: 'plsc', icon: 'plsc.png' },]
    const handleOk = e => {
        console.log(e);
        setvisible(false);
    };
    //标签分类接口
    const tagClassification = async () => {

        const response = await getqq({}, '/accountBackStage/getCrowdPage')
        console.log(response)

    }
    let getCurriculumPage = async () => {
        let data = await getqq({ current: current, size: 10 }, 'topicColumn/getTopicPage')
        console.log(data['data']['records'])

        settabledate(data['data']['records'])
    }
    useEffect(() => {
        console.log(choosean)
        tagClassification()
        getCurriculumPage()
    }, []);
    const handleCancel = e => {
        console.log(e);
        setvisible(false);
    };
    const xzan = (val) => {
        setchoosean(val)
    }

    const columns = [

        {
            title: '主题ID',
            key: 'id',
            dataIndex: 'id',
            align: "center",
            ellipsis: true,
            width: 200,
        },
        {
            title: '主题名称',
            key: 'name',
            dataIndex: 'name',
        },

        {
            title: '主题简介',
            key: 'description',
            dataIndex: 'description',
            align: "center",
            ellipsis: true,
            width: 200,
        },
        {
            title: '缩略图',
            key: 'thumbnail',
            dataIndex: 'thumbnail',
            render: thumbnail => (
                <img src={`${color.ip}${thumbnail}`} alt={thumbnail} style={{
                    height: '31px',
                    width: '31px'
                }} />
            )
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
        },
        {
            title: '公开类型',
            key: 'gklx',
            dataIndex: 'gklx',
        },
        {
            title: '主题栏目',
            key: 'is_topic',
            dataIndex: 'is_topic',
        },
        {
            title: '所属系列',
            key: 'seriesName',
            dataIndex: 'seriesName',
        },
        {
            title: '类型',
            key: 'seriesName',
            dataIndex: 'seriesName',
        },
        {
            title: '创建人',
            key: 'createpeople',
            dataIndex: 'createpeople',
        },
        {
            title: '创建时间',
            key: 'found_time',
            dataIndex: 'found_time',
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


            <div className="kckztbf">
                <div className="kckxbtyh">
                    <p>主题库</p>


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

export default Ztk;
