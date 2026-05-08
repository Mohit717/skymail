import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;

    // Prevent directory traversal attacks
    if (filename.includes('..') || filename.includes('/')) {
        return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    try {
        const filePath = path.join(process.cwd(), 'attachments', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Read the file
        const fileBuffer = fs.readFileSync(filePath);

        // Return with proper headers for download
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Type': 'application/octet-stream',
                'Content-Length': fileBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('Error downloading attachment:', error);
        return NextResponse.json({ error: 'Error downloading file' }, { status: 500 });
    }
}