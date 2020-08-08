import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PatchDiv } from "./PatchList.style";
import { callApi } from "../apis";

const title = {
  lol: "리그오브레전드",
  maplestory: "메이플스토리",
  kart: "카트라이더"
};

const contents = {
  lol: [
    { title: "1패치", id: 1 },
    { title: "2패치", id: 2 },
    { title: "3패치", id: 3 }
  ],
  maplestory: [
    { title: "1패치", id: 1 },
    { title: "2패치", id: 2 },
    { title: "3패치", id: 3 }
  ],
  kart: [
    { title: "1패치", id: 1 },
    { title: "2패치", id: 2 },
    { title: "3패치", id: 3 }
  ]
};

const PatchList = ({ match }) => {
  const [patchList, setPatchList] = useState([]);

  // useEffect(async () => {
  //   const response = await callApi({ url: `/${match.params.name}` });
  //   setPatchList(response);
  // }, []);

  return (
    <PatchDiv>
      <div className="title">{title[match.params.name]}</div>
      <ul>
        {contents[match.params.name].map(content => (
          <Link to={`/${match.params.name}/${content.id}`}>
            <li key={content.id}>{content.title}</li>
          </Link>
        ))}
      </ul>
      {/* <div dangerouslySetInnerHTML={{ __html: content.lol }}></div> */}
    </PatchDiv>
  );
};

export default PatchList;
