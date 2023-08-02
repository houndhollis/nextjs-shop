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
  }

  const signInWithGoogle = () => {

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