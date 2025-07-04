    import {React, useState, useEffect} from 'react'
  import axios from "axios";
    import Header from "../Reusable.jsx/Header";
    import CardContainer from "../JobSeeker/CardContainer";
    import Footer from "../Reusable.jsx/Footer";
    import SearchJob from "../JobSeeker/SearchJob";

    const JobSeekerDashboard = () => {

      const [fetchedJobs, setfetchedJobs] = useState([])
      const [filterJobs, setfilterJobs] = useState([])
      useEffect(() => {
        const job = async () => {
          try {
            const res = await axios.get("http://localhost:3000/job/fetch");
            setfetchedJobs(res.data);
            setfilterJobs(res.data);
          } catch (error) {
            console.log(error.message, "Error fetching jobs");
          }
        };
      
        job()
      }, [])
      

      const handleSearch = (searchTerm) => {
      const filtered = fetchedJobs.filter((job)=>{
        return(
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())

        )
      })
      setfilterJobs(filtered);
    }


      return (
        <div>
          <Header />
          <SearchJob onSearch={handleSearch} />
          <CardContainer jobs={filterJobs} />
          <Footer />
        </div>
      );
    }

    export default JobSeekerDashboard