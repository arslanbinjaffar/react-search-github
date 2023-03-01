import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { useGithubContext } from './../context/context';
const Dashboard = () => {
  const {loading}=useGithubContext();
  if(loading){
    return <main>
      <Navbar/>
      <img src={loadingImage} alt="loading" className='loading-img'/>
    </main>
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search/>
      <Info/>
      <User/>
      <Repos/>
    </main>
  );
};

export default Dashboard;
