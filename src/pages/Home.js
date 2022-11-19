import React,{useEffect,  useState} from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDataProduct, getById, deleteData } from '../redux/Action';
import FormCreateUpdate from '../components/FomrCreateUpdate';
import moment from 'moment/moment';
import Loading from '../components/Loading';
import Swal from "sweetalert2";

const styleButton = {
  background: "none",
  border: "none",
  padding: "0",
  cursor: "pointer",
  color : "blue"
}

const Home = () => {
  
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [dataById, setDataById] = useState("");
  const product_data = useSelector((state) => state.ReduxData.product)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Image',
      key: 'picture',
      dataIndex: 'picture',
      render:  (_,record) => <img src={record.picture} alt='' width="70" height="70"/>
    },
    {
      title: 'Active',
      key: 'isActive',
      dataIndex: 'isActive',
      sorter: (a, b) => a.isActive - b.isActive,
      render : (text) => String(text) === "true" ? <Tag color={"geekblue"} key={1}>{String(text).toUpperCase()}</Tag> : <Tag color={"volcano"} key={2}>{String(text).toUpperCase()}</Tag>
    },
    {
      title: 'Expired',
      key: 'expiredAt',
      dataIndex: 'expiredAt',
      sorter: (a, b) => moment(a.expiredAt).unix() - moment(b.expiredAt).unix(),
      render: (text) => <p>{moment(text).format('DD-MM-YYYY')}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button style={styleButton} onClick={()=> {openEditModal(record)}}>Edit</button>
          <button style={styleButton} onClick={()=> {handleRemoveBook(record)}}>Delete</button>
        </Space>
      ),
    },
  ];

  const handleRemoveBook = (values) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteData(values))
        fetchData();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

  const fetchData = async () => {
    try {
        setloading(true);
        setTimeout(() => {
          dispatch(getDataProduct());
            setloading(false);
        }, 1000);
    } catch (e) { 
        console.info(e)
    }
};

  const openEditModal = (record) => {
    dispatch(getById(record.id))
    setDataById(record)
    setOpen(true);
  }

  const showModal = () => {
    let id = null;
    setDataById(id)
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getDataProduct())
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, [dispatch])

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <div style={{float : "right", paddingBottom : 30}}>
        <Button type="primary" onClick={showModal} style={{width : 150}}>
            Create Product
        </Button>
      </div>
      { 
        loading ?
            <Loading/>
            :
            <Table columns={columns} dataSource={product_data} onChange={onChange} />
      }
      <FormCreateUpdate 
        open={open}
        setOpen={setOpen}
        setloading={setloading}
        dataById={dataById}
      />
    </>
  )
}
export default Home;