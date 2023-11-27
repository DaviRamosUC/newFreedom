import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white py-4 mx-10">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Freedom</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Cursos</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Artigos</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Contato</a></li>
          </ul>
        </nav>
        <button onClick={() => navigate("/login")} className="border-2 border-pink-500 text-pink-500 px-8 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-colors">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
