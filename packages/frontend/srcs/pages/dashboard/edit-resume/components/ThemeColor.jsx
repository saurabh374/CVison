import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { SketchPicker } from "react-color";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);
  const { resume_id } = useParams();

  const onColorSelect = async (color) => {
    setSelectedColor(color);
    dispatch(
      addResumeData({
        ...resumeInfo,
        themeColor: color,
      })
    );
    const data = {
      data: {
        themeColor: color,
      },
    };
    try {
      await updateThisResume(resume_id, data);
      toast.success("Theme Color Updated");
    } catch (error) {
      toast.error("Error updating theme color");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          <Palette /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <SketchPicker
          color={selectedColor}
          onChange={(color) => onColorSelect(color.hex)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
