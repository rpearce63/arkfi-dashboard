import React from 'react';

export default ({handleSwitch, backupData}) => {
  
  return (
  <>
      <span className="ml-1 inter-bold">ARK</span>
      <Switch onChange={handleSwitch}/>
      <span className="inter-bold">USD</span>
      <Button onClick={backupData}>Backup</Button>
    </>
  )
}