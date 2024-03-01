import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/admin-auth`,
                {
                    headers: {
                        'Authorization': `${auth.token}`
                    }
                }
            )
            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        }
        if (auth?.token) {
            // setAuth(auth)
            authCheck()
        }
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner path="" />
}
