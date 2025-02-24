import {
    Box,
    Drawer,
    Container
} from '@mui/material'
import Sidebar from '../sidebar'
import MessageBox from "./messageBox";
import NewMessageInput from "./newMessageInput";
import TopBar from "./topBar";
import { Channels } from '../sidebar/channels'

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
                <Container maxWidth='lg'>
                    <MessageBox />
                    <Box position='sticky' sx={{ p: 2, zIndex: (theme) => theme.zIndex.drawer, bottom: 0}}>
                        <NewMessageInput />
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
                    <Channels />
                </Drawer>
            </Box>
        </Box>
  
    );
}

export default Chat