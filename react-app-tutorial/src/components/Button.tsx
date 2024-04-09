interface ButtonProps {
  label: string;
  type: string;
}

const Button = (ButtonProps: ButtonProps) => {
  const { type } = ButtonProps;
  const { label } = ButtonProps;

  return (
    <>
      <button className={`btn btn-${type}`}>{label}</button>
    </>
  );
};

export default Button;
