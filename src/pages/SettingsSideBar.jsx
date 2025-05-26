

const SettingsSideBar = ({setIsOpenSettings}) => {
    

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
        <div className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' onClick={ () => setIsOpenSettings(false)}>
            
        </div>

    // </div>
  )
}

export default SettingsSideBar