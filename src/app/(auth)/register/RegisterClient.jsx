'use client';
import styles from '../login/Auth.module.scss';
import Logo from '@/assets/colorful.svg';

import React from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';
import Input from '@/components/Input/Input';
import Button from '@/components/button/Button';
import Divider from '@/components/divider/Divider';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const RegisterClient = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState();
  const [cPassword, setCPassword] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const registerUser = (event) => {
    event.preventDefault();
    if (email?.length < 1 || password?.length < 1) {
      return toast.error('이메일 또는 비밀번호가 빈값입니다.')
    }

    if (password !== cPassword) {
      return toast.error('비밀번호가 일치하지 않습니다.');
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user', user);

      toast.success('회원가입 성공..');
      router.push('/login');
    })
    .catch((error) => {
      toast.error(error.message);
    })
    .finally(() => {
      setIsLoading(false);
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
          <form onSubmit={registerUser} className={styles.form}>
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
              <Input
                password
                icon="lock"
                id="password"
                name="password"
                label="비밀번호"
                placeholder='비밀번호 확인'
                className={styles.control}
                value={cPassword}
                onChange={(event) => setCPassword(event.target.value)}
              />
            <div className={styles.buttonGroup}>
              <Button
                type='submit'
                width='100%'
              >
                회원가입
              </Button>

              <Divider/>
              <Button
                width='100%'
                secondary
              >
                <Link href={'/login'}>
                  로그인
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegisterClient