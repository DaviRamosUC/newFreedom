import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { SidebarWithSearch } from "../components/Dashboard/Sidebar";
import { projectsData } from '../data'

const CoursesPage = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <SidebarWithSearch />
      <div className="flex-grow">
        <div className="px-4 pb-4">
          <Typography variant="h2" color="blue-gray" className="mb-2 mt-5">
            Cursos
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            Architects design houses
          </Typography>
          <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {projectsData.map(
              ({ img, title, description, tag, route, members }) => (
                <Card key={title} color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                  >
                    <img
                      src={img}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {tag}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mt-1 mb-2"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link to={route}>
                      <Button variant="outlined" size="sm">
                        view project
                      </Button>
                    </Link>
                    <div>
                      {members.map(({ img, name }, key) => (
                        <Tooltip key={name} content={name}>
                          <Avatar
                            src={img}
                            alt={name}
                            size="xs"
                            variant="circular"
                            className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                              }`}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
