const Jobs = ({ result }) => {
  return (
    <>
      <h3 className='text-lg font-bold'>{result.length} Jobs</h3>
      <section> {result}</section>
    </>
  );
};

export default Jobs;
