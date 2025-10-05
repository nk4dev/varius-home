import Layout from "@/layout/main";

export default function Privacy() {
    const teamname = "VARIUS";

    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p>This is the privacy policy for {teamname}. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.</p>
                <h2 className="text-2xl font-bold mt-6 mb-2">Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, and any other information you provide when you contact us or use our services.</p>
                <h2 className="text-2xl font-bold mt-6 mb-2">How We Use Your Information</h2>
                <p>We use the information we collect to provide and improve our services, respond to your inquiries, and communicate with you about updates and promotions.</p>
                <h2 className="text-2xl font-bold mt-6 mb-2">Sharing Your Information</h2>
                <p>We do not sell, trade, or rent your personal information to others. We may share your information with trusted third-party service providers who assist us in operating our business, as long as they agree to keep your information confidential.</p>
                <h2 className="text-2xl font-bold mt-6 mb-2">Security</h2>
                <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.</p>
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2">Contact</h2>
                    <p>If you have any questions or concerns about this privacy policy, please contact us at <a href="mailto:nknighta@varius.technology">nknighta@varius.technology</a></p>
                </div>
            </div>
        </Layout>
    )
}