import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Textarea, IconButton
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';

import { firestore } from '../firebase/firebaseConfig'
import { collection, addDoc, getDoc, query, where, orderBy, doc } from "firebase/firestore";

export function CardDefault() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const currentUserID = localStorage.getItem('userId');

    // Gerar a chave do chat
    const chatId = `chat_${currentUserID}_chatGPT`;

    const getMessages = async () => {
        const loadedMessages = []
        const collectionMessage = doc(firestore, "chats", chatId);
        const docSnap = await getDoc(collectionMessage);
        if (docSnap.exists()) {
            console.log({...docSnap.data().message})
            loadedMessages.push({...docSnap.data().message});
        }

        setMessages(loadedMessages);
    };

    useEffect(() => {
        if (chatId) {
            getMessages();
        }
    }, [chatId]);

    const sendMessage = async (e) => {
        e.preventDefault();

        // Adicionar mensagem ao Firestore
        const querySnapshot = await addDoc(collection(firestore, "chats"));

        setInput('');
    };

    return (
        <div className="relative w-full h-full">
            <div className="absolute bottom-14 right-14">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Chat
                        </Typography>
                        <div className="my-5 rounded-md border border-gray-100 p-2">
                            {messages.length > 0 ?
                                messages.map((message, index) =>
                                    <div key={index}>
                                        <Typography key={`question_${index}`} variant="paragraph" color="blue-gray" className="mb-2">
                                            {message.question}
                                        </Typography>
                                        <Typography key={`response_${index}`} variant="paragraph" color="blue-gray" className="mb-2 text-end">
                                            {message.response}
                                        </Typography>
                                    </div>
                                )
                                : <Typography variant="paragraph" color="blue-gray" className="mb-2">
                                    Nenhuma mensagem
                                </Typography>
                            }
                        </div>
                        <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                            <div className="flex">
                                <IconButton variant="text" className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                        />
                                    </svg>
                                </IconButton>
                                <IconButton variant="text" className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                        />
                                    </svg>
                                </IconButton>
                            </div>
                            <Textarea
                                rows={1}
                                resize={false}
                                placeholder="Sua mensagem"
                                className="min-h-full !border-0 focus:border-transparent"
                                containerProps={{
                                    className: "grid h-full",
                                }}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <div>
                                <IconButton variant="text" onClick={sendMessage} className="rounded-full right-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                        />
                                    </svg>
                                </IconButton>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" color="purple" textGradient>
                            Desenvolvido por Freedom
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}