import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { DatePicker } from "@/components/ui/date-picker";

export function UserScheduleForm() {
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
              {Array.from({ length: 3 }, (_, index) => (
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

          <DatePicker />
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="text-xl font-bold">Total</span>
          <span>33,90</span>
        </div>

        <Button type="submit" className="w-full py-6 font-bold">
          Adicionar novo agendamento
        </Button>
      </form>
    </>
  );
}
