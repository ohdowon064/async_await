import React, { useEffect, useState } from 'react';
import { PatchDiv } from './style/PatchList.style';
import { callApi } from '../apis';
import PatchElement from '../components/PatchElement';

const title = {
  lol: '리그오브레전드',
  maple: '메이플스토리',
  kart: '카트라이더',
};

const PatchList = ({ match }) => {
  const [patchList, setPatchList] = useState([]);

  const fetchList = async () => {
    const response = await callApi({ url: `/${match.params.name}` });
    setPatchList(response.sort((a, b) => b.index - a.index));
  };

  useEffect(() => {
    fetchList();
  }, [match.params.name]);

  return (
    <PatchDiv>
      <div className='title'>{title[match.params.name]}</div>
      <ul>
        {patchList &&
          patchList.map((content) => (
            <PatchElement
              key={content.index}
              title={content.title}
              name={match.params.name}
              id={content.index}
            />
          ))}
      </ul>
    </PatchDiv>
  );
};

export default PatchList;
