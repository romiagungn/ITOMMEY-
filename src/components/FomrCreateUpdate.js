import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, DatePicker, Upload, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postData, getDataProduct, updateData, resetStatus } from '../redux/Action';
import { useDispatch,  useSelector } from 'react-redux';
import moment from 'moment';
import dayjs from 'dayjs';
import locale from 'antd/locale/id_ID';
import Swal from 'sweetalert2';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const FromCreateUpdate = (props) => {
    const dispatch = useDispatch();
    const dateFormat = 'YYYY-MM-DD';
    const {open, setOpen, setloading, dataById} = props;
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { showMessage, alertMessage, updateSuccess, createSuccess } = useSelector(({ ReduxData }) => ReduxData);

    const handleCancel = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        try {
            setOpen(false);
            setloading(true);
            setTimeout(() => {
                dispatch(getDataProduct());
                setloading(false);
            }, 1000);
        } catch (e) { 
            console.info(e)
        }
    };

    useEffect(() => {
        if (dataById !== null) {
            if(dataById.picture !== undefined){
                let fileListRaw = [
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: dataById.picture,
                    },
                ];
                setFileList(fileListRaw);
            }
        } else {
            let fileListRaw = [];
            setFileList(fileListRaw);
        }
    }, [dataById]);

    
    useEffect(() => {
        if(createSuccess){
            Swal.fire({
              icon: 'success',
              title: 'Yay...',
              text: 'You have successfully added a new product!'
            })
            dispatch(resetStatus());
        } else if (updateSuccess) {
            Swal.fire({
              icon: 'success',
              title: 'Yay...',
              text: 'You have successfully update product!'
            })
            dispatch(resetStatus());
        } else if (showMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text :  dataById !== null ? `Update Product failed, ${alertMessage}` : `Create Product failed ${alertMessage}`
            })
            dispatch(resetStatus());
        }
    }, [alertMessage, showMessage, updateSuccess, createSuccess, dataById, dispatch]);
    
    const onFinish = (values) => {
        values.expiredAt = moment(values.expiredAt).toISOString();
        values.picture =  fileList[0] !== undefined ? fileList[0].thumbUrl : "";

        if(dataById !== null){
            dispatch(updateData(values))
            fetchData();
        } else {
            values.isActive = true;
            dispatch(postData(values))
            fetchData();
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handleCancelPreview = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}> Upload </div>
        </div>
    );

    return (
        <>
            <Modal
                title={dataById !== null ? "Form Edit Data Product" : "Form Create Data Product"}
                open={open}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
            >
                <Form {...layout}
                    name="nest-messages" 
                    onFinish={onFinish} 
                    preserve={true}
                    initialValues={{
                        id : dataById !== null && dataById !== undefined ? dataById.id : "",
                        name : dataById !== null && dataById !== undefined ? dataById.name : "",
                        qty : dataById !== null && dataById !== undefined ? dataById.qty : "",
                        isActive : dataById !== null && dataById !== undefined ? dataById.isActive : false,
                        expiredAt : dataById !== null && dataById !== undefined ? dayjs(dataById.expiredAt, dateFormat) : "",
                    }}
                >
                    {
                        dataById ? 
                            <Form.Item name='id' label="ID">
                                <Input disabled={true}/>
                            </Form.Item>
                        : ""
                    }
                    <Form.Item name='name' label="Name"
                        rules={[{ required: true, message: 'name is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name='qty' label="Quantity">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name='expiredAt' label="DatePicker" >
                        <DatePicker format={dateFormat} locale={locale}/>
                    </Form.Item>
                    <Form.Item
                        name="picture"
                        label="Picture"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload action="/upload.do"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                            <img
                                alt="example"
                                style={{
                                width: '100%',
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </Form.Item>
                    
                    {
                        dataById ? 
                            <Form.Item name="isActive" label="Active" valuePropName="checked">
                                <Checkbox style={{lineHeight: '32px'}} onChange={onChange} />
                            </Form.Item>
                        : ""
                    }

                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8, }} >
                        <Button type="primary" htmlType="submit" style={{marginRight :10}}> Submit </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default FromCreateUpdate;