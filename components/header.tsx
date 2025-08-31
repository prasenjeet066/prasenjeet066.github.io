export default function Header() {
  const listNavs = [
    {
      name : 'Home'
    },
    {
      name : 'About Me'
    },
    {
      name : 'Projects'
    },
    {
      name : 'Hire Me'
    },
  ]
  return (
    <div className='flex p-4 flex-row items-center justify-between w-full'>
      <span className ='text-md font-bold'>
        {"Prasenjeet"}
      </span>
      <div className='flex flex-row items-center flex-1'>
        {
          listNavs.map((nav)=>(
            <a className='text-sm text-gray-800 px-4 underline-none hover:underline' href = {nav.name.split(' ')[0].toLocaleLowerCase()}>
              {nav.name}
            </a>
          ))
        }
      </div>
    </div>
  )
}