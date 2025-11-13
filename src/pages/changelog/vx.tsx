import React, { useEffect, useState } from 'react';
import HeadMeta from "@/components/headermeta";
import Layout from "@/layout/main";


export default function VX({ version }: { version: any }) {
    // state and helpers

    return (
        <Layout>
            <div className="p-4 bg-theme text-theme max-w-6xl mx-auto w-full min-h-screen">
                <HeadMeta pageTitle="VX - Changelog" pageDescription="Changelog for VARIUS" />
                <h1 className="text-2xl font-bold">VX Changelog</h1>
                <h3 className="text-lg">Global Ver. : {version.version}</h3>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ }) {
    const version = await fetch("https://api.varius.technology/version").then(res => res.json());

    return {
        props: {
            version,
        }
    };
}