import {
    Box,
    Drawer,
    Container,
    ListItem,
    ListItemText,
    IconButton,
    List,
    Typography
} from '@mui/material'
import { UserSidebar } from '../sidebar/userSidebar'
import MessageBox from "./messageBox";
import NewMessageInput from "./newMessageInput";
import TopBar from "./topBar"
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import EastIcon from '@mui/icons-material/East';

interface Channel {
    id: string;
    name: string;
}

const Chat = () => {
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>('Pj6cg5UuddluF0YbCjvs')
    const [availableChannels, setAvailableChannels] = useState<Array<Channel>>([])

    const handleSelectChannel = (channelName: string) => {
        setSelectedChannelId(availableChannels.find((channel) => channel.name === channelName)?.id || '')
    }

    useEffect(() => {
        const q = query(collection(db, 'channels'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const channels: Array<Channel> = []
            querySnapshot.forEach((doc) => {
                channels.push({ id: doc.id, name: doc.data().Name })
            })
            setAvailableChannels(channels)
        })
        return () => unsubscribe()
    }, [])


    return (
        <Box sx={{ display: 'flex' , flexDirection: 'column', height: '100vh'}}>
            <TopBar />
            <Box position='relative' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
                <Drawer
                    variant='permanent'
                    sx={{
                    pt: 2,
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box'
                    }
                }}>
                    <UserSidebar />
                </Drawer>
                <Container maxWidth='lg'>
                    <MessageBox channel={selectedChannelId} />
                    <Box position='sticky' sx={{ pb: 2, zIndex: (theme) => theme.zIndex.drawer, bottom: 0}}>
                        <NewMessageInput channel={selectedChannelId} />
                    </Box>
                </Container>
                <Drawer
                    variant='permanent'
                    anchor='right'
                    sx={{
                        pt: 2,
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box'
                        }
                    }}>
                    {/* <Channels channel={handleSelectChannel} /> */}
                    <Box sx={{ pt: '64px', width: 250, bgcolor: 'background.paper', p: 2 }}>
                        <Typography variant='h6' sx={{ mt: 8, mb: 2}}>Channels</Typography>
                        <List>
                            {availableChannels.map((channel) => (
                                <ListItem
                                    key={channel.id}
                                >
                                    <ListItemText primary={channel.name} />
                                    <IconButton color='inherit'>
                                        <EastIcon onClick={() => handleSelectChannel(channel.name)}/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
  
    );
}

export default Chat