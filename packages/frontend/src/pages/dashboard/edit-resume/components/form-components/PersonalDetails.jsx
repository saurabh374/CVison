import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateThisResume } from "@/Services/resumeAPI";

/**
 * PersonalDetails (native input fallback)
 * - uses plain <input> so typing always works
 * - keeps same API + Redux behaviour
 */
export default function PersonalDetails({ resumeInfo, setEnabledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });

  // keep local form state in sync if resumeInfo changes externally
  useEffect(() => {
    setFormData({
      firstName: resumeInfo?.firstName || "",
      lastName: resumeInfo?.lastName || "",
      jobTitle: resumeInfo?.jobTitle || "",
      address: resumeInfo?.address || "",
      phone: resumeInfo?.phone || "",
      email: resumeInfo?.email || "",
    });
  }, [resumeInfo]);

  const handleChange = (e) => {
    setEnabledNext?.(false);
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    // update redux partial (you can dispatch full object if preferred)
    dispatch(addResumeData({ ...resumeInfo, [name]: value }));
    // debug: uncomment if you want to see keystrokes in console
    // console.log("field change", name, value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resume_id) return toast.error("Missing resume ID.");

    setLoading(true);
    try {
      const payload = { data: { ...formData } };
      const res = await updateThisResume(resume_id, payload);
      // optionally validate res.status etc
      toast.success("Personal details updated!",);
      setEnabledNext?.(true);
    } catch (err) {
      console.error("Error saving personal details:", err);
      toast.error(err?.message || "Failed to update resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 shadow-sm rounded-xl border border-gray-100 mt-6 bg-white">
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Personal Details</h2>
        <p className="text-sm text-gray-500">Get started with your basic professional information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NativeField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <NativeField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <NativeField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Frontend Developer" />
        <NativeField label="Address" name="address" value={formData.address} onChange={handleChange} required />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NativeField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <NativeField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="flex justify-end pt-3">
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* Plain native input used as a styled fallback */
function NativeField({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
        autoComplete="off"
      />
    </div>
  );
}
