import React, { useEffect, useState, useCallback } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

/**
 * Summary step
 * - controlled textarea
 * - generate suggestions from AI and show clickable suggestions
 * - save to backend and update redux
 */
const PROMPT_TEMPLATE =
  "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

export default function Summary({ resumeInfo = {}, setEnabledNext, setEnabledPrev }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary ?? "");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);

  // keep local state in sync if resumeInfo updates externally
  useEffect(() => {
    setSummary(resumeInfo?.summary ?? "");
  }, [resumeInfo?.summary]);

  // update redux when summary changes
  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, summary }));
  }, [summary]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e) => {
    setEnabledNext(false);
    setEnabledPrev(false);
    setSummary(e.target.value);
  };

  const onSave = useCallback(
    async (e) => {
      e.preventDefault();
      if (!resume_id) {
        toast.error("Missing resume ID.");
        return;
      }

      setLoading(true);
      try {
        const payload = { data: { summary } };
        await updateThisResume(resume_id, payload);
        toast.success("Summary saved");
        setEnabledNext(true);
        setEnabledPrev(true);
      } catch (err) {
        console.error("Error saving summary:", err);
        toast.error(err?.message || "Failed to save summary");
      } finally {
        setLoading(false);
      }
    },
    [resume_id, summary, setEnabledNext, setEnabledPrev]
  );

  const GenerateSummeryFromAI = useCallback(async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title first.");
      return;
    }

    setLoading(true);
    setEnabledNext(false);
    setEnabledPrev(false);

    const prompt = PROMPT_TEMPLATE.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(prompt);

      // result may be object or string — safely extract text
      let raw;
      if (typeof result === "string") raw = result;
      else if (result?.response) {
        // support .response.text() or .response (string)
        if (typeof result.response === "string") raw = result.response;
        else if (typeof result.response.text === "function") raw = await result.response.text();
        else raw = JSON.stringify(result.response);
      } else if (result?.text) raw = result.text;
      else raw = JSON.stringify(result);

      // Try to parse JSON — be tolerant to plain array string or JSON wrapped in text
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (parseErr) {
        // sometimes API returns an escaped JSON string, try extracting JSON substring
        const maybeJson = raw.match(/(\[.*\])/s);
        if (maybeJson) {
          try {
            parsed = JSON.parse(maybeJson[0]);
          } catch (e) {
            parsed = null;
          }
        }
      }

      if (!parsed || !Array.isArray(parsed)) {
        toast.error("AI returned unexpected format. Try again or edit job title.");
        console.warn("AI raw response:", raw);
        setAiGenerateSummeryList(null);
      } else {
        setAiGenerateSummeryList(parsed);
        toast.success("Summary suggestions generated");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      toast.error(err?.message || "Failed to generate suggestions");
    } finally {
      setLoading(false);
    }
  }, [resumeInfo?.jobTitle, setEnabledNext, setEnabledPrev]);

  const applySuggestion = (text) => {
    setEnabledNext(false);
    setEnabledPrev(false);
    setSummary(text);
    // redux update will happen via effect
  };

  return (
    <div className="mt-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
      <h2 className="font-semibold text-lg mb-1">Summary</h2>
      <p className="text-sm text-gray-500 mb-4">Add a short summary for your job title.</p>

      <form onSubmit={onSave} className="space-y-4">
        <div className="flex items-end justify-between">
          <label className="text-sm font-medium">Summary</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={GenerateSummeryFromAI}
            disabled={loading}
            className="flex items-center gap-2"
            aria-label="Generate summary from AI"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Working..." : "Generate from AI"}
          </Button>
        </div>

        <Textarea
          name="summary"
          value={summary}
          onChange={handleInputChange}
          rows={6}
          required
          className="w-full"
          aria-label="Summary"
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Suggestions</h3>
          <div className="space-y-3">
            {aiGeneratedSummeryList.map((item, i) => (
              <div
                key={i}
                role="button"
                onClick={() => applySuggestion(item.summary ?? item?.text ?? "")}
                className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="text-xs text-gray-500 mb-1">
                  Level: {item?.experience_level ?? "N/A"}
                </div>
                <div className="text-sm text-gray-800">{item?.summary ?? item?.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
