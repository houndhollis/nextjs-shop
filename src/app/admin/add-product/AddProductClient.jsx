'use client';
import Button from '@/components/button/Button';
import Heading from '@/components/heading/Heading';
import Loader from '@/components/loader/Loader';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './AddProduct.module.scss';

// 파이어 베이스
import { db, storage  } from '@/firebase/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

const categories = [
  { id: 1, name: 'Laptop'},
  { id: 2, name: 'Electronics'},
  { id: 3, name: 'Fashion'},
  { id: 4, name: 'Phone'},
  { id: 5, name: 'Movies & Television'},
  { id: 6, name: 'Home & Kitchen'},
  { id: 7, name: 'Automotive'},
  { id: 8, name: 'Software'},
  { id: 9, name: 'Video Games'},
  { id: 10, name: 'Sports & Outdoor'},
  { id: 11, name: 'Toys & Games'},
  { id: 12, name: 'Industrial & Scientific'},
]

const initialState = {
  name : '',
  imageURL : '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
}


const AddProductClient = () => {

  const [product, setProduct] = React.useState({...initialState});
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleInputChange = (event) => {
    const { name , value } = event.target;
    setProduct((prevState) => {
      return {...prevState, [name]:value};
    });
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({ ...product, imageURL : downloadURL });
            toast.success('이미지를 성공적으로 업로드 하였습니다.')
          })
  
        }
      )
    }
  }

  const addProduct = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try{
      addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      })
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success('상품을 저장했습니다.');
      router.push('/admin/all-products');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
     {isLoading && <Loader />}
     <div className={styles.product}>
       <Heading title='새 상품 생성하기'/>
       <form onSubmit={addProduct}>
          <label>상품 이름:</label>
          <input
            type='text'
            name='name'
            required
            value={product.name}
            onChange={(event) => handleInputChange(event)}
          />
          <div>
            {
              uploadProgress === 0 ? null :
              <div className={styles.progress}>
                <div
                  className={styles['progress-bar']}
                  style={{width: `${uploadProgress}%`}}
                >
                  {uploadProgress < 100 ? `Uploading... ${uploadProgress}` : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            }
            <input
              type='file'
              placeholder='상품 이미지'
              accept='image/*'
              name='image'
              required
              onChange={(event) => handleImageChange(event)}
            />
            {product.imageURL === '' ?
              null : 
              <input 
                type='text'
                name='imageUrl'
                disabled
                required
                value={product.imageURL}
                placeholder='이미지 URL'
              /> 
            }
          </div>
          <label>상품 가격:</label>
          <input
            type='number'
            name='price'
            placeholder='상품 가격'
            required
            value={product.price}
            onChange={(event) => handleInputChange(event)}
          />
          <label>상품 카테고리:</label>
          <select
            name='category'
            placeholder='상품 가격'
            required
            value={product.category}
            onChange={(event) => handleInputChange(event)}
          >
            <option value='' disabled>
                --상품 카테고리 선택
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <label>상품 브랜드/회사:</label>
          <input
            type='text'
            name='brand'
            placeholder='상품 브랜드/회사'
            value={product.brand}
            onChange={(event) => handleInputChange(event)}
          />
          <label>상품 설명:</label>
            <textarea
              name='desc'
              value={product.desc}
              cols={10}
              rows={10}
              required
              onChange={(event) => handleInputChange(event)}
            ></textarea>
            <Button type='submit'>
              상품 생성
            </Button>
       </form>
     </div> 
    </>
  )
}

export default AddProductClient