import Button from "@mui/material/Button";

interface MaterialButtonProps {
  text?: string;
}

export const MaterialButton = ({ text }: MaterialButtonProps) => {
  return (
    <>
      <Button variant="contained">{text ? text : "submit"}</Button>
    </>
  );
};

export default MaterialButton;
