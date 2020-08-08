import React, { useEffect, useState } from "react";
import { callApi } from "../apis";

const PatchNote = ({ match }) => {
  const [patchNote, setPatchNote] = useState("");

  //   useEffect(async () => {
  //     const response = await callApi({
  //       url: `/${match.params.name}/${match.params.id}`
  //     });
  //     setPatchNote(response);
  //   }, []);
  return (
    <div>
      {match.params.name}
      {match.params.id}
    </div>
  );
};

export default PatchNote;
