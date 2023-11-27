import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cpfMask = value => {
        return value
          .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
          .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const handleCpfChange = value => {
        setCPF(cpfMask(value.target.value))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            await toast.promise(axios.post('http://localhost/auth/create-user', {
                nome,
                sobrenome,
                cpf,
                email,
                senha: password
            }).then((response)=>{
                const token = response.data.token;
                localStorage.setItem('userToken', token);
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
                pending: 'Aguarde enquanto te cadastramos 🤞',
                success: 'Registrada com maestria 🦄',
                error: 'Erro ao cadastrar suas informações 🤯'
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
                            <label htmlFor="first-name" className="block text-grey-darker text-sm font-bold mb-2">Nome</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-grey-light rounded"
                                id="first-name"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="last-name" className="block text-grey-darker text-sm font-bold mb-2">Sobrenome</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-grey-light rounded"
                                id="last-name"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cpf" className="block text-grey-darker text-sm font-bold mb-2">CPF</label>
                            <input
                                type="text"
                                maxLength={14}
                                
                                className="w-full p-2 border border-grey-light rounded"
                                id="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
                            />
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
                        <p onClick={()=> navigate('/login')} className="text-xs">Já tem uma conta? <a href="#" className="text-blue-500">Realize o login!</a></p>
                    </footer>
                </div>
                <div className="md:block md:w-1/2 bg-[url('../../public/bussinessWomanRegisterPage.jpg')] bg-cover bg-center bg-no-repeat"></div>
            </div>
        </div>
    );
};

export default LoginPage;
