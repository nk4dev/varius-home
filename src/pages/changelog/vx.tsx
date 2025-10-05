import React, { useEffect, useState } from 'react';
import HeadMeta from "@/components/headermeta";
import Link from "next/link";
import Layout from "@/layout/main";
import dynamic from 'next/dynamic';

const DiffViewer = dynamic(() => import('@/components/diffViewer'), { ssr: false });

export default function VX({ version, github, github_dev, diffText, prevMaster, prevDev }: { version: any, github: any, github_dev: any, diffText: string, prevMaster?: string | null, prevDev?: string | null }) {
    // state and helpers
    const [clientDiff, setClientDiff] = useState<string | null>(diffText ?? null);
    const [base, setBase] = useState<string>(prevMaster ?? (github?.sha ?? ''));
    const [head, setHead] = useState<string>((github_dev && github_dev.sha) ? github_dev.sha : (github?.sha ?? ''));
    const [loading, setLoading] = useState(false);

    async function fetchCompare(b: string, h: string) {
        setLoading(true);
            try {
                const res = await fetch(`/api/compare?base=${encodeURIComponent(b)}&head=${encodeURIComponent(h)}`);
            if (!res.ok) {
                const text = await res.text();
                setClientDiff(`Failed to fetch diff: ${res.status}\n${text}`);
            } else {
                const text = await res.text();
                setClientDiff(text);
            }
        } catch (e: any) {
            setClientDiff(`Error: ${e.message || String(e)}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if ((!diffText || diffText.length === 0) && github && github_dev) {
            fetchCompare(github.sha, github_dev.sha);
        }
    }, [diffText, github, github_dev]);

    return (
        <Layout>
            <div className="p-4 bg-theme text-theme max-w-6xl mx-auto w-full min-h-screen">
                <HeadMeta pageTitle="VX - Changelog" pageDescription="Changelog for VARIUS" />
                <h1 className="text-2xl font-bold">VX Changelog</h1>
                <h3 className="text-lg">Global Ver. : {version.version}</h3>
                <div className="overflow-x-scroll xl:overflow-x-hidden px-2 py-5">
                    latest commit (master):
                    <Link href={github.html_url}>
                        {github.sha}
                    </Link>
                    <div className="text-sm text-gray-500">previous: {prevMaster ?? '—'}</div>
                </div>
                <div>
                    <div className="mt-4">
                        master
                        <DiffViewer diffText={clientDiff ?? ''} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ }) {
    const version = await fetch("https://api.varius.technology/version").then(res => res.json());
    const headers = { Authorization: `Bearer ${process.env.GITHUB_SECRET}` };
    const github = await fetch("https://api.github.com/repos/nk4dev/vx/commits/master", { headers }).then(res => res.json()) as any;

    const prevMaster = (github && github.parents && github.parents[0] && github.parents[0].sha) ? github.parents[0].sha : null;

    // fetch unified diff between prevMaster -> master if prevMaster exists
    let diffText = '';
    if (prevMaster) {
        const compareUrl = `https://api.github.com/repos/nk4dev/vx/compare/${encodeURIComponent(prevMaster)}...${encodeURIComponent(github.sha)}`;
        const diffRes = await fetch(compareUrl, { headers: { ...headers, Accept: 'application/vnd.github.v3.diff' } });
        diffText = await diffRes.text();
    }

    return {
        props: {
            version,
            github,
            diffText,
            prevMaster,
        }
    };
}