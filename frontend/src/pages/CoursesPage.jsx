import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { SidebarWithSearch } from "../components/Dashboard/Sidebar";
import { projectsData } from '../data'
import { useEffect, useState } from "react";
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('userToken');

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  const handleGetAllCourses = async () => {
    await axios.get('http://localhost/courses/getAllCourses', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setCourses([...response.data])
      console.log([...response.data])
    })
  }

  useEffect(() => {
    handleGetAllCourses();
  }, []);

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
            Cursos disponiveis
          </Typography>
          <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {courses.length > 0 && courses.map(
              ({ id, titulo, descricao, urlMedia, members=projectsData.members }) => (
                <Card key={id} color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${youtube_parser(urlMedia)}/maxresdefault.jpg`}
                      alt={titulo}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Financeiro
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mt-1 mb-2"
                    >
                      {titulo}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {descricao}
                    </Typography>
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    {
                      urlMedia &&
                      <Link to={urlMedia}>
                        <Button variant="outlined" size="sm">
                          Ver curso
                        </Button>
                      </Link>
                    }
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
