import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import { signOut } from 'next-auth/react';
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
    const session = await getCurrentUser();
  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href="/">
                <Image src="/logo.svg" width={115} height={43} alt="Cretiva-logo" />
            </Link>

            <ul className='xl:flex hidden text-small gap-7'>
                {NavLinks.map((link) => (
                    <Link href={link.href} key={link.key}>
                        {link.text}
                    </Link>
                ))}
            </ul>
        </div>

        <div className='flexCenter gap-4'>
            {session?.user ?(
                <>
                {/* made a seperate componenet
                because it is a client side 
                functionality , not server side */}
                  <ProfileMenu session={session} />
                  
                  <Link href="/create-project">
                    Share Your Work
                  </Link>
                  {/* <button type='button' className='text-sm'
                  onClick={signOut}>Sign Out</button> */}
                </>
            ) : (
                <AuthProviders />
            )

            }
        </div>
    </nav>
  )
}

export default Navbar