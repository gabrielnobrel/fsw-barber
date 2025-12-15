"use client"

import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "./booking-summary"

interface BookingItemProps {
  // innerJoin
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  const handleCancelBooking = async () => {
    try {
      deleteBooking(booking.id)
      setIsSheetOpen(false)

      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      console.error(error)

      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full min-w-[90%]">
          <Card className="min-w-[90%] p-3">
            <CardContent className="flex justify-between p-0">
              {/* Esquerda */}
              <div className="flex flex-col gap-2 pl-5">
                <Badge
                  className="w-fit rounded-full"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>

                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </div>

              {/* Direita */}
              <div className="flex flex-col items-center justify-center border-l-2 px-5">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-[90%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>

            <div className="relative mt-6 flex h-[180px] w-full items-end">
              <Image
                src={"/map.png"}
                fill
                className="rounded-xl object-cover"
                alt={`mapa da barbearia ${barbershop.name}`}
              />

              <Card className="z-50 mx-5 mb-3 w-full rounded-xl p-0">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h3 className="font-bold">{barbershop.name}</h3>
                    <p className="text-xs">{barbershop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
            </div>

            <div className="mt-6">
              <BookingSummary
                barbershop={barbershop}
                service={booking.service}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem key={`${phone}-${index}`} phone={phone} />
              ))}
            </div>

            <SheetFooter className="mt-6">
              <div className="flex gap-3">
                <SheetClose asChild>
                  <Button variant={"outline"} className="flex-1">
                    Voltar
                  </Button>
                </SheetClose>

                {isConfirmed && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"destructive"} className="flex-1">
                        Cancelar Reserva
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[75%]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja cancelar esse agendamento?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-row justify-center">
                        <AlertDialogCancel className="flex-1">
                          Voltar
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant={"destructive"}
                            className="flex-1"
                            onClick={handleCancelBooking}
                          >
                            Confirmar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
