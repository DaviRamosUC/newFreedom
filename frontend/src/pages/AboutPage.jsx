import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { SidebarWithSearch } from "../components/Dashboard/Sidebar";

const AboutPage = () => {
  return (
    <>
      <div className="flex h-full bg-gray-white">
        <SidebarWithSearch />
        <div className="flex-grow">
          <div className="relative flex h-max content-center items-center justify-center pt-16 pb-32">
            <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
            <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
            <div className="max-w-8xl container relative mx-auto">
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto w-full px-4 text-center">
                  <Typography
                    variant="h1"
                    color="white"
                    className="mb-6 font-black"
                  >
                    Sua historia começa conosco.
                  </Typography>
                  <Typography variant="lead" color="white" className="opacity-80">
                    A maior startup de educação financeira voltada para mulheres no país,
                    com mais de 30 profissionais reconhecidos na área, 15 redes parceiras
                    e com maior feedback positivo e resultado do mercado.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <section className="-mt-32 bg-white px-4 h-max pt-4">
            <div className="container mx-auto">
              <div className="mt-32 flex flex-wrap items-center">
                <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                    <FingerPrintIcon className="h-8 w-8 text-white " />
                  </div>
                  <Typography
                    variant="h3"
                    className="mb-3 font-bold"
                    color="blue-gray"
                  >
                    Trabalhar conosco é um prazer
                  </Typography>
                  <Typography className="mb-8 font-normal text-blue-gray-500">
                    Fazemos o que fazemos por amor, temos a maior motivação que existe
                    para transformar vidas de mulheres em todo o país.
                    <br />
                    <br />
                    Acreditamos que cada mulher tem seu papel no mundo dos négocios, nossa tarefa é guiá-las até os seus.
                  </Typography>
                  <Button variant="filled">Saiba mais</Button>
                </div>
                <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                  <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                    <CardHeader floated={false} className="relative h-56">
                      <img
                        alt="Card Image"
                        src="/img/teamwork.png"
                        className="h-full w-full"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography variant="small" color="blue-gray" className="font-normal">Escritório</Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-3 mt-2 font-bold"
                      >
                        Conheça a nossa sede
                      </Typography>
                      <Typography className="font-normal text-blue-gray-500">
                        A Freedom está presentem no mercado nacional desde 2023,
                        com mais de 25 consultorias por semana e 160 clientes mensais
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  );
};

export default AboutPage;
