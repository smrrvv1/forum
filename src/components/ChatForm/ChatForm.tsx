import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { axiosApi } from '../../axiosApi';

export const ChatForm = () => {
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        await axiosApi.post('/messages.json', { author, message, likes: 0 })
        setAuthor('')
        setMessage('')
    }

    return (
        <Box 
        component="form" 
        onSubmit={sendMessage} 
        sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4 }}>
            <TextField 
            label="Author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} required />
            <TextField 
            label="Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} required />
            <Button type="submit" variant="contained">Send</Button>
        </Box>
    )
}