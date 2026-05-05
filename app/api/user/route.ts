// app/api/users/route.ts
// This file defines API routes for postman or for external use. 
// It is not used for internal API calls within the app. 
// For internal API calls, use the functions defined in the DAL (Data Access Layer) directly.

import { getUserById, createUser } from "@/lib/dal/userDAL";
import { toUserDTO } from "@/dto/userDTO";

export async function GET(id: string) {
    const user = await getUserById(id);

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(toUserDTO(user));
}

export async function POST(req: Request) {
    const body = await req.json();

    const user = await createUser(body);

    return Response.json(toUserDTO(user));
}