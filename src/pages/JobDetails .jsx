// JobDetails.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };
  return (
    <div className='bg-gray-100 min-h-screen py-8'>
      <div className='container mx-auto p-4 bg-white shadow-lg rounded-lg'>
        <img
          src={job.companyLogo}
          alt='Company Logo'
          className='w-16 h-16 object-contain mb-4'
        />
        <h1 className='text-3xl font-bold mb-4'>{job.jobTitle}</h1>
        <p className='text-gray-700 mb-4 w-1/2'>{job.description}</p>
        <p className='text-sm text-gray-600'>
          <strong>Company:</strong> {job.companyName}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Location:</strong> {job.jobLocation}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Employment Type:</strong> {job.employmentType}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Salary:</strong> {job.minPrice} - {job.maxPrice}{" "}
          {job.salaryType}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Experience Level:</strong> {job.experienceLevel}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Skills:</strong>{" "}
          {job.skills && job.skills.map((skill) => skill.label).join(", ")}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Posted By:</strong> {job.postedBy}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Posting Date:</strong> {job.postingDate}
        </p>

        <button
          onClick={handleApply}
          className='py-2 px-5 border rounded bg-purple-800 mt-5 text-white'
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
