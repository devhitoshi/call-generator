import React from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <h1>Idol Call Chart Maker</h1>
      <CallTable />
      <ActionButtons />
    </Layout>
  );
}

export default App;
