import {io} from 'socket.io-client';
import { VITE_SOCKET_URL } from './api';

const socket  = io(
    VITE_SOCKET_URL,
    {
        withCredentials:true
    }
)

export default socket;