import React from "react";
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { PageTitle } from "../widgets/layout";
import { SidebarWithSearch } from "../components/Dashboard/Sidebar";

const ContactPage = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <SidebarWithSearch />
      <div className="flex-grow">
        <section className=" bg-white py-24 h-full px-4">
          <div className="container mx-auto">
            <PageTitle section="Entre em contato conosco" heading="Quer trabalhar conosco?">
              Preencha este formulário e entraremos em contato com você em 24 horas.
            </PageTitle>
            <form className="mx-auto w-full mt-12 lg:w-5/12">
              <div className="mb-8 flex gap-8">
                <Input variant="outlined" size="lg" label="Nome Completo" />
                <Input variant="outlined" size="lg" label="Endereço de email" />
              </div>
              <Textarea variant="outlined" size="lg" label="Mensagem" rows={8} />
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    Eu concordo com
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;os termos e condições
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button variant="gradient" size="lg" className="mt-8" fullWidth>
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
