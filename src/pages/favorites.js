import styles from '@/styles/About.module.css'
import { useState } from 'react';
import useNetwork from '@/data/network'

export default function About() {
    const { network, isLoading, isError } = useNetwork();

    if (isLoading) return <div>loading ...</div>;
    if (isError) return <div>error</div>;


    return (
        <div>
            <h1> About {network.name} </h1>
        </div>
    );
}