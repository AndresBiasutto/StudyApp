import type { Subject } from "../../domain/entities/subject.interface";
import type { LiItemViewModel } from "../viewModels/liItem.viewModel";

export const subjectToLiItem = (subject: Subject): LiItemViewModel => ({
  id: subject.id_subject,
  image: subject.imageUrl,
  name: subject.name,
  description: subject.description ?? "-",
});
