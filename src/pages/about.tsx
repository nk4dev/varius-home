import Layout from "@/layout/main";

export default function AboutPage() {
    return (
        <Layout>
            <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl">About VARIUS</h1>
                <p>VARIUS develops various software, centered around VX3, a Web3 developer tool and platform.</p>
                <div className="pt-8">
                    <h2 className="text-2xl">Members</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>nk4dev</strong> - Developer</li>
                    </ul>
                </div>
                <div className="pt-8">
                    <h2 className="text-2xl">Contact</h2>
                    <p>You can reach us via email at <a href="mailto:nknighta@varius.technology">nknighta@varius.technology</a></p>
                </div>
            </div>
        </Layout>
    )
}