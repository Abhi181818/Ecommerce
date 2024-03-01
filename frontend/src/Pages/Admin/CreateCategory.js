import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../Components/Form/CategoryForm'
import { useAuth } from '../../Context/auth'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [auth, setAuth] = useAuth()
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/category/delete-category/${id}`, {
                headers: {
                    authorization: auth?.token

                }
            })
            if (data.success) {
                toast.success(data.message)
                getAllCategories()
            }
        } catch (error) {
            // console.log(error)
            toast.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, { name }, {
                headers: {
                    authorization: auth?.token

                }
            })
            if (data?.success) {
                toast.success(data.message)
                setName('')
                getAllCategories()
            }
        } catch (error) {
            // console.log(error)
            toast.error(error)
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-categories`,
                {
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
        <Layout title="Create Category">
            <div className='container m-3 p-3' >
                <div className='row'>
                    <div className='col-md-3 '>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <div className='card m-3 p-3'>
                            <h1>Manage Category</h1>
                            {/* <div className='card-header'>Create Category Form</div> */}
                            <div className='p-3'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map(c => (
                                            <>
                                                <tr>
                                                    <td key={c._id} className='text-center'>{c.name}</td>
                                                    <td className='text-center'>
                                                        <button className='btn btn-primary m-2'>Edit</button>
                                                        <button onClick={() => handleDelete(c._id)} className='btn btn-danger'>Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory


