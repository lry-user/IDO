export interface idoItemType {
  completeTime: string;
  count: number;
  createTime: string;
  dateValue: string;
  endTime: string;
  id: string;
  initCount: number;
  nodeType: "1" | "2" | "3";
  pieCurrent: number;
  pieTotal: number;
  realCount: number;
  saleAmount: number;
  saleCount: number;
  saleSetCount: number;
  startTime: string;
  status: string;
  statusDesc: string;
}
export interface buyRecodItemType {
  buyCoinAmount: number;
  buyCoinKey: string;
  buyCount: number;
  buyNodeType: "1" | "2" | "3";
  buyNodeTypeDesc: string;
  createTime: string;
  id: string;
  userId: string;
}
export interface teamInfoType {
  n1Count: number;
  n2Count: number;
  n3Count: number;
}
