"use client";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ClaimButtonProps {
  type: "burn" | "stake" | "direct" | "team";
  disabled?: boolean;
  height?: string;
}

export function ClaimButton({ type, disabled, height }: ClaimButtonProps) {
  const t = useTranslations("finance");
  const router = useRouter();

  // 乐观更新
  const claimMutation = api.finance.claimRewards.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to claim rewards:", error);
      toast.error(error.message);
    },
  });

  const handleClaim = async () => {
    claimMutation.mutate({
      earning_type: type,
    });
  };

  return (
    <button
      onClick={handleClaim}
      disabled={claimMutation.isPending || disabled}
      className="text-[#02E2E2] text-sm px-2 py-1 rounded bg-white/10 hover:bg-[#ffffff20] transition-colors disabled:opacity-50 flex items-center"
      style={height ? { height } : undefined}
    >
      {claimMutation.isPending ? t("claiming") : t("claim")}
    </button>
  );
}
