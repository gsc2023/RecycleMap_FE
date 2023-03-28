import React from "react";

type ProfileType = {
  nickname: String;
  email: String;
  password: String;
};

const MyProfile: React.FC<ProfileType> = (props) => {
  const format = (str: String) => {
    const replaceString = str.replace(/^[a-zA-Z0-9]*$/, "*");
    return replaceString;
  };

  return (
    <div>
      <div>
        <label>닉네임</label>
        <p>{props.nickname}</p>
        <input id="name" type="text"></input>
        <button>변경</button>
      </div>
      <div>
        <p>이메일</p>
        <input id="email" type="email"></input>
        <p>{props.email}</p>
        <button>변경</button>
      </div>
      <div>
        <p>비밀번호</p>
        <input id="password" type="password"></input>
        <p>{props.password}</p>
        <button>변경</button>
      </div>
    </div>
  );
};

export default MyProfile;
