import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

type SelectedItem = { name: string; options: string[] } | null;

interface ThemeStyle {
  bgColor?: string;
  textColor?: string;
}

interface Props {
  open: boolean;
  selectedItem: SelectedItem;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  themeStyle?: ThemeStyle;
}

const OrderDialog: React.FC<Props> = ({
  open,
  selectedItem,
  selectedOption,
  setSelectedOption,
  onClose,
  onConfirm,
  themeStyle = {},
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        backgroundColor: themeStyle.bgColor || "#fff",
        color: themeStyle.textColor || "#000",
      },
    }}
  >
    <DialogTitle>注文内容を選択</DialogTitle>
    <DialogContent>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {selectedItem?.name} の種類を選んでください
      </Typography>

      <RadioGroup
        value={selectedOption}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedOption(e.target.value)}
      >
        {selectedItem?.options.map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
            sx={{ color: themeStyle.textColor }}
          />
        ))}
      </RadioGroup>
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onConfirm}>
        注文する
      </Button>
    </DialogActions>
  </Dialog>
);

export default OrderDialog;
