import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany()
  const popularBabershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Quarta-feira, 02 de Julho</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/cabelo.svg"} alt="Cabelo" width={16} height={16} />
            Cabelo
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/barba.svg"} alt="Barba" width={16} height={16} />
            Barba
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/acabamento.svg"}
              alt="Acabamento"
              width={16}
              height={16}
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/cabelo.svg"} alt="Cabelo" width={16} height={16} />
            Pézinho
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/barba.svg"} alt="Barba" width={16} height={16} />
            Sobrancelha
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/acabamento.svg"}
              alt="Acabamento"
              width={16}
              height={16}
            />
            Acabamento
          </Button>
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="roundend-xl object-cover"
            alt="Agenda nos melhores cmo FSW Barber"
          />
        </div>

        {/* Agendamento */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card className="p-3">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 pl-5">
              <Badge className="w-fit rounded-full">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      "https://static.barato.com.br/_cps//2017/0608/cp/mv/oferta_14968992645027_est-05.jpg"
                    }
                  />
                </Avatar>

                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 px-5">
              <p className="text-sm">Julho</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBabershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer>
        <Card className="rounded-none">
          <CardContent>
            <p className="text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </>
  )
}

export default Home
