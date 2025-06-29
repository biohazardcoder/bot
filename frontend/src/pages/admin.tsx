import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { Fetch } from "@/Fetch"
import { useState } from "react"
import useSWR from "swr"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const fetcher = (url: string) => Fetch.get(url).then(res => res.data)
interface CodeProps{
  code:string
used:boolean
user:string
_id:string
createdAt:string
}

interface UserProps{
  code:string
  phone:string
  _id:string
  createdAt:string
}

export const Admin = () => {
  const UserData = useSWR("/user", fetcher)
  const CodeData = useSWR("/code", fetcher)
  const [toggle, setToggle] = useState(true)
  const [used, setUsed] = useState(true)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  if (UserData.error || CodeData.error) {
    return <h1 className="text-center text-destructive">Xatolik yuz berdi</h1>
  }
  if (UserData.isLoading || CodeData.isLoading) {
    return <h1 className="w-full h-[90vh] flex items-center justify-center"><Loader /></h1>
  }
  
  const usedCodes = CodeData.data.filter((item: CodeProps) => item.used === true);
  const unusedCodes = CodeData.data.filter((item: CodeProps) => item.used === false);

  const visibleCodes = used ? usedCodes : unusedCodes;

  const handleCreateCodes = async () => {
      try {
        setLoading(true)
        await Fetch.post(`/code/${value}`)
        toast.success("Kodlar muvaffaqiyatli yaratildi")
        CodeData.mutate()
        UserData.mutate()
      } catch (error) {
        toast.error("Kodlarni yaratishda xatolik")
        console.log(error);
        
      }finally{
        setLoading(false)
      }
  }
   const handleDeleteCodes = async () => {
      try {
        setLoading(true)
        await Fetch.delete(`/code/clear`)
        CodeData.mutate()
        UserData.mutate()
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
  }

     const handleDeleteUsers = async () => {
      try {
        setLoading(true)
        await Fetch.delete(`/user/clear`)
        CodeData.mutate()
        UserData.mutate()
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
  }
const handleDownloadJsonData = async () => {
  try {
    setLoading(true);

    const response = await fetch(`https://bot-fvvc.onrender.com/api/user/download`, {
      method: "GET",
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${Date.now()}.json`; 
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Yuklab olishda xatolik:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4">
      <div className="flex justify-end gap-2">
        <Button variant={toggle ? "default" : "secondary"} onClick={()=>setToggle(true)} >Codes</Button>
        <Button variant={toggle ? "secondary" : "default"} onClick={()=>setToggle(false)}>Users</Button>
      </div>
      <div className="mt-2">
        {toggle ? (
          <div>
             <div className="flex items-center justify-between">
              <div className="flex gap-2">
               <Button variant={used ? "default" : "secondary"} onClick={()=>setUsed(true)} >Used</Button>
               <Button variant={used ? "secondary" : "default"} onClick={()=>setUsed(false)}>Unused</Button>
             </div>
              <div className="flex items-center gap-2">
                <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Create</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yangi kodlar yaratish</DialogTitle>
                    <DialogDescription>Bu yerga kerakli miqdorni kiriting</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 py-2">
                    <Input type="number" value={value} placeholder="Miqdorni kiriting" onChange={(e)=>setValue(e.target.value)}/>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateCodes}>{loading ? (<Loader/>) : "Yuborish"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kodlarni tozalash</DialogTitle>
                    <DialogDescription>Tozalangan kodlarni qaytarib bo'lmaydi</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={handleDeleteCodes}>{loading ? (<Loader/>) : "Tozalash"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
            </div>            

            {visibleCodes.reverse().map(({ code, _id, createdAt, used, user }: CodeProps) => (
              <div key={_id} className="border p-2 my-2 rounded-md shadow-sm bg-accent">
                <h1 className="flex items-center justify-between text-xl"><p>{used ? (user) : (code)}</p> <span className={`w-4 h-4 rounded-full ${used ? "bg-green-500" :"bg-destructive"}`}></span></h1>
                {used ? (<p className="font-semibold">{code}</p>) : ""}
                <p className="text-sm text-muted-foreground">{createdAt.slice(0,10)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
             <div className="flex items-center gap-2">
              <Button onClick={handleDownloadJsonData} disabled={loading}>
                {loading ? (<Loader />) : "Yuklab olish"}
              </Button>              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Raqamlarni tozalash</DialogTitle>
                    <DialogDescription>Tozalangan raqamlarni qaytarib bo'lmaydi</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={handleDeleteUsers} disabled={loading}>{loading ? (<Loader/>) : "Tozalash"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
            {UserData.data.reverse().map(({ code, _id, createdAt, phone }: UserProps) => (
              <div key={_id} className="border p-2 my-2 rounded-md shadow-sm bg-accent">
                <p>{phone}</p>
                <p>{code}</p>
                <p>{createdAt.slice(0,10)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
   
    </div>
  )
}
