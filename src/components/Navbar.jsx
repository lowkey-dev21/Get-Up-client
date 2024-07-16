import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <section className=' fixed  w-full flex justify-between px-3 h-[60px] items-center   backdrop-blur-lg ' >
        <div className=' text-xl font-semibold' >
            Get <span className=' text-green-500' > Up </span>
        </div>

        <div>
            <Link to={"signUp"} ><img className=' h-[35px] w-[35px] bg-slate-900 rounded-full '/></Link>
        </div>

    </section>
    </>
  )
}

export default Navbar