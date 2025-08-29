import React, { useRef, useContext } from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';
import Layout from './components/Layout';
import { SongContext } from './contexts/SongContext';

function App() {
  const printRef = useRef(null);
  const { exportAsImage } = useContext(SongContext);

  return (
    <Layout>
      <h1>Idol Call Chart Maker</h1>
      <div ref={printRef}>
        <CallTable />
      </div>
      <ActionButtons onExportClick={() => exportAsImage(printRef)} />
    </Layout>
  );
}

export default App;
