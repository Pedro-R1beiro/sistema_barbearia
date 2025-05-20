import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function UserSchedulingForm() {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <form className="space-y-7 border-b-2 border-b-black pb-8 lg:max-w-2xl lg:flex-1 lg:border-b-0">
        <h1 className="text-center text-xl font-bold sm:text-2xl">
          Adicionar um novo agendamento
        </h1>
        <div>
          <h3 className="text-lg font-bold">Selecione um barbeiro</h3>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar barbeiro" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Barbeiros</SelectLabel>
                <SelectItem value="1">José Alfredo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-lg font-bold">Selecione serviços</h3>
          <Card>
            <CardContent className="max-h-50 space-y-4 overflow-auto">
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between"
                >
                  <label
                    htmlFor={index.toString()}
                    className="flex w-full items-center justify-between leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span>Barba</span>
                    <span>R$ 12,90</span>
                    <Checkbox id={index.toString()} />
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-bold">Selecione uma data</h3>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full px-3 text-left font-normal"
              >
                {date ? (
                  <span>{format(date, "PPP", { locale: ptBR })}</span>
                ) : (
                  <span>Escolha uma data</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setDate(date)}
                disabled={(date) => date < new Date()}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="text-center">
          <p>
            Selecione uma data para ver os <br /> horários disponíveis.
          </p>
        </div>

        <Button type="submit" className="w-full py-6 font-bold">
          Adicionar novo agendamento
        </Button>
      </form>
    </>
  );
}
