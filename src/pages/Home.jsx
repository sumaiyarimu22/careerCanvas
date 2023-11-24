import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data));
    setIsLoading(false);
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

  //---------calculate the index range
  const calculatePageRang = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
    }

    //slice the data base on current page
    const { startIndex, endIndex } = calculatePageRang();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className=''>
      <Banner handleInputChange={handleInputChange} query={query} />

      {/* MAIN CONTENT */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* JOB CARDS */}
        <div className='col-span-2 bg-white p-4 rounded'>
          {isLoading ? (
            <p>Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className='text-lg font-bold'>{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}

          {/* pagination here */}
          {result.length > 0 ? (
            <div className='flex justify-center mt-4 space-x-8'>
              <button
                onClick={prevPage}
                className='hover:underline'
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className='mx-2'>
                page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemPerPage)
                }
                className='hover:underline'
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* right side */}
        <div className='bg-white p-4 rounded'>Right</div>
      </div>
    </div>
  );
};

export default Home;
