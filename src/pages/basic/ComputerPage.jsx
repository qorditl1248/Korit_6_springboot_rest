import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root"); // modal 사용하는 페이지 마다 사용

const layout = css`
  box-sizing: border-box;
  margin-bottom: 20px;
  border-bottom: 2px solid #dbdbdb;
`;

function ComputerPage(props) {

  // modal창 상태 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 세부 정보 상태
  const [computerDetail, setComputerDetail] = useState({
    computerId: "",
    company: "",
    cpu: "",
    ram: "",
    ssd: "",
  });

  // 등록 상태
  const [registerComputer, setRegisterComputer] = useState({
    company: "",
    cpu: "",
    ram: "",
    ssd: "",
  });

  // 수정 상태 
  const [updateComputer, setUpdateComputer] = useState({
    computerId: "",
    company: "",
    cpu: "",
    ram: "",
    ssd: "",
  });

  // 조회 상태
  const [params, setParams] = useState({
    company: "",
    cpu: "",
  });

  // List 상태
  const [computerList, setComputerList] = useState([]);

  // 등록 Input
  const handleRegisterInputChange = (e) => {
    setRegisterComputer((registerComputer) => {
      return {
        ...registerComputer,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 등록하기 버튼
  const handleRegisterSubmitClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/computer",registerComputer); // registerComputer 객체도 같이 넘겨줌
      if (response.status === 200) {
        alert("등록성공!");
      }
    } catch (e) {
      console.err(e);
      alert("등록실패!");
    }

    setRegisterComputer((rc) => {
      // 등록되고 나면 비워줌
      return {
        company: "",
        cpu: "",
        ram: "",
        ssd: "",
      };
    });
  };

  const requestComputerList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/computers",
        { params }
      );
      // await axios.get(`http://localhost:8080/api/v1/computers=${params.company}${params.cpu}}`); - 뒤에 객체없이 이렇게도 사용 가능!
      // {} 두번째 메소드 객체, ? 달려있는 것들은 get안에 있는 키값들  {키: value} params: value값
      setComputerList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchInputChange = (e) => {
    setParams((params) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSearchClick = () => {
    requestComputerList();

    setParams({
      company: "",
      cpu: "",
    });
  };

  const handleSelectComputer = async (computerId) => {
    const data = await requestGetComputerInfo(computerId);

    if (!data) {
      setComputerDetail({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: "",
      });
      return;
    }
    setComputerDetail(data);
  };

  const requestGetComputerInfo = async (computerId) => {
    let responseData = null;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/computer/${computerId}`
      );
      console.log(response);
      responseData = response.data;
    } catch (e) {
      console.error(e);
    }
    return responseData;
  };

  const handleDeleteComputerClick = async (computerId) => {
    if (window.confirm("정말 삭제하시겠습니까? ")) {
      await requestDeleteComputer(computerId);
      await requestComputerList();
      alert("삭제 완료!");
    }
  };

  const requestDeleteComputer = async (computerId) => {
    let responseData = null;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/computer/${computerId}`
      );
      responseData = response.data;
    } catch (e) {
      console.error(e);
    }

    return responseData;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateComputer({
      computerId: "",
      company: "",
      cpu: "",
      ram: "",
      ssd: "",
    });
  };

  const handleUpdateComputerClick = async (computerId) => {
    setIsModalOpen(true);
    const responseData = await requestGetComputerInfo(computerId);
    setUpdateComputer(responseData);
  };

  const handleUpdateSumbitClick = async () => {
    await requestUpdateComputer();
    await requestComputerList();
    closeModal(); // modal창 닫기 
  }


  const requestUpdateComputer = async() => {
    let responseData = null;
    
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/computer/${updateComputer.computerId}`, updateComputer); // json 요청
      responseData = response.data;
    } catch(e) {
      console.err(e)
    }
    return responseData;
  }


  const handleUpdateInputChange = (e) => {
    setUpdateComputer((uc) => {
      return {
        ...uc,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <ReactModal
        style={{
          content: {
            boxSizing: "border-box",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            padding: "20px",
            width: "400px",
            height: "400px",
            backgroundColor: "#fafafa",
          },
        }}
        isOpen={isModalOpen}
        onRequestClass={closeModal}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100%;
          `}
        >
          <h2>컴퓨터 정보 수정</h2>
          <input
            type="text"
            name="computerId"
            onChange={handleUpdateInputChange}
            value={updateComputer.computerId}
            disabled={true}
          />
          <input
            type="text"
            name="company"
            placeholder="COMPANY"
            onChange={handleUpdateInputChange}
            value={updateComputer.company}
          />
          <input
            type="text"
            name="cpu"
            placeholder="CPU"
            onChange={handleUpdateInputChange}
            value={updateComputer.cpu}
          />
          <input
            type="text"
            name="ram"
            placeholder="RAM"
            onChange={handleUpdateInputChange}
            value={updateComputer.ram}
          />
          <input
            type="text"
            name="ssd"
            placeholder="SSD"
            onChange={handleUpdateInputChange}
            value={updateComputer.ssd}
          />
          <div>
            <button onClick={handleUpdateSumbitClick}>확인</button>
            <button onClick={() => closeModal()}>취소</button>
          </div>
        </div>
      </ReactModal>
      <div css={layout}>
        <h2>목록</h2>
        <p>
          <input
            type="text"
            name="company"
            onChange={handleSearchInputChange}
            value={params.company}
            placeholder="제조사"
          />
          <input
            type="text"
            name="cpu"
            onChange={handleSearchInputChange}
            value={params.cpu}
            placeholder="CPU"
          />
          <button onClick={handleSearchClick}>조회</button>
        </p>
        <table>
          <thead>
            <tr>
              <th>선택</th>
              <th>ID</th>
              <th>제조사</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {computerList.map((computer) => (
              <tr key={computer.computerId}>
                <td>
                  <button
                    onClick={() => handleSelectComputer(computer.computerId)}
                  >
                    선택
                  </button>
                </td>
                <td>{computer.computerId}</td>
                <td>{computer.company}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateComputerClick(computer.computerId)
                    }
                  >
                    수정
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDeleteComputerClick(computer.computerId)
                    }
                  >
                    삭제
                  </button>
                </td>{" "}
                {/* 눌렀을때 Id를 불러올거다 하면 이런식으로 코드 작성  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div css={layout}>
        <h2>세부정보</h2>
        <ul>
          <li>ID: {computerDetail.computerId}</li>
          <li>제조사: {computerDetail.company}</li>
          <li>CPU: {computerDetail.cpu}</li>
          <li>RAM: {computerDetail.ram}</li>
          <li>SSD: {computerDetail.ssd}</li>
        </ul>
      </div>

      <div css={layout}>
        <h2>등록</h2>
        <p>
          <label htmlFor="">제조사: </label>
          <input
            type="text"
            name="company"
            onChange={handleRegisterInputChange}
            value={registerComputer.company}
          />
        </p>
        <p>
          <label htmlFor="">CPU: </label>
          <input
            type="text"
            name="cpu"
            onChange={handleRegisterInputChange}
            value={registerComputer.cpu}
          />
        </p>
        <p>
          <label htmlFor="">RAM: </label>
          <input
            type="text"
            name="ram"
            onChange={handleRegisterInputChange}
            value={registerComputer.ram}
          />
        </p>
        <p>
          <label htmlFor="">SSD: </label>
          <input
            type="text"
            name="ssd"
            onChange={handleRegisterInputChange}
            value={registerComputer.ssd}
          />
        </p>
        <p>
          <button onClick={handleRegisterSubmitClick}>등록하기</button>
        </p>
      </div>
    </div>
  );
}

export default ComputerPage;
