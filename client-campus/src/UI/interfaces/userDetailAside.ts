import type { Role } from "../../BR/domain/entities/role.interface";
import type { User } from "../../BR/domain/entities/user.interface";

export interface userDetailAside{
    selected: User
    items: Role[]
}