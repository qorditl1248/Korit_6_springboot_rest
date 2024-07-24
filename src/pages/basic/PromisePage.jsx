import React from 'react'

function PromisePage(prpps) {
  
  const loop = (name) => {
    // random 0 < 1 0.123234455 이런식으로 나옴 
    const random = Math.floor(Math.random() * 100) + 1; // 0이 나오지 않게 +1
    for(let i = 0; i < random; i++) {
      console.log(`${name}: ${i}`);
    }
  }


  // const testPromise = () => {
  //   return new Promise((resolve, reject) => {
  //     loop("test1");
  //     resolve("test1 반복 완료");
  //   });
  // }

  const testPromise = async() => {
    loop("test1");
    return "test1 완료" // return이랑 resolve 같음  
  }

  const testPromise2 = () => {
    return new Promise((resolve, reject) => {
      loop("test2");
      resolve("test2 반복 완료");
    });
  }
  const testPromise3 = () => {
    return new Promise((resolve, reject) => {
      loop("test3");
      resolve("test3 반복 완료");
    });
  }

  // promise 문법 
  const handleClick1 = () => {  
    testPromise().then(r => {
        console.log(r);
        testPromise3().then(r => {
          console.log(r);
          testPromise2().then(r => {
            console.log(r);
          })
        })
      });
  }

  // async & await 문법 
  // 주의 await은 async 안에서 사용 가능
  // await 

  const handleClick2 = async() => { // async를 넣으면 handleClick2도 promise가 됨 
    const r = await testPromise(); // resolve의 값을 r에 넣음 
    console.log(r);
    const r2 = await testPromise2();
    console.log(r2);
    const r3 = await testPromise3();
    console.log(r3);
  }


  // testPromise4 & testPromise5 랑 같은 코드 
  const testPromise4 = (num) => {
    return new Promise((resolve, reject) => {
      console.log("test4");
      if(num === 0) {
        reject("test4 오류");
        return;
      }
      resolve("test4 성공!!!")
    });
  }
  const testPromise5 = async (num) => {
    console.log("test5");
    if(num === 0) {
      throw new Error("test5 오류!!!"); // 강제로 오류 생성 
    }
    return "test5 성공!!!"
  }

  const handleClick3 = () => {
    testPromise4(0)
      .then(r => {
        console.log(r);
        testPromise5(0)
        .then(r => {
          console.log(r);
        })
        .catch(e => {
          console.log(e);
        })
      })
      .catch(e =>{
        console.log(e);
          testPromise5(0)
        .then(r => {
          console.log(r);
        })
        .catch(e => {
          console.log(e);
        })
      })
      
  }

  const handleClick4 = async () => {
    try {
      const r = await testPromise4(1);
      console.log(r);
    }catch(error) {
      console.log(error);
    }
    
    try {
      const r2 = await testPromise5(1);
      console.log(r2);
    }catch(error) {
      console.log(error);
    }
  }


  return (
    <div>
      <button onClick={handleClick1}>버튼1</button>
      <button onClick={handleClick2}>버튼2</button>
      <button onClick={handleClick3}>버튼3</button>
      <button onClick={handleClick4}>버튼4</button>
    </div>
  )
}

export default PromisePage;