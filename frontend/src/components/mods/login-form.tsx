import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fetch } from "@/Fetch"
import { useState } from "react"
import { toast } from "sonner"
import Loader from "../ui/loader"

interface ErrorProps {
  response?: {
    data: {
      message: string
    }
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [phone, setPhone] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async () =>{
    try {
      setLoading(true)
        await Fetch.post("/user/create", {
            phone: phone,
            code,
        });
        toast.success("Muvofiqiyatli yuborildi");
    } catch (error) {
      const err = error as ErrorProps;
        toast.error(err.response?.data.message || "Xatolik yuz berdi");
    }finally{
      setLoading(false)
    }
}
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-xl">Title</CardTitle>
          <CardDescription>
            Telefon raqamingiz va kodni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 ***********"
                  required
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">Code</Label>
                  <Input
                  id="code"
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  placeholder="*****"
                  required
                />
                </div>
              </div>
                <Button onClick={handleSubmit} className="w-full">
                 {
                  loading ? <Loader/> :"Yuborish"
                 } 
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
