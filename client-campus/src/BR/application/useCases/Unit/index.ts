import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { CreateUnitUseCase } from "./createUnit.useCase";
import { DeleteUnitUseCase } from "./deleteUnit.useCase";
import { GetUnitByIdUseCase } from "./getUnitById.useCase";
import { GetUnitsUseCase } from "./getUnit.useCase";
import { UpdateUnitUseCase } from "./updateUnit.useCase";

let cachedUnitUseCases: {
  createUnit: CreateUnitUseCase;
  deleteUnit: DeleteUnitUseCase;
  getUnitById: GetUnitByIdUseCase;
  getUnits: GetUnitsUseCase;
  updateUnit: UpdateUnitUseCase;
} | null = null;

export const getUnitUseCases = () => {
  if (!cachedUnitUseCases) {
    const repository = repositoryFactory.getUnitRepository();
    cachedUnitUseCases = {
      createUnit: new CreateUnitUseCase(repository),
      deleteUnit: new DeleteUnitUseCase(repository),
      getUnitById: new GetUnitByIdUseCase(repository),
      getUnits: new GetUnitsUseCase(repository),
      updateUnit: new UpdateUnitUseCase(repository),
    };
  }

  return cachedUnitUseCases;
};
