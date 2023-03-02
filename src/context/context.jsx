import { useState, useEffect, createContext, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
export const GithubContext=createContext()

export const GithubProvider=({children})=>{
    const [githubUser,setGithubUser]=useState(mockUser)
    const [githubRepos,setGithubRepos]=useState(mockRepos)
    const [githubFollowers,setGithubFollowers]=useState(mockFollowers)
    //requests
    const [request,setRequest]=useState(0)
    const [loading,setLoading]=useState(false)
    const [errors,setError]=useState({show:false,msg:""})
    const searchUser=async(user)=>{
        toggleError()
        setLoading(true)
        try {
            const response=await axios.get(`${rootUrl}/users/${user}`)
            const data=await response.data;
                setGithubUser(data);
                if(!data){
                    toggleError(true,"please enter correct username")
                }
                setLoading(false) 
                // Repos
                const {login,followers_url}=data;
                // https://api.github.com/users/john-smilga/repos?per_page=100
                let reposURl=await axios(`${rootUrl}/users/${login}/repos?per_page=100`)
                // .then((response)=>response)
                // setGithubRepos(response.data)    
                // // - [Followers](https://api.github.com/users/john-smilga/followers) 
                let followerUrl=await axios(`${followers_url}?per_pages=100`).then((response)=>response)
                // setGithubFollowers(response.data)
                await Promise.allSettled([reposURl,followerUrl]).then((response)=>{
                    const [repos,followers]=response;
                    const status='fulfilled'
                    if(repos.status===status){
                        setGithubRepos(repos.value.data)
                    }
                    if(repos.status===status){
                        setGithubFollowers(followers.value.data)
                    }
                })

        } catch (error) {
          
         setLoading(false)
        }
        checkRequests();
        setLoading(false)
    }
    useEffect(() => {
        searchUser()
    },[])
    



    const checkRequests=()=>{
        try {
            axios.get(`${rootUrl}/rate_limit`).then(({data})=>{
                let {
               rate:{remaining}
                }=data
                setRequest(remaining)
                if(remaining==0){
                    throw('you complete your requests')
                    toggleError(true,"no search you can")
                }
            })
           
        } catch (error) {
            console.log(error)
        }
    }
    const toggleError=(show=false,msg=" ")=>{
        setError({show,msg})
    }
    useEffect(checkRequests,[])
// es6 rule object key :value same only write once
// name:name instead this only write name
    return <GithubContext.Provider
    // value object key value same 
    value={{githubUser,githubFollowers,githubRepos,request,errors,searchUser,loading,toggleError}}
    >{children}</GithubContext.Provider>
}
export const useGithubContext=()=>{
    return useContext(GithubContext)
}

