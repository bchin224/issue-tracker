import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body)

    console.log('Testing:', validation)

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });
        console.log('Fail:', validation)

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newIssue, { status: 201 });
}