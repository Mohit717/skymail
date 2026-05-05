import { UserType } from "@/types/user";

// dto/userDTO.ts
export function toUserDTO(user: UserType) {
    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // password removed intentionally
    };
}