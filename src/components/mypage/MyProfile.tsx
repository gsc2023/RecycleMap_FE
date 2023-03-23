import React from "react";

const MyProfile: React.FC = () => {
  return (
    <div>
      <p className="title">프로필 수정</p>
      <div>
        <img src="" alt="default"></img>
        <div>
          <button>변경</button>
          <button>삭제</button>
        </div>
      </div>
      <div>
        <label>닉네임</label>
        <input id="name" type="text"></input>
        <button>변경</button>
      </div>
      <div>
        <p>이메일</p>
        <input id="email" type="email"></input>
        <button>변경</button>
      </div>
      <div>
        <p>비밀번호</p>
        <input id="password" type="password"></input>
        <button>변경</button>
      </div>
    </div>
  );
};

export default MyProfile;
