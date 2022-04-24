import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/getConfig"><a> Config </a></Link> | 
        <Link href="/logout"><a> Logout </a></Link> | 
        <Link href="/suggest"><a> <b>SUGGEST </b></a></Link> |
        <Link href="/customer"><a> <b>CUSTOMER</b> </a></Link>    |
        <Link href="/admin"><a> <b>ADMIN</b> </a></Link> 
    </div>
)

export default Navbar