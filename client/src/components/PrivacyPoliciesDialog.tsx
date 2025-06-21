import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrivacyPoliciesDialogProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
  className: string;
}

export function PrivacyPoliciesDialog({
  children,
  asChild = false,
  className,
}: PrivacyPoliciesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="z-100000 max-h-100 overflow-auto">
        <DialogHeader>
          <DialogTitle>
            Termo de Consentimento para Coleta e Uso de Dados Pessoais
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <h2 className="text-md my-4 font-bold">
            1. Coleta de Dados Pessoais
          </h2>
          <p>
            Ao criar uma conta em nosso site, solicitamos as seguintes
            informações pessoais:
          </p>
          <ul className="ml-2">
            <li>Nome;</li>
            <li>E-mail;</li>
            <li>Telefone.</li>
          </ul>

          <h2 className="text-md my-4 font-bold">2. Finalidade da Coleta</h2>
          <p>
            Os dados coletados serão utilizados exclusivamente para os seguintes
            fins:
          </p>
          <ul className="ml-2">
            <li>Confirmação e gestão do agendamento;</li>
            <li>
              Contato para fornecer informações ou alterações relativas ao
              agendamento;
            </li>
            <li>
              Envio de comunicações importantes relacionadas aos nossos
              serviços.
            </li>
          </ul>

          <h2 className="text-md my-4 font-bold">
            3. Armazenamento e Segurança dos Dados
          </h2>
          <p>
            Seus dados serão armazenados em nossos sistemas de forma segura e
            protegida contra acessos não autorizados. Utilizamos medidas
            técnicas e administrativas adequadas para proteger suas informações.
          </p>

          <h2 className="text-md my-4 font-bold">
            4. Compartilhamento de Dados
          </h2>
          <p>
            Seus dados pessoais não serão compartilhados com terceiros, exceto
            quando necessário para o cumprimento de obrigações legais ou
            regulamentares, ou com seu consentimento expresso.
          </p>

          <h2 className="text-md my-4 font-bold">
            5. Direitos do Titular dos Dados
          </h2>
          <p>
            Você possui os seguintes direitos em relação aos seus dados
            pessoais:
          </p>
          <ul className="ml-2">
            <li>Acessar seus dados;</li>
            <li>Alterar dados incompletos, inexatos ou desatualizados;</li>
            <li>Excluir sua conta de forma permanente do nosso registro.</li>
          </ul>

          <h2 className="text-md my-4 font-bold">6. Consentimento</h2>
          <p>
            Ao fornecer suas informações pessoais para realizar um agendamento
            em nosso site, você concorda com a coleta, uso e armazenamento dos
            dados conforme descrito neste termo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
