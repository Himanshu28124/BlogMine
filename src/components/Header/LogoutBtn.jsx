// import React from 'react'
// import { useDispatch } from 'react-redux'
// import authService from "../../appwrite/auth.js"
// import logout  from "../../store/authSlice.js"
// import { useNavigate } from 'react-router-dom'

// const LogoutBtn = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()
//     const logOutHandler = () => {
//         authService.logout().then(()=>{
//             dispatch(logout())              // to update the state
//         })
//         navigate('/login')
        
//     }
//   return (
//     <button className='inline-block px-6 py-2 duration-200 hover:bg=blue-100 rounded-full'
//     onClick={logOutHandler}
//     >
//         Logout
//     </button>
//   )
// }

// export default LogoutBtn


import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth.js"
import { logout } from "../../store/authSlice.js"      // ✅ named import
import { clearPost } from "../../store/postSlice.js"  // ✅ import clearPost action
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        authService.logout().then(() => {
            // Clear Redux states
            dispatch(logout());
            dispatch(clearPost());

            // Remove token if stored locally
            localStorage.removeItem("authToken");

            // Navigate after state updates
            navigate('/login');
        });
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logOutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
