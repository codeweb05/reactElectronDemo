
import { useState, useCallback } from 'react';
import readXlsxFile from 'read-excel-file';
import { FileUpload, ToggleSwitch, Graph } from './components';
function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setData] = useState([]);

  const switchTheme = async () => {
    const isDark = await window.electron.toggle()
    setIsDarkMode(isDark);
  }

  const fileHandler = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        readXlsxFile(acceptedFiles[0]).then((rows) => {
          setData(rows);
        })
      }
    },
    [],
  )

  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-end align-items-center mb-4">
        <div className="col-sm-3 d-flex justify-content-end align-items-center">
          <ToggleSwitch onClick={switchTheme} isDarkMode={isDarkMode} />
        </div>
      </div>
      <FileUpload fileHandler={fileHandler} />
      {data.length ? <Graph bgColor={isDarkMode ? "#222" : "#ccc"} data={data} /> : null}
    </div>
  )
}

export default App
