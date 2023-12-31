'use client';
import Logo from '@/assets/colorful.svg';
import styles from './Auth.module.scss';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';
import Input from '@/components/Input/Input';
import AutoSignInCheckBox from '@/components/autoSignInCheckBox/autoSignInCheckBox';
import Divider from '@/components/divider/Divider';
import Button from '@/components/button/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const LoginClient = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAutoLogin, setIsAutoLogin] = React.useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push('/');
  }

  const loginUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      toast.success('로그인에 성공하였습니다.');
      redirectUser();
    })
    .catch((error) => {
      toast.error(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const signInWithGoogle = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      toast.success('로그인에 성공하였습니다.');
      redirectUser();
    })
    .catch((error) => {
      toast.error(error.message);
    })
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={Logo} alt='logo'/>
          </h1>
          <form onSubmit={loginUser} className={styles.form}>
              <Input
                email
                icon="letter"
                id="email"
                name="email"
                label="이메일"
                placeholder='아이디(이메일)'
                className={styles.control}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                password
                icon="lock"
                id="password"
                name="password"
                label="비밀번호"
                placeholder='비밀번호'
                className={styles.control}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            <div className={styles.group}>
              <AutoSignInCheckBox 
                checked={isAutoLogin}
                onChange={() => setIsAutoLogin(!isAutoLogin)}
              />
              <Link href={'/reset'} className={styles.findLink}>
                비밀번호 수정하기
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 1L9.5 9L1.5 17" stroke="#0074E9" strokeWidth="2" className={styles.findLinkArrow}/>
                </svg>
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              <Button
                type='submit'
                width='100%'
              >
                로그인 
              </Button>

              <Divider/>
              <Button
                width='100%'
                secondary
              >
                <Link href={'/register'}>
                  회원가입
                </Link>
              </Button>
              <Divider/>
              <div>
                <Button 
                  onClick={signInWithGoogle}
                >
                  구글로그인
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default LoginClient