import type { User } from "../../domain/entities/user.interface";
import type { LiItemViewModel } from "../viewModels/liItem.viewModel";

export const userToLiItem = (user: User): LiItemViewModel => ({
  id: user.id_user,
  image: user.image ?? "",
  name: `${user.name} ${user.last_name}`,
  description: user.Role?.name,
});
