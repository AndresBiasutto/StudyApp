import type { Unit } from "../../domain/entities/unit.interface";
import type { UnitRepository } from "../../domain/services/unit.repository";
import { httpClient } from "../services/httpClient";

export class UnitApiRepository implements UnitRepository {
  async getAll(): Promise<Unit[]> {
    const { data } = await httpClient.get<Unit[]>("/units");
    return data;
  }

  async getById(id: string): Promise<Unit> {
    const { data } = await httpClient.get<Unit>(`/units/${id}`);
    return data;
  }

  async create(unit: Partial<Unit>): Promise<Unit> {
    const { data } = await httpClient.post<Unit>("/units", unit);
    return data;
  }

  async update(id: string, unit: Partial<Unit>): Promise<Unit> {
    const { data } = await httpClient.put<Unit>(`/units/${id}`, unit);
    return data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/units/${id}`);
  }
}
