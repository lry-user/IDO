"use client";

import "./index.css";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { teamInfoType, buyRecodItemType, idoItemType } from "@/types/ido";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { formatToUserTimezone } from "@/utils/time";
import { useRouter } from "next/navigation";

type IdoContentProps = {
  teamInfo: teamInfoType;
};
const nodeTypeMap = {
  DIAMOND_NODE: "钻石节点",
  PLATINUM_NODE: "铂金节点",
  SUPER_NODE: "超级节点",
};
const nodeTypeNumberMap = {
  "2": "钻石节点",
  "1": "铂金节点",
  "3": "超级节点",
};

const IdoContent = ({ teamInfo }: IdoContentProps) => {
  const t = useTranslations("finance");
  const router = useRouter();
  const queryIDOInfoRef = useRef<() => Promise<void> | null>(null);
  const queryBuyRecordRef = useRef<() => Promise<void> | null>(null);
  const [nodeType, setNodeType] = useState<
    "PLATINUM_NODE" | "DIAMOND_NODE" | "SUPER_NODE"
  >("PLATINUM_NODE");
  const [hasBuy, setHasBuy] = useState<boolean>(false);
  const [buying, setBuying] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<idoItemType>();
  const [activatedNode, setActivatedNode] = useState<idoItemType>();
  const [nodeList, setNodeList] = useState<idoItemType[]>([]);
  const [buyRecordList, setBuyRecordList] = useState<buyRecodItemType[]>([]);
  const [buyCount, setBuyCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [localDate, setLocalDate] = useState("");

  const handleNodeTypeChange = (
    newNodeType: "PLATINUM_NODE" | "DIAMOND_NODE" | "SUPER_NODE"
  ) => {
    if (buyNodeMutation.isPending) return;
    setNodeType(newNodeType);
  };

  const handleBuy = async () => {
    if (buying || !selectedNode) return;
    setIsOpen(true);
  };

  // 获取购买记录
  const getBuyRecordMutation = api.ido.queryMyBuyRecord.useMutation({
    onSuccess: (data) => {
      console.log("getBuyRecordMutation", data);
      if (!data) return;
      setBuyRecordList(data);
      setIsOpen(false);
      setBuyCount(1);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const queryMyBuyRecord = useCallback(async () => {
    console.log("queryMyBuyRecord");
    getBuyRecordMutation.mutate();
  }, [getBuyRecordMutation]);
  // 获取节点信息
  const getNodeInfoMutation = api.ido.queryIDOInfo.useMutation({
    onSuccess: (data) => {
      // setSelectedNode(data[0]);
      console.log("getNodeInfoMutation", data);
      if (!data) return;
      setNodeList(data);

      const localDate = formatToUserTimezone(
        new Date().toISOString(),
        "YYYY-MM-DD"
      );
      setLocalDate(localDate);
      console.log(localDate);
      const firstActiveItem = data.find((item) => item.dateValue === localDate);
      if (firstActiveItem) {
        firstActiveItem.startTime = localDate;
      }
      setSelectedNode(firstActiveItem);
      setActivatedNode(firstActiveItem);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || t("stake_form.error"));
    },
  });

  const queryIDOInfo = useCallback(async () => {
    // 创建节点类型到 ID 的映射关系
    if (getNodeInfoMutation.isPending) return;
    const nodeTypeMap = {
      PLATINUM_NODE: "1",
      DIAMOND_NODE: "2",
      DEFAULT: "3",
    };
    // 获取对应的节点 ID，默认为 3
    const nodeTypeId = nodeTypeMap[nodeType as keyof typeof nodeTypeMap] || "3";
    const res = getNodeInfoMutation.mutate(nodeTypeId);
    console.log("queryIDOInfo", res);
  }, [nodeType, getNodeInfoMutation]);

  // 购买节点
  const buyNodeMutation = api.ido.buyNode.useMutation({
    onSuccess: (data) => {
      console.log("buyNodeMutation", data);
      setBuying(false);
      setHasBuy(true);
      queryIDOInfo();
      queryMyBuyRecord();
      toast.success(`购买${nodeTypeMap[nodeType]}成功`);
    },
    onError: (error) => {
      console.log(error);
      setBuying(false);
      queryIDOInfo();
      toast.error(error.message || t("stake_form.error"));
    },
  });

  const confirmBuy = async () => {
    if (buying || !selectedNode) return;
    setBuying(true);
    console.log("buyNode");
    console.log("selectedNode.id", selectedNode.id);
    console.log("timeStamp", Date.now());
    const res = buyNodeMutation.mutate({
      buyCount,
      nodeId: selectedNode?.id,
      timestamp: Date.now(),
    });

    console.log("confirmBuy", res);
  };

  const diffTime = (item: idoItemType) => {
    if (!item.completeTime || !item.startTime) return;
    const completeDate = new Date(item.completeTime);
    const startDate = new Date(item.startTime);
    const diffMs = completeDate.getTime() - startDate.getTime();

    if (diffMs < 0) return " 0 秒";
    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let result = "";
    if (days > 0) result += `${days}天`;
    if (hours > 0) result += `${hours}时`;
    if (minutes > 0) result += `${minutes}分`;
    if (seconds > 0) result += `${seconds}秒`;
    console.log(result);

    return result;
  };

  useEffect(() => {
    if (selectedNode) diffTime(selectedNode);
  }, [selectedNode]);

  useEffect(() => {
    queryIDOInfoRef.current = queryIDOInfo;
  }, [queryIDOInfo]);

  useEffect(() => {
    queryBuyRecordRef.current = queryMyBuyRecord;
  }, [queryMyBuyRecord]);

  useEffect(() => {
    console.log(nodeType);
    queryIDOInfoRef.current?.();
  }, [nodeType, queryIDOInfoRef]);

  useEffect(() => {
    queryBuyRecordRef.current?.();
  }, [queryBuyRecordRef]);

  return (
    <div id="ido" className="-mx-4 -mb-20">
      <div className="flex flex-col items-center mx-4 pb-28 ">
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            setBuyCount(1);
            setIsOpen(false);
          }}
        >
          <DialogOverlay className="dialog-overlay" />
          {/* 移除多余的 DialogTrigger 组件 */}
          <DialogContent className="dialog-content">
            <DialogTitle
              style={{
                display: "none",
              }}
            >
              确认购买数量
            </DialogTitle>
            {selectedNode && (
              <div className="text-center text-base font-medium">
                {nodeTypeNumberMap[selectedNode?.nodeType]}
              </div>
            )}
            <div className="flex flex-col items-center mt-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <span className="text-sm text-nowrap">购买数量： </span>
                  <div
                    className="h-6 w-6 flex items-center justify-center"
                    onClick={() => {
                      if (buyCount > 1) setBuyCount((prev) => prev - 1);
                    }}
                  >
                    <Image
                      src={"/icons/sub.svg"}
                      alt="sub"
                      className="h-6 w-6 translate-y-0.5"
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="text-sm text-[#59E5E2] font-bold mx-2">
                    {buyCount}
                  </span>
                  <div
                    className="h-6 w-6 flex items-center justify-center"
                    onClick={() => {
                      if (!selectedNode) return;
                      if (buyCount < selectedNode?.realCount) {
                        setBuyCount((prev) => prev + 1);
                      }
                    }}
                  >
                    <Image
                      src={"/icons/add.svg"}
                      alt="add"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
                <div className="text-sm text-white flex items-center justify-between w-full">
                  购买金额：
                  <span className="text-[#59E5E2] font-bold flex-1 text-center">
                    {buyCount * Number(selectedNode?.saleAmount)}Hi
                  </span>
                </div>
              </div>

              <div
                className="w-24 mt-6 h-8 rounded-full bg-[#59E5E2] text-xs font-bold text-black flex items-center justify-center"
                onClick={confirmBuy}
                style={{
                  opacity: buying ? 0.5 : 1,
                }}
              >
                {buying ? "购买中" : "确定"}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* btn */}
        <div className="mt-6 flex justify-center">
          <span className="gift-btn flex justify-center items-center rounded-lg">
            <Image src="/images/gift.png" alt="gift" width={20} height={20} />
            <span
              className="ml-0.5 text-white text-xs font-bold"
              onClick={() => router.push("/idoInfo")}
            >
              成为Hi节点拥有者
            </span>
          </span>
        </div>

        <div className="mt-3">
          {/* 铂金 钻石 超级 */}
          <div className="flex items-center justify-between border border-[#57515F] rounded-xl node-select">
            <div
              className={
                "node-type " + (nodeType === "PLATINUM_NODE" ? "active" : "")
              }
              onClick={() => handleNodeTypeChange("PLATINUM_NODE")}
            >
              铂金节点
            </div>
            <div
              className={
                "node-type " + (nodeType === "DIAMOND_NODE" ? "active" : "")
              }
              onClick={() => handleNodeTypeChange("DIAMOND_NODE")}
            >
              钻石节点
            </div>
            <div
              className={
                "node-type " + (nodeType === "SUPER_NODE" ? "active" : "")
              }
              onClick={() => handleNodeTypeChange("SUPER_NODE")}
            >
              超级节点
            </div>
          </div>
        </div>
        {/* 卡片 */}
        <div className="mt-2 border border-[#57515F] bg-[#18171C] rounded-[18px] py-4 px-5 w-full mx-4">
          <div className="text-white text-xs leading-3 text-left tracking-wider">
            Hi
            {nodeTypeMap[nodeType]}
            IDO
          </div>
          {nodeList?.length === 0 ? (
            <div className="h-14 mt-2 flex items-center justify-center text-white/50">
              暂无数据
            </div>
          ) : (
            <div
              className="grid grid-cols-5 gap-2 mt-2.5"
              style={{
                opacity: getNodeInfoMutation.isPending ? 0.5 : 1,
              }}
            >
              {nodeList?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-2 text-center rounded-lg aspect-square text-white/30 flex items-center justify-center text-nowrap text-sm leading-3.5 font-bold"
                  onClick={() => {
                    if (getNodeInfoMutation.isPending) return;
                    setSelectedNode(item);
                  }}
                  style={{
                    color:
                      selectedNode?.id === item?.id
                        ? "#001537"
                        : item?.completeTime ||
                          item?.status === "0" ||
                          item?.dateValue < localDate
                        ? "#59E5E2CC"
                        : "rgba(255, 255, 255, 0.3)",
                    backgroundColor:
                      selectedNode?.id === item?.id
                        ? "#59E5E2"
                        : item?.completeTime ||
                          item?.status === "0" ||
                          item.dateValue < localDate
                        ? "#59E5E24D"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  DAY {index + 1}
                </div>
              ))}
            </div>
          )}
          {!selectedNode?.completeTime
            ? selectedNode && (
                <div className="text-[#59E5E2] mt-3.5 text-sm text-center font-medium">
                  时间：{selectedNode?.startTime}开放
                </div>
              )
            : selectedNode && (
                <div className="text-[#F9952B] mt-3.5 text-sm text-center  font-medium">
                  完成啦！耗时{diffTime(selectedNode)}
                </div>
              )}
          <div className="mt-2.5 text-center">
            <span
              className={
                "buy-btn py-2 px-6 rounded-lg bg-[#59E5E2] text-black text-xs font-bold" +
                (hasBuy ? "buy-btn-ed" : "")
              }
              style={{
                opacity:
                  selectedNode?.status === "0" || selectedNode !== activatedNode
                    ? 0.5
                    : 1,
                cursor: "pointer",
              }}
              onClick={() => {
                if (
                  selectedNode?.completeTime ||
                  selectedNode?.status === "0" ||
                  selectedNode?.count === 0 ||
                  selectedNode !== activatedNode ||
                  (selectedNode?.dateValue &&
                    selectedNode?.dateValue < localDate)
                )
                  return;
                handleBuy();
                // setIsOpen(true);
              }}
            >
              {selectedNode?.status === "0" ||
              (selectedNode?.dateValue && selectedNode?.dateValue < localDate)
                ? "已售罄"
                : selectedNode === activatedNode
                ? "立即抢购"
                : "暂未开启"}
            </span>
          </div>
          {/* progress */}
          <div className="px-7 pt-3">
            <div className="ido-progress h-1 bg-white/15 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-[#59E5E2] absolute left-0 rounded-full duration-250"
                style={{
                  right: `${
                    selectedNode &&
                    selectedNode.pieTotal !== 0 &&
                    selectedNode?.dateValue === localDate
                      ? (1 - selectedNode.pieCurrent / selectedNode.pieTotal) *
                        100
                      : selectedNode?.dateValue &&
                        selectedNode?.dateValue < localDate
                      ? 0
                      : 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-white">
              <span>
                价格：
                <span className="text-[#59E5E2] font-semibold">
                  {selectedNode?.saleAmount}
                </span>
                Hi
              </span>
              <span>
                份数：
                <span className="text-[#59E5E2] font-semibold">
                  {selectedNode?.dateValue &&
                  selectedNode?.dateValue < localDate
                    ? 0
                    : selectedNode?.count}
                </span>
                份
              </span>
            </div>
          </div>
          <div className="text-white text-base text-center mt-2">
            {selectedNode?.dateValue && selectedNode?.dateValue < localDate
              ? selectedNode?.pieTotal.toLocaleString()
              : selectedNode?.pieCurrent.toLocaleString()}
            /{selectedNode?.pieTotal.toLocaleString()}Hi
          </div>
        </div>
        {/* 卡片 */}
        <div className="mt-4 border border-[#57515F] bg-[#18171C] rounded-[18px] py-4 px-5 w-full mx-4 ">
          <div className="text-white text-xs leading-4 text-left flex items-center">
            <span className="w-[2.5px] h-[9px] bg-[#59E5E2] mr-1"></span>
            铂金节点权益
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              1
            </span>
            价值500U的JU算力
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              2
            </span>
            HI生态收益分红
          </div>
          <div className="mt-5 text-white text-xs leading-4 text-left flex items-center">
            <span className="w-[2.5px] h-[9px] bg-[#59E5E2] mr-1"></span>
            钻石节点权益
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              1
            </span>
            价值1000U的JU算力
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              2
            </span>
            HI生态收益分红
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2.5 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              3
            </span>
            嗨起来提现手续费分红
          </div>
          <div className="mt-5 text-white text-xs leading-4 text-left flex items-center">
            <span className="w-[2.5px] h-[9px] bg-[#59E5E2] mr-1"></span>
            超级节点权益
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              1
            </span>
            价值5000U的JU算力
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              2
            </span>
            HI生态收益分红
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              3
            </span>
            HI DAO基金会分红
          </div>
          <div className="text-[#59E5E2] text-xs leading-4 mt-2.5 flex items-center">
            <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[#0B0B0B] bg-[#59E5E2] text-xs mr-2">
              4
            </span>
            嗨起来提现手续费分红
          </div>
        </div>
        {/* 战队 */}
        <div className="mt-7 w-full">
          <div className="text-xl font-bold leading-5 text-[#59E5E2] text-center">
            战队成员
          </div>
          {/* info */}
          <div className="border mt-3 border-[#57515F] rounded-xl pb-1.5 px-5.5 pt-4 bg-[#18171C] flex items-center justify-between">
            <div className="flex items-center flex-1 flex-col">
              <span className="text-white text-sm font-semibold leading-3.5">
                铂金节点
              </span>
              <span className="text-[#04FFA7] text-lg font-semibold mt-3">
                {teamInfo?.n1Count || 0}
              </span>
            </div>
            <div className="flex items-center flex-1 flex-col">
              <span className="text-white text-sm font-semibold leading-3.5">
                钻石节点
              </span>
              <span className="text-[#04FFA7] text-lg font-semibold mt-3">
                {teamInfo?.n2Count || 0}
              </span>
            </div>
            <div className="flex items-center flex-1 flex-col">
              <span className="text-white text-sm font-semibold leading-3.5">
                超级节点
              </span>
              <span className="text-[#04FFA7] text-lg font-semibold mt-3">
                {teamInfo?.n3Count || 0}
              </span>
            </div>
          </div>
        </div>
        {/* 记录 */}
        <div className="mt-4 bg-transparent border border-[#57515F] pt-3 px-4 rounded-xl w-full">
          <div className="text-[#59E5E2] text-lg leading-4.5 font-semibold text-center">
            购买记录
          </div>
          {/* table */}
          <div className="mt-3.5 w-4/5 mx-auto">
            <table className="w-full text-white  text-center ">
              <thead className="table-underline">
                <tr className="text-xs font-semibold text-nowrap">
                  <th className="p-2">购买时间</th>
                  <th className="p-2">节点类型</th>
                  <th className="p-2">购买数量</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[400px] overflow-y-auto">
              <table>
                {buyRecordList?.length === 0 ? (
                  <tbody>
                    <tr className="text-xs text-center text-white/50 py-10">
                      <td className="w-1/3 py-10"></td>
                      <td className="w-1/3 py-10">暂无购买记录</td>
                      <td className="w-1/3 py-10"></td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="text-xs text-center">
                    {buyRecordList?.map((item) => (
                      <tr key={item.id}>
                        <td className="p-2 w-1/3 ">{item.createTime}</td>
                        <td className="p-2 w-1/3 ">
                          {nodeTypeNumberMap[item.buyNodeType] || "未知节点"}
                        </td>
                        <td className="p-2 w-1/3 ">{item.buyCount}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IdoContent;
