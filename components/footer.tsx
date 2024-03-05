import React from "react";

export interface FooterProps {
  text: string
}
const Footer = ({ text }: FooterProps) =>
  <footer className="h-14 bg-cyan-500 text-white flex items-center p-4 justify-center">{text}</footer>

export default Footer