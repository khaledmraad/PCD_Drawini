"use client";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'


const ProfileContent = () => {

    const router = useRouter()

    if (!localStorage.getItem("auth_token")) {
        router.push("/signin");
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("done");

            const url = 'http://192.168.1.16:8081/api/v1/verifie-token';

            const token = localStorage.getItem("auth_token");
            console.log(token);
            
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data);
            } catch (error) {
                // console.log(error.message);
                router.push("/error");


            }
        };

        fetchData();

    }, []); 

    return (
        <div>
            ProfileContent
        </div>
    );
};

export default ProfileContent;
