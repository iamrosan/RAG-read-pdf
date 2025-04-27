import Chat from "@/components/Chat/Chat";
import Dropzone from "@/components/Dropzone/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col h-[80vh] gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row items-center gap-8">
        <Dropzone />
        {/* Vertical Line */}
        <div className="w-[2px] h-[60vh] bg-gray-300" />
        <Chat />
      </div>
    </div>
  );
}
