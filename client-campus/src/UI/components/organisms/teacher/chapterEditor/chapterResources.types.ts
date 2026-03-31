export interface ResourceItem {
  id: string;
  value: string;
}

export const createResourceItem = (): ResourceItem => ({
  id: crypto.randomUUID(),
  value: "",
});
