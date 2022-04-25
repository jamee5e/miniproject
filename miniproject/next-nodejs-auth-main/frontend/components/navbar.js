import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> | 
        <Link href="/customer"><a> <b>Customer</b> </a></Link> |
         <Link href="/suggest"><a> <b>Suggest </b></a></Link> |
        <Link href="/admin"><a> <b>Admin</b> </a></Link> 
    </div>
)

export default Navbar