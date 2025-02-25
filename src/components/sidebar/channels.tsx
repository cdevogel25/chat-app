import {
    List,
    Box,
    Typography,
    ListItem,
    Button
} from "@mui/material"
import React from "react"
import EastIcon from '@mui/icons-material/East'

interface Channel {
    id: string;
    name: string;
}

interface ChannelsProps {
    channels: Channel[];
    handleSelectChannel: (channelName: string) => void;
}

const Channels: React.FC<ChannelsProps> = ({ channels, handleSelectChannel }) => {
    
    return (
        <Box sx={{ pt: '64px', width: 250, bgcolor: 'background.paper', p:2 }}>
            <Typography variant='h6' sx={{ mt: 8 }}>Channels</Typography>
            <List>
                {channels.map((channel) => (
                    <ListItem key={channel.id}>
                        <Button
                            variant='contained'
                            color='inherit'
                            fullWidth
                            endIcon={<EastIcon />}
                            onClick={() => handleSelectChannel(channel.name)}
                        >{channel.name}</Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export { Channels }