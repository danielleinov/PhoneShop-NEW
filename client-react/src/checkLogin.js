import { useState } from 'react';

export default function CheckUser() {
    const getUser = () => {
        const userConnected = localStorage.getItem('user');
        const userdata = JSON.parse(userConnected);
        return userdata?.user
    };

    const [user, setUser] = useState(getUser());

    const saveUser = userdata => {
        localStorage.setItem('user', JSON.stringify(userdata));
        setUser(userdata.user);
    };

    return {
        setUser: saveUser(),
        user
    }
}