import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const server = await fetch('https://api.varius.technology/version');
        
        if (!server.ok) {
            return res.status(server.status).json({ 
                error: `External API returned status ${server.status}` 
            });
        }
        
        const data: { version: string } = await server.json();
        return res.status(200).json({ version: data.version });
    } catch (error) {
        console.error('Error fetching version:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch version information',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}