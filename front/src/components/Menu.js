import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { MenuForm } from "./Menu.style";

const Menu = () => {
  return (
    <MenuForm>
      <Link to={`/lol`}>리그오브레전드</Link>
      <Link to={`/maplestory`}>메이플스토리</Link>
      <Link to={`/kart`}>카트라이더</Link>
    </MenuForm>
  );
};

export default Menu;
