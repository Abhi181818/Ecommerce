import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useEffect } from 'react'
import axios from 'axios'
import { Select } from 'antd'
import { toast } from 'react-toastify'
import { useAuth } from '../../Context/auth'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const CreateProduct = () => {

    const [auth, setAuth] = useAuth()
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    // const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('quantity', quantity)
            formData.append('category', category)
            formData.append('image', image)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/create-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: auth?.token
                }

            })
            if (data.success) {
                toast.success(data.message)
                setName('')
                setDescription('')
                setPrice('')
                setQuantity('')
                setCategory('')
                setImage('')
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            // console.log(error)
            toast.error(error)
        }
    }


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-categories`, {
                headers: {
                    authorization: auth.token

                }
            })
            if (data.success) setCategories(data.categories)
        } catch (error) {
            // console.log(error)
            toast.error(error)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <Layout title="Create Product">
            <div className='container m-3 p-3' >
                <div className='row'>
                    <div className='col-md-3 '>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <div className='card m-3 p-3'>
                            <h1>Create Product</h1>
                            {/* <div className='card-header'>Create Product Form</div> */}
                            <div className='m-1'>
                                <Select variant={false} placeholder="Select a cat" size='large' showSearch className='form-select' onChange={(value) => { setCategory(value) }}>
                                    {categories.map((c) => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}
                                </Select>
                                <div className='m-3'>
                                    <label className='btn btn-outline-secondary'>
                                        {image ? image.name : "Upload Image"}
                                        <input type='file' name='image' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                <div className='m-3'>
                                    <input type='text' className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type='text' className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <input type='number' className='form-control' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <input type='number' className='form-control' placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <button className='btn btn-primary m-2' onClick={handleCreate}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
