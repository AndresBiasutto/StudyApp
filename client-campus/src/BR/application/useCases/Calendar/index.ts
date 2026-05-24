import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { CreateCalendarEntryUseCase } from "./createCalendarEntry.useCase";
import { DeleteCalendarEntryUseCase } from "./deleteCalendarEntry.useCase";
import { GetCalendarEntriesUseCase } from "./getCalendarEntries.useCase";
import { GetCalendarEntryByIdUseCase } from "./getCalendarEntryById.useCase";
import { UpdateCalendarEntryUseCase } from "./updateCalendarEntry.useCase";

let cachedCalendarUseCases: {
  createCalendarEntry: CreateCalendarEntryUseCase;
  deleteCalendarEntry: DeleteCalendarEntryUseCase;
  getCalendarEntries: GetCalendarEntriesUseCase;
  getCalendarEntryById: GetCalendarEntryByIdUseCase;
  updateCalendarEntry: UpdateCalendarEntryUseCase;
} | null = null;

export const getCalendarUseCases = () => {
  if (!cachedCalendarUseCases) {
    const repository = repositoryFactory.getCalendarRepository();
    cachedCalendarUseCases = {
      createCalendarEntry: new CreateCalendarEntryUseCase(repository),
      deleteCalendarEntry: new DeleteCalendarEntryUseCase(repository),
      getCalendarEntries: new GetCalendarEntriesUseCase(repository),
      getCalendarEntryById: new GetCalendarEntryByIdUseCase(repository),
      updateCalendarEntry: new UpdateCalendarEntryUseCase(repository),
    };
  }

  return cachedCalendarUseCases;
};
