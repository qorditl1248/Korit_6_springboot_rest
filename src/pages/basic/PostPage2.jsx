import React, { useEffect, useState } from 'react'
import { COLOR_OPTIONS, SIZE_OPTIONS } from '../../constants/productOptions';
import axios from 'axios';

// 상태 코드 
// https://hongong.hanbit.co.kr/http-%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C-%ED%91%9C-1xx-5xx-%EC%A0%84%EC%B2%B4-%EC%9A%94%EC%95%BD-%EC%A0%95%EB%A6%AC/

function PostPage2(props) {

  const [ product, setProduct ] = useState({
    
    productName: "",
    price: "",
    sizeId: "",
    colorId: "" 

  }); 

  const [ sizeOptions, setSizeOptions ] = useState([]);
  const [ colorOptions, setColorOptions ] = useState([]);

  useEffect(() => {
    const getSize = async() => {
      const response = await axios.get("http://localhost:8080/api/v1/sizes");
      setSizeOptions(response.data);
      setProduct(product => ({
        ...product,
        sizeId : response.data[0].sizeId
      }));
    }
    const getColor = async() => {
      const response = await axios.get("http://localhost:8080/api/v1/colors");
      setColorOptions(response.data);
      setProduct(product => ({
        ...product,
        colorId : response.data[0].colorId
      }));
    }

    getSize();
    getColor();
  }, []);




  const handleInputChange = (e) => {
    setProduct(product => {
      return{
        ...product,
        [e.target.name] : e.target.value
      }
    });
  }

  const handleSubmitClick = async () => {   // 비동기 함수로 선언 
    try{                    
      // axios를 통해 해당 url에 post 요청을 날림, 두번째 인자로 product의 객체를 전달하여 product의 상태를 전달 
      // await은 요청이 완료되고 서버에서 응답을 받을때까지 기다림
      // resolve가 실행되면 변수 response에 담기고, reject가 실행되면 error가 실행 
      const response = await axios.post("http://localhost:8080/api/v1/product", product);
      // console에 요청 결과 출력 
      console.log(response);
    }catch(error) { // 실행 중 에러 발생하면 catch 구문 실행해서 console에 에러 출력 
      console.log(error);
    }
  }
  
    
  // key값 잡아주면 전체 렌더링이 일어나는게 아니라 부분 렌더링이 일어남 
  return (
    <>
      <header>
        <h1>비동기 데이터 통신(POST2)</h1>
      </header>
      <main>
        <h3>상품등록</h3>
        <p>
          <label htmlFor="">상품명: </label>
          <input type="text" 
            name='productName'
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="">가격: </label>
          <input type="text" 
            name='price'
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="">사이즈: </label>
          <select name='sizeId' onChange={handleInputChange} value={product.sizeId}>
            {
              sizeOptions.map(size => 
              <option key={size.sizeId} value={size.sizeId}>{size.sizeName}</option>)
            }
            
          </select>
        </p>
        <p>
          <label htmlFor="">색상: </label>
          <select name='colorId' onChange={handleInputChange} value={product.colorId}>
            {
              colorOptions.map(color => 
              <option key={color.colorId} value={color.colorId}>{color.colorName}</option>)
            } 
          </select>
        </p>
        <p>
          <button onClick={handleSubmitClick}>등록하기</button>
        </p>
      </main>
    </>
  )
}

export default PostPage2;