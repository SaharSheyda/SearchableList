import React, { useState, useEffect } from 'react';
import { data as initialData, flows, getProcessStateValue, getProcessStateClass, getPriorityValue } from './Data';

export default function Main() {
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [shenaseValue, setShenaseValue] = useState('');
  const [processValue, setProcessValue] = useState('');
  const [employeeValue, setEmployeeValue] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    // Extract unique employee names
    const uniqueEmployeeNames = [...new Set(initialData.map((item) => item.variables.relation_employee_name))];
    setEmployeeNames(uniqueEmployeeNames);
  }, []);

  const handleCheckboxChange = (processID) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    if (updatedCheckboxes.includes(processID)) {
      updatedCheckboxes.splice(updatedCheckboxes.indexOf(processID), 1);
    } else {
      updatedCheckboxes.push(processID);
    }
    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleSelectAllChange = (isChecked) => {
    const updatedCheckboxes = isChecked ? initialData.map(item => item.processID) : [];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleSubmit = () => {
    if (selectedCheckboxes.length === 0) {
      alert('شناسه فرآیندی انتخاب نشده است!');
    } else {
      alert('شناسه فرآیندهای منتخب: ' + selectedCheckboxes.join(', '));
    }
  };

  const handleReset = () => {
    setShenaseValue('');
    setProcessValue('');
    setEmployeeValue('');
    setSelectedCheckboxes([]);
    setFilteredData(initialData); // Reset filtered data to the original data
  };

  const handleSearch = () => {
    // Filtering data based on input values
    const newFilteredData = initialData.filter((process) => {
      const shenaseMatch = shenaseValue ? process.processID.includes(shenaseValue) : true;
      const processMatch = processValue ? process.key === processValue : true;
      const employeeMatch = employeeValue ? process.variables.relation_employee_name === employeeValue : true;

      return shenaseMatch && processMatch && employeeMatch;
    });

    // Update state with filtered data
    setFilteredData(newFilteredData);
  };

  return (
    <div className="main-list">
      <div className="title">
        <span>گزارش فرآیندها</span>
      </div>
      <form action="" method="">
        <fieldset>
          <div className=" column column-1">
            <label htmlFor="shenase">شناسه فرآیند:</label>
            <br />
            <input
              type="text"
              id="shenase"
              className="id"
              value={shenaseValue}
              onChange={(e) => setShenaseValue(e.target.value)}
            />
          </div>
          <div className="column column-2">
            <label htmlFor="processName">نام فرآیند:</label>
            <br />
            <select
              id="processSelect"
              value={processValue}
              onChange={(e) => setProcessValue(e.target.value)}
            >
              <option value=""></option>
              {flows.map((flow) => (
                <option key={flow.value} value={flow.value}>
                  {flow.label}
                </option>
              ))}
            </select>
          </div>
          <div className="column column-3">
            <label htmlFor="relation_employee_name">شخص مسئول:</label>
            <br />
            <select
              id="employeeSelect"
              value={employeeValue}
              onChange={(e) => setEmployeeValue(e.target.value)}
            >
              <option value=""></option>
              {employeeNames.map((name) => (
                name && (
                  <option key={name} value={name}>
                    {name}
                  </option>
                )
              ))}
            </select>
          </div>
          <div className="buttons-row">
            <div className="recovery-btn">
              <input type="button" value="بازنشانی" onClick={handleReset} />
            </div>
            <div className="search-btn">
              <input type="button" value="جستجو" onClick={handleSearch} />
            </div>
          </div>
        </fieldset>
      </form>
      <table border="1px solid gray" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <label htmlFor="checkboxAll">
                <input
                  type="checkbox"
                  id="checkboxAll"
                  checked={selectedCheckboxes.length === initialData.length}
                  onChange={(e) => handleSelectAllChange(e.target.checked)}
                />
              </label>
            </th>
            <th>شناسه فرآیند</th>
            <th>نام فرآیند</th>
            <th>موقعیت جاری</th>
            <th>شخص مسئول</th>
            <th>مشتری/متقاضی</th>
            <th>زمان شروع فرآیند</th>
            <th>زمان پایان فرآیند</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((process) => (
            <tr key={process.processID}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-item"
                  checked={selectedCheckboxes.includes(process.processID)}
                  onChange={() => handleCheckboxChange(process.processID)}
                />
              </td>
              <td className="dodgerblue-txt">
                <a href={`View.html?processID=${process.processID}`}>
                  {process.processID}
                </a>
              </td>
              <td>{process.flowName}</td>
              <td>{process.currentTaskName || '_'}</td>
              <td className="dodgerblue-txt">
                {process.variables.relation_employee_name || '_'}
              </td>
              <td>{process.variables.relation_name || '_'}</td>
              <td>{process.processStartTime || '_'}</td>
              <td>{process.processEndTime || '_'}</td>
              <td className="two-states">
                <div
                  className={`state ${getProcessStateClass(
                    process.processState.key
                  )}`}
                >
                  <span>{getProcessStateValue(process.processState.key)}</span>
                </div>
                <div className="priority">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getPriorityValue(
                        process.variables.relation_priority
                      ),
                    }}
                  ></span>
                </div>
              </td>
              <td>
                <div className="more">
                  <span className="icon-ellipsis-v"></span>
                  <div className="opt">
                    <ul>
                      <li>
                        <a href={`View.html?processID=${process.processID}`}>
                          مشاهده
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} id="submitButton">
        ثبت
      </button>
    </div>
  );
}
