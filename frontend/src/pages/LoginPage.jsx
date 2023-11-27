import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            await toast.promise(axios.post('http://localhost/auth/login', {
                email: email,
                senha: password
            }).then((response)=>{
                const {token, user} = response.data;
                localStorage.setItem('userToken', token);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userId', user.id);
                navigate('/dashboard')
            }), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                pending: 'Aguarde o login',
                success: 'Logado 👌',
                error: 'Erro ao autenticar suas credenciais 🤯'
            });
        } catch (error) {
            console.error('Falha no login:', error.response);
        }
    };

    return (
        <div>
            <div className="flex h-screen ">
                <div className="w-full max-w-xs m-auto p-5">
                    <h1 className="text-center font-sans text-5xl">Seja bem vinda</h1>
                    <p className="text-gray-600 my-6 text-center">
                        Realize o login em sua conta, ou cadastre-se gratuitamente
                    </p>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="flex justify-between gap-2">
                            <button type="button" className=" w-full p-2 bg-gray-50 rounded mb-2 hover:bg-primary hover:text-white">Google</button>
                            <button type="button" className=" w-full p-2 bg-gray-50 rounded mb-2 hover:bg-primary hover:text-white">Facebook</button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-grey-light rounded"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-grey-darker text-sm font-bold mb-2">Senha</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-grey-light rounded"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="remember" className="font-medium text-gray-900">
                                            Lembrar-me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <a href="#" className="text-xs">Recuperar senha</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full p-2 bg-primary text-white rounded">Entrar</button>
                        </div>
                    </form>

                    <footer className="text-center mt-4">
                        <p onClick={()=> navigate('/register')} className="text-xs">Não tem uma conta? <a href="#" className="text-blue-500">Cadastrar!</a></p>
                    </footer>
                </div>
                <div className="md:block md:w-1/2 bg-[url('../../public/bussinessWomanLoginPage.jpg')] bg-cover bg-right bg-no-repeat"></div>
            </div>
        </div>
    );
};

export default LoginPage;
