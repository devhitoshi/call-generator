import React, { useRef, useContext } from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';
import Layout from './components/Layout';
import { SongContext } from './contexts/SongContext';

function App() {
  const printRef = useRef(null);
  const { exportAsImage, groupName, setGroupName } = useContext(SongContext);

  return (
    <Layout>
      <h1>Idol Call Chart Maker</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="グループ名"
        style={{ margin: '20px 0', padding: '10px', width: '300px' }}
      />
      <div ref={printRef}>
        <h2>{groupName}</h2>
        <CallTable />
      </div>
      <ActionButtons onExportClick={() => exportAsImage(printRef)} />
    </Layout>
  );
}

export default App;
