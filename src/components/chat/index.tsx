import {
    Box,
    Drawer,
} from '@mui/material'
import Sidebar from '../sidebar'
import MessageBox from "./messageBox";
import NewMessageInput from "./newMessageInput";
import TopBar from "./topBar";

const Chat = () => {

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
                    <Sidebar />
                </Drawer>
                <MessageBox />
            </Box>
            <Box position='sticky' display='flex' flexDirection='column' sx={{ ml: 32, paddingBottom: 2 }}>
                <NewMessageInput />
            </Box>
        </Box>
  
    );
}

export default Chat