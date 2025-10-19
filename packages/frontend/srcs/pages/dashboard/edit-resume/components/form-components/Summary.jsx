import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateSuggestion } from "@/Services/aiAPI";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";
function Summary({ resumeInfo, handleInputChange, onSave, loading }) {
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    setAiLoading(true);
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      setAiLoading(false);
      return;
    }
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await generateSuggestion(PROMPT);
      setAiGenerateSummeryList(JSON.parse(result.data.suggestion));
      toast("Summery Generated", "success");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 glass">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title.</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={aiLoading}
            >
              {aiLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={resumeInfo.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange({ target: { name: 'summary', value: item.summary } })}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer glass"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
