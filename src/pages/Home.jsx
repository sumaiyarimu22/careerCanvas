import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );

  //----------Radio filtering-----------
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  //------------button based filtering
  const handleClick = (e) => {
    selectedCategory(e.target.value);
  };

  //main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //filtering input item
    if (query) {
      filteredJobs = filteredItems;
    }
    //catagory filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
          employmentType.toLocaleLowerCase() === selected.toLocaleLowerCase()
      );
      console.log(filteredJobs);
    }
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className=''>
      <Banner handleInputChange={handleInputChange} query={query} />

      {/* MAIN CONTENT */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>Left</div>
        {/* JOB CARDS */}
        <div className='col-span-2 bg-white p-4 rounded'>
          <Jobs result={result} />
        </div>
        {/* right side */}
        <div className='bg-white p-4 rounded'>Right</div>
      </div>
    </div>
  );
};

export default Home;
