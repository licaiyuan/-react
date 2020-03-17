import React, { useState, useContext, useEffect } from 'react';
import { Select, Input, DatePicker, Button, Cascader, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Lbs } from './lbs'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const onChange = () => { };
//select
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
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

const Syxxbd = (props) => {
    let { plfs,onSelect,treeData } = props
    console.log(plfs)
    const [people, choosepeople] = useState('创建人');
    const [visible, setvisible] = useState(false);
    let [hcdjsondata, sethcdjsondata] = useState({})
    const addPeople = (val) => {
        console.log('add');
        setvisible(true);
        settckbt(val)
    };
    const handleCancel = e => {
        console.log(e);
        setvisible(false);
    };
    const handleOk = e => {
        console.log(e);
        setvisible(false);
    };


    const handleChange = (value, key, type) => {
        switch (type) {
            case 'input' || 'inputarea':
                console.log(value.target.value)
                setsj(value.target.value, key)
                break;
            case 'select':
                console.log(value)
                setsj(value, key)
                break;
        }

        console.log(hcdjsondata)
    }

    const setsj = (a, b) => {
        sethcdjsondata({ ...hcdjsondata, ...{ [b]: a } })
    }
    const ansj = (value) => {
        console.log(value)
        value == '查询' ? props.search(hcdjsondata) : props.qk()


    }

    const [tckbt, settckbt] = useState('')
    // var [treeData, settreeData] = useState([])
    useEffect(() => {
        // props['tblist'].forEach(element => {
        //     console.log(element)
        //     if (element.type != 'button') {
        //         sethcdjsondata({ ...hcdjsondata, ...{ [element.id]: '' } })
        //         console.log(hcdjsondata)
        //     }



        // });

    }, []);
    return (<div className={plfs}>
        <Modal title={tckbt} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            {
                tckbt == '能力标签' ? <Lbs onSelect={onSelect}
                    // onCheck={onCheck}
                    treeData={treeData}></Lbs> : <p>asdsa</p>
            }


        </Modal>
        {props['tblist'].map((item, index) =>
            item.type == 'select' ? (
                <div className="yh" key={index}>
                    <p className="p">{item.name}：</p>{' '}
                    <Select

                        // defaultValue={item.options[0]['value']}
                        style={{ width: 120 }}
                        onChange={(value) => { handleChange(value, item.key, item.type) }}
                    >
                        {item.options.map(item2 => (
                            <Option key={item2.id} value={item2['id']}>
                                {item2.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            ) : item.type == 'input' ? (
                <div className="yh" key={item.name}>
                    {' '}
                    <p className="p">{item.name}：</p>{' '}
                    <Input className="srk" placeholder={item.placeholder} onChange={(value) => { handleChange(value, item.key, item.type) }} />{' '}
                </div>
            ) : item.type == 'time' ? (
                <div className="yh" key={item.name}>
                    {' '}
                    <p className="p">{item.name}：</p>{' '}
                    <RangePicker

                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </div>
            ) : item.type == 'choosepeople' || item.type == 'labelList' ? (
                <div key={item.name}>
                    {item.name} <Button type="primary" onClick={() => addPeople(item.name)} icon={<PlusOutlined />}></Button>
                </div>
            ) : item.type == 'button' ? <Button type="primary" className="yh" key={item.name} onClick={() => { ansj(item.name) }}>{item.name}</Button> : item.type == 'upload' ? <div className="yh" key={item.name}><p className="p">{item.name}：</p> <Upload key={item.name} {...props}>
                <Button>
                    <UploadOutlined /> Click to Upload
            </Button>
            </Upload> </div> :
                item.type == 'inputarea' ?

                    <div className="yh" key={item.name}>
                        {' '}
                        <p className="p">{item.name}：</p>{' '}
                        <TextArea rows={4} onChange={(value) => { handleChange(value, item.key, item.type) }} />
                    </div> :
                    item.type == 'uploadphoto' ?
                        <div className="yh" key={item.name}>
                            {' '}
                            <p className="p">{item.name}：</p>{' '}
                            <p>asdas</p>
                        </div>

                        :
                        (
                            <div className="yh" key={item.name}>
                                {' '}
                                <p className="p">{item.name}：</p>{' '}
                                <Cascader options={item.options} onChange={onChange} placeholder="Please select" />
                            </div>
                        )
        )}



    </div>)
}
export default Syxxbd