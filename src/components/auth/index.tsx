import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { updateUserStatus } from './status'

import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    Alert
} from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password)
                updateUserStatus(true)
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user

                await updateProfile(user, { displayName })

                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName,
                    email: user.email,
                    online: true,
                    lastSeen: new Date()
                })
            }
        } catch (error) {
            setError('Error during registration. Please try again.')
            console.error('Error:', error)
        }
    }

    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component='h1' variant='h5'>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3, width: '100%'}}>
                    {!isLogin && (
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='displayName'
                            label='Display Name'
                            name='displayName'
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    )}
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Alert severity='error' sx={{ mt: 2}}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                    <Link
                        component='button'
                        variant='body2'
                        onClick={() => setIsLogin(!isLogin)}
                        sx={{ textAlign: 'center', display: 'block'}}
                    >
                        {isLogin ? 'Create new account' : 'Back to login'}
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Auth