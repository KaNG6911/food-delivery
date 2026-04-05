type HeaderLogoProps = {
  textColor?: [string, string, string];
};

export const HeaderLogo = ({
  textColor = ["black", "black", "#71717A"],
}: HeaderLogoProps) => {
  const [firstColor, secondColor, thirdColor] = textColor;

  return (
    <div className="flex items-center gap-1 font-bold text-xl select-none">
      <span style={{ color: firstColor }}>3F</span>
      <span style={{ color: secondColor }}>Food</span>
      <span style={{ color: thirdColor }}>Admin</span>
    </div>
  );
};
