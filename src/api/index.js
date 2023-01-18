import axios from "axios";


// const API = axios.create({baseUrl:"https://picosh-server.onrender.com"})

// API.interceptors.request.use((req)=>{
// if(localStorage.getItem('profile')){
//     req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`
// }
// return req
// })

export const fetchPosts = () => axios.get('https://picosh-server.onrender.com/posts');
export const createPost = (newPost) => axios.post('https://picosh-server.onrender.com/posts', newPost);
export const updatePost = (id , updatedPost) => axios.patch(`https://picosh-server.onrender.com/posts/${id}`, updatedPost);
export const likePost = (id ) => axios.patch(`https://picosh-server.onrender.com/posts/${id}/likePost`);
export const commentPost = (id ) => axios.patch(`https://picosh-server.onrender.com/posts/${id}/comments`);
export const deletePost = (id ) => axios.delete(`https://picosh-server.onrender.com/posts/${id}`);


export const singIn = (formData)=> axios.post('https://picosh-server.onrender.com/user/singin' , formData)
export const singUp = (formData)=> axios.post('https://picosh-server.onrender.com/user/singup' , formData)
export const updateUser = (email , updatedUser) => axios.patch(`https://picosh-server.onrender.com/user/${email}`, updatedUser);
export const fetchUsers = () => axios.get('https://picosh-server.onrender.com/user');
export const followUser = (id ) => axios.patch(`https://picosh-server.onrender.com/user/${id}/follow`);
