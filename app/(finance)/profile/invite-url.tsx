import { CopyButton } from "@/components/copy-button";
import QRCodeModal from "@/components/qr-code-modal";

export default function InviteUrl({ invite_code }: { invite_code: string }) {
  const url = `${process.env.WEB_SITE_APP_URL}?code=${invite_code}`;

  return (
    <>
      <span className="text-sm truncate w-32">{url}</span>
      <div className="flex items-center gap-2">
        <CopyButton text={url} />
        <QRCodeModal code={invite_code} url={url} />
      </div>
    </>
  );
}
