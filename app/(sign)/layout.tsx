import LanguageSelector from "@/components/settings/LanguageSelector";
interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <div className="min-h-screen text-white px-6 py-12 flex flex-col relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
      
      {/* Logo Section */}
      <div className="flex items-center justify-end mb-8 relative z-10">
        <LanguageSelector showText={false} />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        {children}
      </div>
    </div>
  )
}

