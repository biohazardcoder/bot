import { ModeToggle } from './mode-toggle'

export const Navbar = () => {
  return (
    <div className='w-full h-[10vh] flex items-center justify-between px-4 bg-secondary'>
        <h1>Title</h1>
        <ModeToggle/>
    </div>
  )
}
