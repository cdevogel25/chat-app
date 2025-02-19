import { auth, db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'

const updateUserStatus = async (status: true | false) => {
    const user = auth.currentUser
    if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
            online: status,
            lastSeen: new Date()
        })
    }
}

export { updateUserStatus }