import type { User } from "../../domain/entities/user.interface";
import type { UserDetail } from "../viewModels/userDetail.viewModel";

export const userDetail = (user: User): UserDetail => ({
  id: user.id_user,
  image: user.image ?? undefined,
  name: user.name,
  last_name: user.last_name,
  description: user.Role?.name,
  role: user.Role?.name,
  e_mail: user.e_mail ?? "",
  contact_number: user.contact_number ?? undefined,
  subjects: user.subjects,
});
