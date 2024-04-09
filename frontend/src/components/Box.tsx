import { Box } from "@mui/material";

interface BoxProps {
  children?: React.ReactNode;
}

export default function BoxSx({ children }: BoxProps) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: "primary.main",
      }}
    >
      {children}
    </Box>
  );
}
