import React from "react";
import MenuScreen from "./MenuScreen";
import { dayMenuItems } from "@/data/dayMenu";
import { dayTheme } from "@/themes/dayTheme";

const DayComponent = () => (
  <MenuScreen
    title="昼のメニュー"
    menuItems={dayMenuItems}
    theme={dayTheme}
    themeColor="#FF5722"
    bgColor="#FFFBCC"
  />
);

export default DayComponent;
