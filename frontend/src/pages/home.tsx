import { LoginForm } from "@/components/mods/login-form"

export const Home = () => {
  return (
        <div className="flex h-[90vh] items-center justify-center bg-background">
            <LoginForm className="w-full max-w-md" />
       </div>
  )
}
