import React from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";

function PostPage(props) {
  const schoolNameInput = useInput();
  const departmentInput = useInput();
  const gradeInput = useInput();
  const nameInput = useInput();

  const schoolNameInput2 = useInput();
  const numberInput = useInput();
  const addressInput = useInput();
  const teacherNameInput = useInput();

  const handleSubmit = () => {
    // 버튼이 클릭되면
    const student = {
      // 상태들을 꺼내서 student 객체 만듬
      schoolName: schoolNameInput.value,
      department: departmentInput.value,
      grade: gradeInput.value,
      name: nameInput.value,
    };
    // fetch("http://localhost:8080/basic/student", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(student), // json으로 변경해서 날림
    // }).then((response) => {
    //   response.json().then((responseData) => { //json() - 프로미스
    //     console.log(responseData);
    //   });
    // });

    // 백엔드 서버로 요청을 날림 (이 url을 통해서)
    axios
      .post("http://localhost:8080/basic/student", student) // post 리턴이 promise
      .then((response) => {
        console.log(response.data); // 데이터만 뽑을때
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit2 = () => {
    const teacher = {
      schoolName2: schoolNameInput.value,
      number: numberInput.value,
      address: addressInput.value,
      teacherName: teacherNameInput.value,
    };

    // fetch("http://localhost:8080/basic/teacher", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(teacher)
    // }).then(response => {
    //   response.json().then(responseData => {
    //     console.log(responseData);
    //   })
    // })

    axios
      .post("http://localhost:8080/basic/teacher", teacher)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <header>
        <h1>비동기 데이터 통신(POST)</h1>
      </header>
      <main>
        <h3>학생정보</h3>
        <p>
          <label htmlFor="">학교명: </label>
          <input
            type="text"
            onChange={schoolNameInput.onChange}
            value={schoolNameInput.value}
          />
        </p>
        <p>
          <label htmlFor="">학과명: </label>
          <input
            type="text"
            onChange={departmentInput.onChange}
            value={departmentInput.value}
          />
        </p>
        <p>
          <label htmlFor="">학년: </label>
          <input
            type="text"
            onChange={gradeInput.onChange}
            value={gradeInput.value}
          />
        </p>
        <p>
          <label htmlFor="">이름: </label>
          <input
            type="text"
            onChange={nameInput.onChange}
            value={nameInput.value}
          />
        </p>
        <p>
          <button onClick={handleSubmit}>전송</button>
        </p>
        <h3>선생님 정보</h3>
        <p>
          <label htmlFor="">학교명: </label>
          <input
            type="text"
            onChange={schoolNameInput2.onChange}
            value={schoolNameInput2.value}
          />
        </p>
        <p>
          <label htmlFor="">연락처: </label>
          <input
            type="text"
            onChange={numberInput.onChange}
            value={numberInput.value}
          />
        </p>
        <p>
          <label htmlFor="">주소: </label>
          <input
            type="text"
            onChange={addressInput.onChange}
            value={addressInput.value}
          />
        </p>
        <p>
          <label htmlFor="">이름: </label>
          <input
            type="text"
            onChange={teacherNameInput.onChange}
            value={teacherNameInput.value}
          />
        </p>
        <p>
          <button onClick={handleSubmit2}>전송</button>
        </p>
      </main>
    </>
  );
}

export default PostPage;
