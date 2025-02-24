import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, IconButton, Tooltip, Toolbar, Typography } from '@mui/material'
import { updateUserStatus } from '../auth/status'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const TopBar = () => {

    const handleLogout = async () => {
        try {
            await updateUserStatus(false)
            await(signOut(auth))
            console.log('User logged out')
            window.location.href = '/'
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }
    
    return (
        <AppBar position='sticky' component='nav' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%'}}>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Chat App
                </Typography>
                <Tooltip title='Log Out' arrow>
                    <IconButton color='inherit'>
                        <LogoutIcon onClick={handleLogout} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar