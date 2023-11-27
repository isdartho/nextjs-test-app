"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const onSignup = async () => {

        try {
            setLoading(true);
            const resp = await axios.post("/api/users/signup", user);
            console.log("Signup success", resp.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed!", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }

    };
    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{isLoading ? "Signing up..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />
            <button 
                className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600"
                onClick={onSignup}>{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    );
}