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
// es6 rule object key :value same only write once
// name:name instead this only write name
    return <GithubContext.Provider
    // value object key value same 
    value={{githubUser,githubFollowers,githubRepos}}
    >{children}</GithubContext.Provider>
}
export const useGithubContext=()=>{
    return useContext(GithubContext)
}

