import React from "react";
import MenuScreen from "./MenuScreen";
import { nightMenuItems } from "@/data/nightMenu";
import { nightTheme } from "@/themes/nightTheme";

const NightComponent = () => (
  <MenuScreen
    title="夜のメニュー"
    menuItems={nightMenuItems}
    theme={nightTheme}
    themeColor="#FFC107"
    bgColor="#1E1E2F"
    noteCategory="Whisky"
    noteOptions={["ﾛｯｸ", "ﾊｲﾎﾞｰﾙ", "ｼﾞﾝｼﾞｬｰﾊｲﾎﾞｰﾙ"]}
  />
);

export default NightComponent;
