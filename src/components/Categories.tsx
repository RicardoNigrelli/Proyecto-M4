import React from "react";
import categoriesToPreLoad from "@/helpers/preloadCategories";
import {
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaHeadphones,
  FaCamera,
  FaPrint,
  FaTv,
  FaHdd,
  FaToolbox,
} from "react-icons/fa";
import Icon from "./Icon";
import Category from "./Category";

const icons = [
  <Icon key="hdd" IconComponent={FaHdd} color="white" />,
  <Icon key="laptop" IconComponent={FaLaptop} color="white" />,
  <Icon key="tablet" IconComponent={FaTabletAlt} color="white" />,
  <Icon key="headphones" IconComponent={FaHeadphones} color="white" />,
  <Icon key="camera" IconComponent={FaCamera} color="white" />,
  <Icon key="mobile" IconComponent={FaMobileAlt} color="white" />,
  <Icon key="tv" IconComponent={FaTv} color="white" />,
  <Icon key="print" IconComponent={FaPrint} color="white" />,
  <Icon key="toolbox" IconComponent={FaToolbox} color="white" />,
];

const Categories = () => (
  <div className="flex gap-12 flex-wrap">
    {categoriesToPreLoad.map((category, index) => (
      <Category
        key={category.name}
        title={category.name}
        icon={icons[index]} 
        categoryId={index} 
      />
    ))}
  </div>
);

export default Categories;
