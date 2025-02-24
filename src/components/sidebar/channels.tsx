import {
    List,
    ListItemText,
    Box,
    Typography,
    ListItem,
} from "@mui/material"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"

const Channels = () => {
    const [availableChannels, setAvailableChannels] = useState<Array<any>>([])
    // const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

    useEffect(() => {
        const q = query(collection(db, 'channels'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const channels: Array<any> = []
            querySnapshot.forEach((doc) => {
                channels.push({ id: doc.id, ...doc.data() })
            })
            setAvailableChannels(channels)
        })
        return () => unsubscribe()
    }, [])
    return (
        <Box sx={{ pt: '64px', width: 250, bgcolor: 'background.paper', p: 2 }}>
            <Typography variant='h6' sx={{ mt: 8, mb: 2}}>Channels</Typography>
            <List>
                {availableChannels.map((channel) => (
                    <Box key={channel.id}>
                        <ListItem>
                            <ListItemText primary={channel.name} />
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    )
}

export { Channels }