import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface BarbershoppItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershoppItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl px-1 pt-1 pb-3">
      <CardContent className="p-0">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge
            className="absolute top-2 left-2 rounded-full"
            variant={"secondary"}
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="space-x-1 text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>

          <Button className="mt-3 w-full" variant={"secondary"}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
