"use client";
import { RootState } from "../../redux/store/store";
import Image from "next/image";
import "./Reel.css";
import { ImageData, ImageReponse } from "@/app/types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import Container from "@/app/utils/Container";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Reel = () => {
  const [reel, setReel] = useState<ImageData[]>([]);
  const {data} = useSelector((state: RootState) => state.search);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const response: Response = await fetch(
  //         `https://api.pexels.com/v1/search?query=nature&per_page=80`,
  //         {
  //           headers: {
  //             Authorization:
  //               "gNmvSlQY6yU4Z2Z4vmxIkmNI1RhDdA3uonxDMrjP5gfQpqwAhOb89Dba",
  //           },
  //         }
  //         );
  //         const data: ImageReponse = await response.json();
  //       setReel(
  //         data.photos.map((i: ImageData): ImageData => {
  //           i.src.original =
  //             i.src.original + "?auto=compress&cs=tinysrgb&w=600&lazy=load";
  //           return i;
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   loadData();
  // }, []);

  const [open, setOpen] = React.useState(false);
  const [down, setDown] = useState<ImageData | null>(null);
  const [imageType, setImageType] = useState<string>("original");
  const [currentImage, setCurrentimage] = useState<string>("");
  const handleOpen = (i: ImageData) => {
    setOpen(true);
    setCurrentimage(i.src.original);
    setDown(i);
  };
  const handleClose = () => setOpen(false);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  // console.log(down);

  return (
    <>
      <div className="reel">
        <Container>
          <ImageList variant="masonry" cols={3} gap={8}>
            {/* {reel.map((i: ImageData) => (
              <ImageListItem key={i.id}>
                <Image
                  onClick={() => handleOpen(i)}
                  className="reel__image"
                  src={i.src.original}
                  width={i.width}
                  height={i.height}
                  alt={i.alt}
                  loading="lazy"
                />
              </ImageListItem>
            ))} */}
            {
              // data.photos ? 
              data.photos?.map(i => 
                <ImageListItem key={i.id}>
                  <Image
                    src={i.src.original + "?auto=compress&cs=tinysrgb&w=600&lazy=load"}
                    width={400}
                    height={400}
                    alt={i.alt}
                    onClick={() => handleOpen(i)}
                    className="reel__image"
                    loading="lazy"
                  />  
                </ImageListItem>
                )
                // :
                //   data.videos?.map(i => 
                //     <ImageListItem key={i.id}>
                //       <video
                //         controls
                //         key={i.id}
                //         src={i.video_files[0].link}
                //         width={400}
                //         height={400}
                //       /> 
                //     </ImageListItem>
                //   )
                }

          </ImageList>
        </Container>
      </div>

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          {down && (
            <>
              <button
                onClick={() => saveAs(currentImage, down.alt + " " + imageType)}
              >
                Download
              </button>

              <Image
                width={1000}
                height={700}
                style={{ objectFit: "contain" }}
                src={currentImage || down.src.original}
                alt="image"
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {imageType}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={currentImage}
                    label={"Resolution"}
                    style={{ color: "#000" }}
                    onChange={(e: SelectChangeEvent) => {
                      setCurrentimage(e.target.value.split("type=")[0]);
                      setImageType(e.target.value.split("type=")[1]);
                    }}
                  >
                    {Object.entries(down.src).map((res, index) => (
                      <MenuItem key={index} value={res[1] + "type=" + res[0]}>
                        {res[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* <select onChange={(e:  React.ChangeEvent<HTMLSelectElement>) => {
                setCurrentimage(e.target.value.split("type=")[0]);
                setImageType(e.target.value.split("type=")[1])
              }}>
                {
                  Object.entries(down.src).map((res, index) => 
                    <option key={index} value={res[1] + "type=" + res[0]}>{res[0]}</option>  
                  )
                }
              </select> */}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Reel;
