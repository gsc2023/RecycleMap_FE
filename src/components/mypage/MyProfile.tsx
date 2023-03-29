import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ProfileType } from "../../pages/Mypage";
import { createStyle } from "../../lib/styleHelper";

import axios from "axios";

const style = createStyle({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: "1.5rem",
    padding: "1.5rem",
  },
  componentContainer: {
    display: "flex",
    columnGap: "1rem",
    alignContent: "center",
  },
  inputWrapper: {
    width: "30vw",
    backgroundColor: "#F5FFFA",
    borderColor: "#DBF5EC !important",
  },
  input: {
    color: "#DBF5EC",
  },
});

const MyProfile: React.FC<ProfileType> = (props) => {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [visible, setVisible] = useState<String>("");

  useEffect(() => {
    if (props) {
      setName(props.nickname);
      setEmail(props.email);
      setPassword(props.password);
    }
  }, []);

  const modifyHandler = (
    params: String,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setVisible(params);
  };

  const saveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = e.currentTarget;
    axios.patch("https://vscode-qjnbi.run.goorm.site/proxy/8080/reports/");
    setVisible("");
  };

  return (
    <Box sx={style.sx.contentContainer}>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0.7rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          닉네임
        </Typography>
        <Box sx={style.sx.componentContainer}>
          <Box>
            {visible === "name" ? (
              <TextField
                variant="outlined"
                id="name"
                type="text"
                defaultValue={props.nickname}
                sx={style.sx.inputWrapper}
                size="small"
              ></TextField>
            ) : (
              <TextField
                variant="outlined"
                id="name"
                type="text"
                defaultValue={name}
                disabled
                sx={style.sx.inputWrapper}
                size="small"
              ></TextField>
            )}
          </Box>
          {visible === "name" ? (
            <Button
              variant="outlined"
              onClick={(e) => {
                modifyHandler("name", e);
              }}
            >
              변경
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={(e) => {
                setName(e.currentTarget);
                saveHandler(e);
              }}
            >
              저장
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0.7rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          이메일
        </Typography>
        <Box sx={style.sx.componentContainer}>
          <Box>
            <TextField
              variant="outlined"
              id="email"
              type="email"
              defaultValue={props.email}
              disabled
              sx={style.sx.inputWrapper}
              size="small"
            ></TextField>
          </Box>
          <Button variant="outlined">변경</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0.7rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          비밀번호
        </Typography>
        <Box sx={style.sx.componentContainer}>
          <Box>
            <TextField
              variant="outlined"
              id="password"
              type="password"
              defaultValue={props.password}
              disabled
              sx={style.sx.inputWrapper}
              size="small"
            ></TextField>
          </Box>
          <Button variant="outlined">변경</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
