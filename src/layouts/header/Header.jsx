'use client';

import React from 'react'
import styles from './Header.module.scss';
import Link from 'next/link';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter, usePathname } from 'next/navigation';
import InnerHeader from '../innerHeader/InnerHeader';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@/redux/slice/authSlice';


const Header = () => {
  
  const [displayName, setDisplayName] = React.useState();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user){
        if (user.displayName !== displayName) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uNmae = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uNmae);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID : user.uid
        }))

      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    })
  }, [displayName, dispatch])

  const onLogout = (event) => {
    event.preventDafault();
    signOut(auth) 
    .then(() => {
      toast.success('로그아웃 되었습니다.');
      router.push('/');
    })
    .catch((error) => {
      toast.error(error.message);
    })
  }

  if (pathname === '/login' || pathname === '/register' || pathname === '/reset') return null

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link
              href={'/login'}
            >
              로그인
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/login/dashboard'}
            >
              관리자
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/'}
            >
              주문 목록
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/'}
              onClick={onLogout}
            >
              로그아웃
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/'}
            >
              제휴 마케팅
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/order-history'}
            >
              쿠팡 플레이
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href={'/'}
            >
              고객 센터
            </Link>
          </li>
        </ul>
      </div>
      {pathname.startsWith('/admin') ? 
      null 
      :
      <InnerHeader/>
      }
    </header>
  )
}

export default Header