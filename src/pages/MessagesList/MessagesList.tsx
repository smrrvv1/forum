import {useEffect} from 'react';
import type {ApiMessage, IMessageFull} from '../../types';
import {axiosApi} from '../../axiosApi';
import styles from './styles.module.css'
import { useChatStore } from '../../chatStore'; 
import { ChatForm } from '../../components/ChatForm/ChatForm';
import { Button, Card, CardContent, Typography } from '@mui/material';

export const MessagesList = () => {
    const {messages, setMessages} = useChatStore();

    const getMessages = async () => {
        try {
            const response = await axiosApi.get<ApiMessage>('/messages.json')
            if (response.data) {
                const list: IMessageFull[] = Object.keys(response.data).map(key => ({
                    ...response.data[key],
                    id: key
                }))
                setMessages(list)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const addLike = async (id: string, msg: IMessageFull) => {
        await axiosApi.put(`/messages/${id}.json`, { ...msg, likes: (msg.likes || 0) + 1  })
        await getMessages()
    }

    useEffect(() => {
        getMessages()
        const interval = setInterval(getMessages, 30000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.container}>
            <ChatForm />
            {messages.map(m => (
                <Card key={m.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{m.author}</Typography>
                        <Typography>{m.message}</Typography>
                        <Button onClick={() => addLike(m.id, m)}>Like: {m.likes || 0}</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}