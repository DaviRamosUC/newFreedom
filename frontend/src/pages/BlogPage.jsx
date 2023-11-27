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

const BlogPage = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('userToken');

  const handleGetAllCourses = async () => {
    await axios.get('http://localhost/blog/posts', {
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
            Blog
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            Últimas postagens
          </Typography>
          <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {courses.length > 0 && courses.map(
              ({ id, title, subtitle, imageUrl='./public/img/postThumb.png', members = projectsData.members }, ) => (
                <Card key={id} color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                  >
                    <img
                      src={'./public/img/postThumb.png'}
                      alt={title}
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
                      {title}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {subtitle}
                    </Typography>
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link to={`/blog/${id}`}>
                      <Button variant="outlined" size="sm">
                        Ver curso
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

export default BlogPage;
