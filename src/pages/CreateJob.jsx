import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    console.log(data);
    fetch("http://localhost:3000/post-job", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert("Job Posted Successfully !!");
        }
        reset();
      });
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node js", label: "Node js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      {/* form */}

      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* first row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input
                type='text'
                defaultValue={"web Devloper"}
                {...register("jobTitle")}
                className='create-job-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Name</label>
              <input
                type='text'
                placeholder='Ex: Microsoft'
                {...register("companyName")}
                className='create-job-input'
              />
            </div>
          </div>

          {/* 2nd row */}

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Mininum Salary</label>
              <input
                type='text'
                placeholder='$20k'
                {...register("minPrice")}
                className='create-job-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input
                type='text'
                placeholder='$120k'
                {...register("maxPrice")}
                className='create-job-input'
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Salary Type</label>
              <select {...register("salaryType")} className='create-job-input'>
                <option value=''>Choose your salary</option>
                <option value='Hourly'>Hourly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Locations</label>
              <input
                type='text'
                placeholder='Ex: New York'
                {...register("jobLocation")}
                className='create-job-input'
              />
            </div>
          </div>

          {/* 4th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Posting Date</label>
              <input
                type='date'
                placeholder='Ex: 2023-10-28'
                {...register("postingDate")}
                className='create-job-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Expreience Level</label>
              <select
                {...register("experienceLevel")}
                className='create-job-input'
              >
                <option value=''>Choose your experience</option>
                <option value='Internship'>Internship</option>
                <option value='Work remotely'>Work remotely</option>
                <option value='Any experience'>Any experience</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className='block mb-2 text-lg'>Required Skill Sets</label>
            <CreatableSelect
              className='create-job-input '
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company logo</label>
              <input
                type='url'
                placeholder='Past your company logo url: https://weshare.com/img1'
                {...register("companyLogo")}
                className='create-job-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select
                {...register("employmentType")}
                className='create-job-input'
              >
                <option value=''>Choose your employment Type</option>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Temporary'>Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className='w-full'>
            <label className='block mb-2 text-lg'>Job Description</label>
            <textarea
              {...register("description")}
              className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
              rows={6}
              placeholder='Job Description'
            />
          </div>

          {/* last row */}
          <div className='w-full'>
            <label className='block mb-2 text-lg'>Job Posted By</label>
            <input
              type='email'
              placeholder='your email'
              {...register("postedBy")}
              className='create-job-input'
            />
          </div>
          <input
            type='submit'
            className='my-5 py-2 px-5 border rounded bg-primary text-white'
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
