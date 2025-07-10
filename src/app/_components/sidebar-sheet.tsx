import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import Image from "next/image"

const SidebarSheet = () => {
  return (
    <SheetContent className="p overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid px-8 py-5">
        <Avatar>
          <AvatarImage
            src={
              "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </Avatar>

        <div>
          <p className="font-bold">Gabriel Nobre</p>
          <p className="text-xs">gabriel_nobresantos@hotmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid p-8">
        <SheetClose>
          <Button
            className="w-full justify-start gap-2"
            variant={"ghost"}
            asChild
          >
            <Link href={"/"}>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant={"ghost"}>
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid p-8">
        {quickSearchOptions.map((option, index) => (
          <Button
            key={`${option}-${index}`}
            className="justify-start gap-2"
            variant={"ghost"}
          >
            <Image
              src={option.imageUrl}
              height={18}
              width={18}
              alt={option.title}
            />
            Início
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-8">
        <Button className="justify-start gap-2" variant={"ghost"}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
