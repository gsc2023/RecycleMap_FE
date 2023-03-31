import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ProfileType } from "../../pages/Mypage";
import { createStyle } from "../../lib/styleHelper";

import axios from "../../lib/axios";

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
  input: {
    color: "#DBF5EC",
  },
});

const MyProfile: React.FC<ProfileType> = (props) => {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [visible, setVisible] = useState<String>("");

  useEffect(() => {
    if (props) {
      setName("닉네임");
      setEmail(props.Email);
    }
  }, [name]);

  const modifyHandler = (
    params: String,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setVisible(params);
  };

  const saveHandler = (
    params: String,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const userData = {
      Email: email,
      DisplayName: name,
    };

    axios.patch("/my/edit", userData).then((res) => {
      alert("정보가 수정되었습니다.");
    });

    setVisible("");
  };

  return (
    <React.Fragment>
      {name && email ? (
        <Box sx={style.sx.contentContainer}>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "0.7rem" }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              닉네임
            </Typography>
            {visible === "name" ? (
              <Box sx={style.sx.componentContainer}>
                <TextField
                  variant="outlined"
                  id="name"
                  type="text"
                  defaultValue={name}
                  sx={{
                    width: "30vw",
                    backgroundColor: "#FFF",
                    borderColor: "#DBF5EC !important",
                  }}
                  size="small"
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => setName(event.target.value)}
                ></TextField>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    saveHandler("name", e);
                  }}
                >
                  저장
                </Button>
              </Box>
            ) : (
              <Box sx={style.sx.componentContainer}>
                <Box>
                  <TextField
                    variant="outlined"
                    id="name"
                    type="text"
                    defaultValue={name}
                    disabled
                    sx={{
                      width: "30vw",
                      backgroundColor: "#F5FFFA",
                      borderColor: "#DBF5EC !important",
                    }}
                    size="small"
                  ></TextField>
                </Box>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    modifyHandler("name", e);
                  }}
                >
                  변경
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "0.7rem" }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              이메일
            </Typography>
            {visible === "email" ? (
              <Box sx={style.sx.componentContainer}>
                <TextField
                  variant="outlined"
                  id="name"
                  type="text"
                  defaultValue={email}
                  sx={{
                    width: "30vw",
                    backgroundColor: "#FFF",
                    borderColor: "#DBF5EC !important",
                  }}
                  size="small"
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => setEmail(event.target.value)}
                ></TextField>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    saveHandler("name", e);
                  }}
                >
                  저장
                </Button>
              </Box>
            ) : (
              <Box sx={style.sx.componentContainer}>
                <Box>
                  <TextField
                    variant="outlined"
                    id="email"
                    type="email"
                    defaultValue={email}
                    disabled
                    sx={{
                      width: "30vw",
                      backgroundColor: "#F5FFFA",
                      borderColor: "#DBF5EC !important",
                    }}
                    size="small"
                  ></TextField>
                </Box>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    modifyHandler("email", e);
                  }}
                >
                  변경
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MyProfile;
