import React from "react";

const Home = () => {
  const test = `
    <div>최정은</div><div>테스트입니다.</div><div>됨</div><ul><li>테스트</li><li>으악</li></ul>
  `;
  return <div dangerouslySetInnerHTML={{ __html: test }}></div>;
};

export default Home;
