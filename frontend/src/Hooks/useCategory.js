import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function useCategory() {
    const [category, setCategory] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-categories`)
            setCategory(data.categories)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return category
}