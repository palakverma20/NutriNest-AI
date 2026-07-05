import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-green-300 flex flex-col items-center justify-center py-1.5 absolute bottom-0 w-full'>
        <div className="logo flex gap-1 items-center">
        <lord-icon
          src="https://cdn.lordicon.com/xazzumfu.json"
          trigger="loop"
          delay="1500"
          stroke="bold"
          colors="primary:#000000,secondary:#2ca58d,tertiary:#b26836,quaternary:#f24c00"
          style={{ width: "20px", height: "20px" }}
        ></lord-icon>
        <div className="font-bold text-sm">
            <span>Nutri</span>
            <span className="text-green-900">Nest</span>
        </div>
      </div>
      <div className='text-xs font-medium'>Copyright &copy; - All Rights Reserved</div>
    </footer>
  )
}

export default Footer
