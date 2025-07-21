import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

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
        <h2 className="text-xl font-bold">Olá, Gabriel!</h2>
        <p>Quarta-feira, 02 de Julho</p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant={"secondary"}>
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
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
        <BookingItem />

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
    </>
  )
}

export default Home
