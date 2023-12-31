import EmploymentType from "./EmploymentType";
import JobPostingData from "./JobPostingData";
import Location from "./Location";
import Salary from "./Salary";
import WorkExperience from "./WorkExperience";

const Sidebar = ({ handleChange }) => {
  return (
    <div className='space-y-5'>
      <h3 className=' text-lg font-bold mb-2'>Filters</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
      <JobPostingData handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
