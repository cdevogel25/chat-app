import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const Sidebar = () => {
    const [onlineUsers, setOnlineUsers] = useState<Array<any>>([])

    useEffect(() => {
        const q = query(collection(db, 'users'), where('online', '==', true))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users: Array<any> = []
            querySnapshot.forEach((doc) => {
                users.push({id: doc.id, ...doc.data()})
            })
            setOnlineUsers(users)
        })
        return () => unsubscribe()
    }, [])

    return (
        <Box sx={{ width: 250, bgcolor: 'background.paper', p: 2 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Online Users</Typography>
            <List>
                {onlineUsers.map((user) => (
                    <Box key={user.id}>
                        <ListItem>
                            <ListItemText primary={user.displayName} />
                        </ListItem>
                    </Box>
            ))}
            </List>
        </Box>
    )
}

export default Sidebar