import Button from "../components/Button";
import InputField from "../components/InputField";

const Salary = ({ handleChange }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='mb-4'>
        <Button onClickHandler={handleChange} value='' title='Hourly' />
        <Button onClickHandler={handleChange} value='Monthly' title='Monthly' />
        <Button onClickHandler={handleChange} value='Yearly' title='Yearly' />
      </div>

      <div>
        <label className='sidebar-label-container'>
          <input
            type='radio'
            name='test'
            id='test2'
            value=''
            onChange={handleChange}
          />
          <span className='checkmark'></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value={30}
          title='< 30000K'
          name='test'
        />
        <InputField
          handleChange={handleChange}
          value={50}
          title='< 50000K'
          name='test'
        />
        <InputField
          handleChange={handleChange}
          value={80}
          title='< 80000K'
          name='test'
        />
        <InputField
          handleChange={handleChange}
          value={100}
          title='< 100000K'
          name='test'
        />
      </div>
    </div>
  );
};

export default Salary;
